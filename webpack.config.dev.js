const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
    mode: "development",
    cache: {
        type: "filesystem",
    },
    devtool: "inline-source-map",
});
