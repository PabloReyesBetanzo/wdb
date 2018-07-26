// Modules
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Config Parts
const parts = require("./webpack.parts");
const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: "Webpack Development Boilerplate"
            })
        ]
    }
]);
const productionConfig = merge([
    parts.extractSass({
        use: ["css-loader", "sass-loader"]
    })
]);
const developmentConfig = merge([
    parts.devServer({
        // Customize host and/or port
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadSass()
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};
