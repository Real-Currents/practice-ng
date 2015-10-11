

function Grunt( grunt ) {
	var webpack = require("webpack");
	var webpackConfig = require("./webpack.config");
	
	grunt.initConfig({
		bgShell: {
			_defaults: {
				bg: true
			},
			karma: {
				cmd: 'karma start'
			},
			server: {
				cmd: 'morbo practice-server.pl'
			}
		},
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
			files: [
				"./scripts/*.js", 
				"./scripts/**/*.js",
				"./tests/*.js"
			],
			tasks: [ "webpack:devBuild" ],
			options: {
				spawn: false,
			}
		}
	});

	// Build and watch cycle (another option for development)
	// Advantage: No server required, can run app from filesystem
	// Disadvantage: Requests are not blocked until bundle is available,
	//               can serve an old app on too fast refresh
	grunt.registerTask("default", [ "webpack:devBuild", "watch" ]);
	grunt.registerTask("dev", [ "bgShell:karma", "bgShell:server", "webpack:devBuild", "watch" ]);

	// Production build
	//grunt.registerTask("build", ["webpack:build"]);
	
	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
};

module.exports = Grunt;
