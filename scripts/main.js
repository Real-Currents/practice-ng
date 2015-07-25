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
var Debugger = require("./Debugger"),
	practice = require("./practice-common");
	
	require("../libs/jquery/dist/jquery.min");
	require("../libs/AngularJS/dist/angular.min");
	require("../libs/AngularJS/dist/angular-route.min");
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
			.when('/user/:name/:email', {
				templateUrl: 'partials/user.html',
				controller: 'userController'
			})
			.when('/user/:id', {
				templateUrl: 'partials/user.html',
				controller: 'userController'
			})
			.when('/user/:id/:name/:email', {
				templateUrl: 'partials/user.html',
				controller: 'userController'
			})
			.when('/add', {
				templateUrl: 'partials/add-user.html',
				controller: 'addUserController'
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

/* Adapted from "Submittin Ajax Forms: The AngularJS Way" 
 * by Chris Sevilleja
 * https://scotch.io/tutorials/submitting-ajax-forms-the-angularjs-way
 */
main.controller('formController', [
	'$scope', 
	'$http',
	'Users',
	function( $scope, $http, Users ) {
		
	}
]);
