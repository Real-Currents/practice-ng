module.exports = function(grunt) {
	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config");
	
	grunt.initConfig({
		webpack: {
			options: webpackConfig,
			devBuild: {
				devtool: "sourcemap",
				debug: true
			}/*,
			proBuild: {
				plugins: webpackConfig.plugins.concat(
					new webpack.DefinePlugin({
						"process.env": {
							// This has effect on the react lib size
							"NODE_ENV": JSON.stringify("production")
						}
					}),
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.UglifyJsPlugin()
				)
			}
			*/
		},
		watch: {
			files: ["./**/*", "./scripts/**/*"],
			tasks: ["webpack:devBuild"],
			options: {
				spawn: false,
			}
		}
	});

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask("default", ["webpack:devBuild"]); //, "watch"]);

	// Production build
	//grunt.registerTask("build", ["webpack:build"]);
};
