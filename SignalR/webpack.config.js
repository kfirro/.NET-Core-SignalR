const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, 'wwwroot'),
    entry: {
        site: "./js/src/site.ts",
        hub: "./js/src/hub.ts",
        indexPages: "./js/src/pages/indexPages.ts"
    },
    devtool: 'eval-source-map', //Enable source-map generating
    target: "web",
    externals: [
    ], 
    output: {
        path: path.resolve(__dirname, "./wwwroot/js/dist"),
        //filename: "[name].[chunkhash].js",
        filename: "[name].js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "sourceMap/[file].map"
        }),
        new CleanWebpackPlugin(["wwwroot/js/dist/*"]),
        //new HtmlWebpackPlugin({
        //    template: "./src/index.html"
        //}),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css"
        })
    ],
    performance: {
        hints: false
    }
};