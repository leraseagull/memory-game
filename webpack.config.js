const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'production',
    entry: './index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
            },
            {
            test: /\.(ts|tsx)$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            },

            {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            },
            {
            test: /\.svg$/,
            type: 'asset/resource'
            },
            {
            test: /\.txt$/,
            use: 'raw-loader'
            }],
        },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    ],
    devServer: {
        open: true,
    }
}
