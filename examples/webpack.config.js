const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./src/index.html"),
    filename: "./index.html",
    inject: 'body'
});
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "[name].[hash:6].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            'console': path.join(__dirname,'/src/console.js')   // [before compile] need to use CommonJS Module System
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 8080
    }
};
