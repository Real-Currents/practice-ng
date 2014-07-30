"use strict";
var practice = angular.module('practice-angularjs', []);
var $inspectScope = {},
	$inspectThis = {};

practice.controller( 'HelloController', function($scope) {
	$scope.greeting = "You said,";
	$scope.usrmsg = "";
	$scope.longmsg = false;

	$scope.transformField = function() {
	try {
		if ($scope.usrmsg.length > 20) {
			$scope.longmsg = true;
		} else {
			$scope.longmsg = false;				
		}
	} catch (e) {
		console.log( "Failed to update usrmsg box: "+ e.stack );
	} finally {
		return $scope.longmsg;
	}
	}
} );

practice.directive( 'practiceUserMessage', function() {
	return {
		restrict: 	'C',
		replace: 	true,
		//transclude:	true,
		template: 	'<span>'+
						'<input ng-model="usrmsg" ng-change="transformField()" ng-hide="longmsg"></input>'+
						'<textarea ng-model="usrmsg" ng-change="transformField()" ng-show="longmsg"></textarea>'+
					'</span>',
		link: function( scope, element, attrs ) {
			var $lilBox = angular.element( element.children()[0] );
			var $bigBox = angular.element( element.children()[1] );
			scope.$watch(scope.transformField, function( n, o, scope ){
				if( n === o ) {
					return;
				} else if(! n ) {
					$lilBox[0].focus();
					$lilBox[0].selectionStart = 
						$lilBox[0].selectionEnd = 
						$lilBox[0].value.length;
				} else {
					$bigBox[0].focus();
					$bigBox[0].selectionStart = 
						$bigBox[0].selectionEnd = 
						$bigBox[0].value.length;
				}
			} );
		}
	};
} );
