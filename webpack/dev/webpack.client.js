const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const PATHS = {
  entry: `../../src/game`,
  build: `../../dist/game`
}

const commonGameConfig = {
  entry: path.resolve(__dirname, `${PATHS.entry}/index.ts`),
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, `${PATHS.build}`),
    assetModuleFilename: `src/assets/images/[name].[ext]`
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },{
        test: /\.json$/i,
        loader: 'json-loader'
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },{
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },{
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },{
        test: /\.(mp3|wav|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sounds/[name].[ext]'
        }
      }
    ]
  },
  target: 'web',
  devtool: 'inline-source-map',
  resolve: {
    plugins: [new TsConfigPathsPlugin({
      configFile: './tsconfig.json'
    })],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimization: {
    moduleIds: 'named'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `${PATHS.entry}/views/index.html`)
    }),
    new MiniCssExtractPlugin({ linkType: 'text/css' }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../src/game/sounds'),
          to: path.resolve(__dirname, `${PATHS.build}/assets/sounds`),
          noErrorOnMissing: true
        },
        {
          from: path.resolve(__dirname, '../../src/arcade/assets/sounds'),
          to: path.resolve(__dirname, `${PATHS.build}/assets/sounds`),
          noErrorOnMissing: true
        }
      ]
    })
  ]
}

module.exports = commonGameConfig