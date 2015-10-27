var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: "./client",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    }
};
