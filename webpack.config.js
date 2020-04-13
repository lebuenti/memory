const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'react-app-polyfill/ie9', //for ie9 Support
            'react-app-polyfill/stable',
            './src/index.js',
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',

        }),
        new MiniCssExtractPlugin({filename: "[name].css"}),
        new CleanWebpackPlugin()
    ],
    devServer: {
        host:'0.0.0.0',
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};
