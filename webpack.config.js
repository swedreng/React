
var htmlWebpack = require('html-webpack-plugin');
const webpack = require('webpack');
var htmlWebpackConfig = new htmlWebpack({
    template : "src/index.html",
    filename : 'index.html',
    inject : 'body'

})
module.exports = {

    entry: './src/main.js',
    output: {
        path : '/',
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
                
            }
        ]
    },
    plugins : [
        htmlWebpackConfig,
        new webpack.DefinePlugin({
            'process.env.URL': JSON.stringify("http://localhost:8000"),
              }),
            ]
}