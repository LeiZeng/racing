var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: "./src/main.js",
    resolve: {
        modulesDirectories: [
            "./src/"
        ]
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    }
};
