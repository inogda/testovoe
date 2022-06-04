//let webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");


let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    target = 'browserslist';
}


module.exports = {
    mode,
    target,

    resolve: {
        modules: ['bower_components', 'node_modules'],
    },

    devtool: 'source-map',
    //devtool: isProd ? 'cheap-module-source-map' : 'eval',
    entry: './src/index.js',
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        port: 8081,
        open: true,

    },

    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        //assetModuleFilename: 'assets/[hash][ext][query]',
        assetModuleFilename: 'assets/[name].[ext][query]',
        clean: true, // Очищает директорию dist перед обновлением бандла
        filename: 'bundle.js',

    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {test : /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.(png|jpe?g|gif|webp|svg|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
                generator: { filename: 'assets/' + '[name][ext]' }, // убрать если по хешу
            },

            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/inline',
            },
        ]
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/favicon.ico'),
                    to:   path.resolve(__dirname, 'dist/favicon.ico')
                },
                {
                    from: path.resolve(__dirname, 'public/logo192.png'),
                    to:   path.resolve(__dirname, 'dist/logo192.png')
                },
                {
                    from: path.resolve(__dirname, 'public/logo512.png'),
                    to:   path.resolve(__dirname, 'dist/logo512.png')
                },
                {
                    from: path.resolve(__dirname, 'public/manifest.json'),
                    to:   path.resolve(__dirname, 'dist/manifest.json')
                },
                {
                    from: path.resolve(__dirname, 'public/service-worker.js'),
                    to:   path.resolve(__dirname, 'dist/service-worker.js')
                }
            ]
        }),
    ]
}