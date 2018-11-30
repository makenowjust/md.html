const path = require('path');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env = {}) => {
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
          use: [env.production ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(?:ttf|woff2?)$/,
          use: [
            env.production
              ? {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                  },
                }
              : 'url-loader',
          ],
        },
      ],
    },
    resolve: {
      alias: {
        lowlight$: path.join(__dirname, 'src/lowlight.js'),
      },
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'main',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      minimizer: [new TerserPlugin({sourceMap: true}), new OptimizeCSSAssetsPlugin()],
    },
    plugins: [
      ...(env.production ? [new MiniCssExtractPlugin({filename: '[name].css'})] : []),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(!env.production),
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'examples'),
      watchContentBase: true,
    },
  };
};
