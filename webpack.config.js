const path = require('path');

const webpack = require('webpack');

const pkg = require('./package.json');

module.exports = (env = {}) => {
  const MD_HTML_VERSION = env.production ? pkg.version : '0.0.0-dev';

  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    entry: {
      main: path.join(__dirname, 'src/main.js'),
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [path.join(__dirname, 'node_modules')],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          // It's a bit hack: `octicon/index.scss` does not include SCSS syntax, so it can pass through css-loader.
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.woff2$/,
          use: ['url-loader'],
        },
        {
          test: /\.(?:ttf|woff)$/,
          use: ['url-loader', 'null-loader'],
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: `md.html v${MD_HTML_VERSION}`,
      }),
      new webpack.DefinePlugin({
        MD_HTML_VERSION: JSON.stringify(MD_HTML_VERSION),
      }),
    ],
    resolve: {
      alias: {
        lowlight$: path.join(__dirname, 'src/lowlight.js'),
      },
    },
    devServer: {
      contentBase: path.join(__dirname, 'examples'),
      watchContentBase: true,
    },
  };
};
