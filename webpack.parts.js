// Constants
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Server
exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only", // Display errors only.
        host, // Default is localhost
        port, // Defaults is 8080
        open: true,
        overlay: true // Enables errors to be shown directly in the browser window
    }
});

// Styles
exports.loadSass = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.sass$/,
                include,
                exclude,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});
exports.extractSass = ({ include, exclude, use = [] }) => {
    // Extract Sass to a file
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css"
    });
    return {
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    include,
                    exclude,
                    use: [MiniCssExtractPlugin.loader].concat(use)
                }
            ]
        },
        plugins: [plugin]
    };
};
