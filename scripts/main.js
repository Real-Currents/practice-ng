'use strict';

require("../libs/jquery/dist/jquery.min");
require("../libs/AngularJS/dist/angular.min");
require("../libs/AngularJS/dist/angular-route.min");

var practice = require("./practice-common");

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
