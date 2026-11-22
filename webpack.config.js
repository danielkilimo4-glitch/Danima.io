const path = require('path');
const HtmlBundlerPlugin = require('./src');

const exampleDir = path.resolve(__dirname, 'examples/tailwindcss');

module.exports = {
  mode: 'development',
  context: exampleDir,

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: path.join(exampleDir, 'src/views'),
      js: {
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'css/[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  require('tailwindcss')({
                    content: [path.join(exampleDir, 'src/**/*.html')],
                  }),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(ico|png|jpe?g|svg|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash:8][ext]',
        },
      },
    ],
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: [path.join(exampleDir, 'src/**/*.*')],
      options: {
        usePolling: true,
      },
    },
  },
};
