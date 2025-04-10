const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const PATHS = {
  game: `../../src/game`,
  build: `../../dist/game`
}

const commonGameConfig = {
  entry: path.resolve(__dirname, `${PATHS.game}/ts/index.ts`),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `${PATHS.build}`),
    assetModuleFilename: `src/assets/images/[name].[ext]`
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
				loader: "html-loader", 
      }, {
        test: /\.json$/,
				loader: "json-loader"
      },{
        test: /\.(jpe?g|png|gif|svg)$/i, 
				loader: 'file-loader',
				options: {
					name: '/images/[name].[ext]'
				}
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
      }, {
        test: /\.(sa|sc|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
      }, {
        test: /\.ts?$/,
				use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }, 
  target: 'web',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
		  new TerserPlugin()
    ],
    minimize: true
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({
      configFile: './tsconfig.json'
    })],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `${PATHS.game}/views/index.html`)
    }),
    new MiniCssExtractPlugin({ linkType: 'text/css' })
  ]
}

module.exports = commonGameConfig