const path = require('path');

const {LicenseWebpackPlugin} = require('license-webpack-plugin');

module.exports = (env = {}) => {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    entry: {
      main: path.join(__dirname, 'src/main.js'),
    },
    output: {
      path: path.join(__dirname, 'docs'),
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
      ],
    },
    resolve: {
      alias: {
        lowlight$: path.join(__dirname, 'src/lowlight.js'),
      },
    },
    plugins: [
      new LicenseWebpackPlugin({
        stats: {
          warnings: false,
          error: true,
        },
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'examples'),
      watchContentBase: true,
    },
  };
};
