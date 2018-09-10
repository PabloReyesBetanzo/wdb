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
            chunkFilename: "./js/[name].min.[chunkhash:4].js",
            filename: "./js/[name].min.[chunkhash:4].js"
        }
    },
    parts.extractSass({
        use: ["css-loader", parts.autoprefix(), "sass-loader"]
    }),
    parts.loadImages({
        options: {
            limit: 5000,
            name: "./assets/[name].[hash:4].[ext]"
        }
    }),
    parts.loadFonts({
        options: {
            limit: 50000,
            mimetype: "application/font-woff",
            name: "./fonts/[name].[ext]"
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
            },
            // Creación de manifiesto. Define qué archivos debe cargar webpack.
            runtimeChunk: {
                name: "manifest"
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
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
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
