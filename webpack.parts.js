/*
    SERVER
 */
exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only", // Display errors only.
        host, // Default is localhost
        port, // Defaults is 8080
        open: true,
        overlay: true // Enables errors to be shown directly in the browser window
    }
});

/*
STYLES
*/
exports.loadSASS = ({ include, exclude } = {}) => ({
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
