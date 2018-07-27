// Modules
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    parts.loadJavaScript({ include: PATHS.app, exclude: /node_modules/ });

]);
const productionConfig = merge([
    parts.extractSass({
        use: ["css-loader", parts.autoprefix(), "sass-loader"]
    }),
    parts.loadImages({
        options: {
            limit: 5000,
            name: "[name].[ext]"
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
