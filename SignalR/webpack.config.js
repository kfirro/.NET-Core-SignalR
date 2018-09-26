const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const nodeExternals = require('webpack-node-externals');

module.exports = {
    context: path.resolve(__dirname, 'wwwroot'),
    entry: {
        site: "./js/src/site.ts",
        hub: "./js/src/hub.ts",
        indexPages: "./js/src/pages/indexPages.ts"
    },
    //devtool: false, //Enable source-map generating
    target: "web",
    externals: [
        //nodeExternals(), // in order to ignore all modules in node_modules folder
    ], 
    output: {
        path: path.resolve(__dirname, "./wwwroot/js/dist"),
        //filename: "[name].[chunkhash].js",
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
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
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        //new CleanWebpackPlugin(["wwwroot/*"]),
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