const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: [
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: 'index.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                // options: {
                //     presets: ['@babel/preset-env', '@babel/preset-react'],
                //     plugins: ['@babel/plugin-proposal-class-properties']
                // }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    // optimization: {
    //     minimize: false
    // },
    plugins: [
        new HtmlWebpackplugin({ template: "./public/index.html", filename: "./index.html" })
    ]
};