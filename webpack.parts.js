// Constants
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const GitRevisionPlugin = require("git-revision-webpack-plugin");

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

// Styles TODO: RETOMAR CAPITULO "ELIMINATING UNUSED CSS"
exports.loadSass = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(css|sass)$/,
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
                    test: /\.(css|sass)$/,
                    include,
                    exclude,
                    use: [MiniCssExtractPlugin.loader].concat(use)
                }
            ]
        },
        plugins: [plugin]
    };
};
exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()]
    }
});
// IMAGES
exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: [
                    {
                        loader: "url-loader",
                        options
                    },
                    "image-webpack-loader" // Optimizar imágenes
                ]
            },
            {
                test: /\.svg$/,
                use: ["file-loader", "image-webpack-loader"]
            }
        ]
    }
});
// JAVASCRIPT
exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader"
            }
        ]
    }
});
// SOURCEMAPS
exports.generateSourceMaps = ({ type }) => ({
    devtool: type
});
// CLEANING UP
exports.clean = path => ({
    plugins: [new CleanWebpackPlugin([path])]
});
// ADD REVISIONS TO BUNDLED FILES
exports.attachRevision = () => ({
    plugins: [
        new webpack.BannerPlugin({
            banner: new GitRevisionPlugin().version()
        })
    ]
});
