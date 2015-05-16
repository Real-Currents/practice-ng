/* Practicing AngularJS modules, controllers and directives:
 * https://github.com/Revlin/practice-ng
 * 
 * Build with:
 * $ webpack --watch
 */
'use strict';
try {
	require("../libs/jquery/dist/jquery.min");
	require("../libs/AngularJS/dist/angular.min");
	require("../libs/AngularJS/dist/angular-route.min");

var Debugger = require("./Debugger");
var practice = require("./practice-common");
} catch(e) {} finally { 1; }

var main = angular.module('practice-angularjs', [ 'practice-common', 'ngRoute' ]);

main.config([
	'$locationProvider',
	'$routeProvider',
	function( $locationProvider, $routeProvider ) {
		$locationProvider.html5Mode(false).hashPrefix('!');
		$routeProvider
			.when('/', {
				templateUrl: 'partials/type-box.html',
				controller: 'typeBoxController'
			});
	}
]);
