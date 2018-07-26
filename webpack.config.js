const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
const productionConfig = merge([]);
const developmentConfig = merge([
    parts.devServer({
        // Customize host and/or port
        host: process.env.HOST,
        port: process.env.PORT
    })
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }
    return merge(commonConfig, developmentConfig, { mode });
};
