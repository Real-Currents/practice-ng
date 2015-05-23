/* Practicing AngularJS modules, controllers and directives:
 * https://github.com/Revlin/practice-ng
 * 
 * Build with:
 * $ webpack --watch
 * or:
 * $ grunt
 */
'use strict';
try {
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
				templateUrl: 'partials/user.html',
				controller: 'userController'
			})
			.when('/select', {
				templateUrl: 'partials/select-users.html',
				controller: 'selectSubscribersController'
			})
			.when('/type', {
				templateUrl: 'partials/type-box.html',
				controller: 'typeBoxController'
			});
	}
]);
