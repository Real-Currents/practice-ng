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

/* Adapted from "Submitting Ajax Forms: The AngularJS Way" 
 * by Chris Sevilleja
 * https://scotch.io/tutorials/submitting-ajax-forms-the-angularjs-way
 *
 * ... here's the AngularJS form controller, also using validation ala
 * https://scotch.io/tutorials/angularjs-form-validation
 */
main.controller('formController', [
	'$scope', 
	'$http',
	'$location',
	'Users',
	function( $scope, $http, $location, Users ) {
		
		$scope.formData = {};
		$scope.formErrors = {};		
		$scope.formSubmit = function( userID, isValid ) {
			if(! isValid ) {
				window.responseMessage.innerHTML = '<p class="warning">Form Data Is Not Valid!</p>'
			} else { 
				$http({
					method: 'GET',
					url: '/process',
					params: $scope.formData,
					headers: { 'Content-type': 'application/x-www-form-urlencoded' }
				})
					.success(function( data ) {

						if( data.message ) {
							window.responseMessage.innerHTML = data.message;	
						}

						if( data.success ) {
							$scope.formErrors = {};
							$location.path('/user/'+ userID +'/'+ data.Name +'/'+ data.Email);

						} else if( data.errors ) {
							$scope.formErrors = data.errors;
						}

						return true;
					});

				return true;
			}
		};
	}
]);
