module.exports = {
    // configuration
	context: __dirname,
    entry: "./scripts/main",
    output: {
        path: __dirname,
        filename: "index.js",
		sourceMapFilename: "./scripts/[file].map"
    },
	devtool: "source-map",
	keepalive: true,
	watch: true
};
