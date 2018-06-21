
const htmlWebpack = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src')
const OUTPUT_DIR = path.resolve(__dirname, './dist/assets');

module.exports = {
  entry: {
    'js/app': path.join(SRC_DIR, 'main.js')
  },
  output: {
    path: `${OUTPUT_DIR}/`,
    publicPath: 'assets/',
    filename: '[name]-[chunkhash].js',
    chunkFilename: 'js/[chunkhash].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpack({
      title: 'Opanc',
      template: 'src/index.html',
      filename: '../index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env.URL': JSON.stringify('https://api.opanc.com'),
      FACEBOOK: JSON.stringify('https://www.facebook.com'),
      TWITTER: JSON.stringify('https://www.twitter.com'),
      INSTAGRAM: JSON.stringify('https://www.instagram.com'),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      mangle: true,
      output: {
        beautify: false,
        screw_ie8: false
      },
      compress: {
        warnings: false,
        screw_ie8: false
      }
    }),
    new WebpackPwaManifest({
      filename: '../manifest.json',
      name: 'Opanc',
      short_name: 'Opanc',
      description:
        'Eleştirel mizahın tek adresi, Hayatı fazla ciddiye almayın.!',
      background_color: '#d4462c',
      fingerprints: false,
      public_path: '.',
      icons: [
        {
          src: path.resolve('src/images/opanc_logo.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    })
  ]
}

