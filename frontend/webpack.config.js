const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Очищает директорию dist перед обновлением бандла
        filename: 'index_pack.js'
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        port: 8081,
        open: true,

    },
    module: {
        rules: [
            {test : /\.(js)$/, use: 'babel-loader'},
            {test : /\.css$/, use: ['style-loader', 'css-loader']},
            {
                test: /\.svg/,
                use: ["@svgr/webpack"],
            },
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/img'),
                    to:   path.resolve(__dirname, 'dist/img')
                }
            ]
        })
    ]
}