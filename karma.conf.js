// Karma configuration
// Generated on Sun Oct 12 2014 10:06:05 GMT-0700 (Pacific Daylight Time)
// 
// Start testing with:
// $ node_modules/karma/bin/karma start

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		'libs/jasmine/2.1.3/console.js',
		'libs/jquery/dist/jquery.min.js',
		'libs/jquery-mobile/dist/jquery.mobile.min.js',
		'libs/jquery-ui/jquery-ui.min.js',
		'libs/AngularJS/dist/angular.min.js',
		'libs/AngularJS/dist/angular-mocks.js',
		'libs/AngularJS/dist/angular-*.min.js',
		'libs/bootstrap/dist/js/bootstrap.min.js',
		'scripts/[A-Z][a-zA-Z|\-]*.js',
		'scripts/angular-async.js',
		'scripts/practice-common.js',
		'scripts/controllers/*.js',
		'scripts/directives/*.js',
		'scripts/services/*.js',
		'tests/*.js'
    ],


    // list of files to exclude
    exclude: [
      'karma.conf.js',
	  //'tests/test0*.js',
	  //'tests/test00*.js',
	  'tests/test01*.js',
	  'tests/test02*.js',
	  'tests/test03*.js',
	  'tests/test04*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

	// polling interval in ms (ignored on OS that support inotify)
	autoWatchInterval: 1,
	  
	usePolling: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
		'Chrome', 
		'Firefox'
	],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
