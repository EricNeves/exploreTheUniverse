const path = require('path')

const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin    = require('html-webpack-plugin')
const CopyWebpackPlugin    = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist/')
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new MiniCSSExtractPlugin({
            filename: '[name][contenthash].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/images',
                    to: 'assets/images'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}