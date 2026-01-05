const path = require('path')
const nodeExternals = require('webpack-node-externals')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const PATHS = {
  entry: `../../src/server`,
  build: `../../dist`
}

const commonServerConfig = {
  entry: path.resolve(__dirname, `${PATHS.entry}/index.ts`),
  output: {
    filename: `server.js`,
    path: path.resolve(__dirname, `${PATHS.build}`)
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  resolve: {
    plugins: [
      new TsConfigPathsPlugin({
        configFile: './tsconfig.json'
      }),
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      async_hooks: false
    },
  },
  externals: [nodeExternals()],
  externalsPresets: {
    node: true // in order to ignore built-in modules like path, fs, etc.
  }
}

module.exports = commonServerConfig