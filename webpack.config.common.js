const path = require("path");

module.exports = {
    entry: {
        "theming": "./src/theming.ts",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.json"
                    }
                }],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    output: {
        path: path.resolve(__dirname, "_site/js"),
    },
};