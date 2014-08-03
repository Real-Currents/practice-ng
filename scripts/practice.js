"use strict";
Debugger.on = true;

var practice = angular.module('practice-angularjs', []);


practice.controller( 'HelloController', function($scope) {
	$scope.greeting = "Hello, $1!";
	
	$scope.greet = function(n) {
		return $scope.greeting.replace(/\$1/, n);
	};
	
	Debugger.log( this );
} );


practice.controller( 'typeBoxController', function($scope) {
	$scope.MAX_LEN = 100;
	$scope.WARN_LEN = 10;
	$scope.greeting = "You said,";
	$scope.usrmsg = "";
	$scope.longmsg = false;
	
	$scope.remaining = function() {
		var remains = $scope.MAX_LEN - $scope.usrmsg.length;
		return( remains > 0 )?
			remains:
			0;
	};
	
	$scope.warning = function() {
		var remains = $scope.MAX_LEN - $scope.usrmsg.length;
		return( remains < $scope.WARN_LEN );
	};

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
	};
} );

practice.directive( 'practiceUserMessage', function() {
	return {
		restrict: 	'C',
		replace: 	true,
		//transclude:	true,
		template: 	'<span>'+
						'<input data-ng-model="usrmsg" data-ng-change="transformField()" data-ng-hide="longmsg"></input>'+
						'<textarea data-ng-model="usrmsg" data-ng-change="transformField()" data-ng-show="longmsg"></textarea>'+
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
