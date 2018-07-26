const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devServer: {
        stats: "errors-only", // Display errors only.
        host: process.env.HOST, // Default is localhost
        port: process.env.PORT, // Defaults is 8080
        open: true,
        overlay: true // Enables errors to be shown directly in the browser window
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Development Boilerplate"
        })
    ] // ./plugins
};
