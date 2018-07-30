// Modules
const merge = require("webpack-merge");
const safeParser = require("postcss-safe-parser");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");
const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist")
};

// Config Parts
const parts = require("./webpack.parts");
const commonConfig = merge([
    {
        plugins: [
            // TODO: Crear templates e incorporar FONTS e íCONOS a través de CDN
            new HtmlWebpackPlugin({
                title: "Webpack Development Boilerplate"
            })
        ]
    },
    parts.loadJavaScript({ include: PATHS.app, exclude: /node_modules/ })
]);
const productionConfig = merge([
    {
        output: {
            chunkFilename: "[name].min.[chunkhash].js",
            filename: "[name].min.[chunkhash].js"
        }
    },
    parts.extractSass({
        use: ["css-loader", parts.autoprefix(), "sass-loader"]
    }),
    parts.loadImages({
        options: {
            limit: 5000,
            name: "[name].[hash].[ext]"
        }
    }),
    parts.generateSourceMaps({ type: "source-map" }),
    {
        // Separa a un archivo aparte aquellos assets que sean estáticos.
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "initial"
                    }
                }
            }
        }
    },
    parts.clean(PATHS.build),
    parts.attachRevision(),
    parts.minifyJavaScript(),
    parts.minifyCSS({
        options: {
            discardComments: { removeAll: true },
            parser: safeParser
        }
    })
]);
const developmentConfig = merge([
    parts.devServer({
        // Customize host and/or port
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadSass(),
    parts.loadImages()
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};
