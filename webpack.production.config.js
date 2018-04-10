
const htmlWebpack = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {

    entry: './src/main.js',
    output: {
        path: `${OUTPUT_DIR}/`,
        filename : 'bundle.js'

    },
    module: {
        loaders : [
            {
                test : /\.js$/,
                loader : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test : /\.scss$/,
                loaders : ['style-loader','css-loader','sass-loader'],
                
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
    plugins : [
        new htmlWebpack({
            title: 'Opanc',
            template : "src/index.html",
            filename : 'index.html',
            inject : 'body'
        }),
        new webpack.DefinePlugin({
            'process.env.URL': JSON.stringify("http://api.opanc.com"),
            'FACEBOOK': JSON.stringify("https://www.facebook.com"),
            'TWITTER' :  JSON.stringify("https://www.twitter.com"),
            'INSTAGRAM' : JSON.stringify("https://www.instagram.com"),
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle:true,
            output: {
                beautify: false,
                screw_ie8: false 
            },
            compress: {
                warnings: false,
                screw_ie8: false,
            }
        })
    ]
}

