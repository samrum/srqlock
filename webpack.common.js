const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'style/[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development',
});

module.exports = {
    entry: {
        main: [
            './src/script/main.js',
            './src/style/main.scss',
        ],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                        }],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.mp3$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'sounds/[name].[ext]',
                    },
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                },
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            limit: 10000,
                        },
                    },
                    {
                        loader: 'img-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true,
        }),
        extractSass,
    ],
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
