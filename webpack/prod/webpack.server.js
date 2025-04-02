const path = require('path')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const PATHS = {
  server: `../../src/server`,
  build: `../../dist`
}

const commonServerConfig = {
  entry: path.resolve(__dirname, `${PATHS.server}/index.ts`),
  output: {
    filename: `server.js`,
    path: path.resolve(__dirname, `${PATHS.build}`)
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
				use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  target: 'node',
  resolve: {
    plugins: [ new TsconfigPathsPlugin({
      configFile: './tsconfig.json'
    })],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      async_hooks: false
    }
  },
  externals: [nodeExternals()],
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc. 
  }
}

module.exports = commonServerConfig