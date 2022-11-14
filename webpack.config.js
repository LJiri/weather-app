const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        context: path.resolve(__dirname, "./src"),
        entry: "./index.tsx",
        output: {
            path: path.join(__dirname, "./dist"),
            filename: isProduction ? "[name].[contenthash].js" : "[name].js",
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader",
                        {
                            loader: "ts-loader",
                            options: {
                                onlyCompileBundledFiles: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
                    type: "asset",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./templates/index.html",
                minify: false,
            }),
            // extract all styles
            new MiniCssExtractPlugin({
                filename: isProduction ? "[name].[contenthash].css" : "[name].css",
            }),
            new CleanWebpackPlugin(),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    // disable webpack licence file
                    extractComments: false,
                }),
            ],
        },
    };
};
