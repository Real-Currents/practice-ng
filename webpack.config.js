module.exports = {
    // configuration
	context: __dirname,
    entry: "./scripts/main",
    output: {
        path: __dirname + "/dist",
        filename: "main.js",
		sourceMapFilename: "[file].map"
    },
	devtool: "source-map"
};
