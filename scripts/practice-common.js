/* Practicing AngularJS modules, controllers and directives:
 * https://github.com/Revlin/practice-ng
 */
'use strict';
try {
var $ = require("../libs/jquery/dist/jquery.min");
	require("../libs/AngularJS/dist/angular.min");
	
var Debugger = require("./Debugger");
} catch(e) {} finally { 1; }

Debugger.on = true;

var practice = angular.module('practice-common', []);


practice.controller( 'HelloController', function($scope) {
try {
	"debugger";
	$scope.greeting = "Hello, $1!";
	
	$scope.greet = function(n) {
		return $scope.greeting.replace(/\$1/, n);
	};
	
	Debugger.log( this );
} catch(e) {
	Debugger.log( e.stack );
}
} );

/* Adapted from "Learning AngularJS"
 * by Ken Williamson (O'Reilly, 2015)
 */
practice.controller( 'userController', [
	'$scope',
	'$routeParams',
	function( $scope, $routeParams ) {
	try {
		"debugger";
		var user;
		$scope.user = user = 
		{
			"id": $routeParams.id || 0,
			"name": $routeParams.name || "User",
			"email": $routeParams.email || "user@email.com"
		};
		
		$scope.changeUser = 
		function() {
			//user.id = $scope.uID;
			user.name = ($scope.uName)? $scope.uName : user.name;
			user.email = ($scope.uMail)? $scope.uMail : user.email;
		};
	
		Debugger.log( this );
	} catch(e) {
		Debugger.log( e.stack );
	}
	}
] );
practice.controller( 'addUserController', [
	'$scope',
	'$location',
	function( $scope, $location ) {
		$scope.submit = 
		function() {
			$location.path('/user/'+ $scope.name +'/'+ $scope.email);
		};
	}
] );


/* Adapted from http://jsfiddle.net/zargyle/G32c9/ 
 */
practice.directive('ngPlaceholder', function() {
  return {
    restrict: 'A',
    scope: {
      placeholder: '=ngPlaceholder'
    },
    link: function(scope, elem, attr) {
      scope.$watch('placeholder',function() {
        elem[0].placeholder = scope.placeholder;
      });
    }
  }
});


/* Adapted from "AngularJS blog series – MVC in AngularJS"
 * by Denis O’Sullivan (appnexus tech blog)
 * http://techblog.appnexus.com/2014/angularjs-blog-series-mvc-in-angularjs/
 */
practice.service( 'SubscriptionService', [
	'$q',
	function( $q ) {
	try {
		this.getUsers = function() {
			/* Skip ajax call because data is already on the page;
			 * resolve promise immediately
			 */
			var userList = [],
				defer = $q.defer();
			
			window.users.forEach(function( data, idx ) {
				var user = {
					id: (idx + 1),
					name: (!!data)? data.name: "No name",
					email: (!!data)? data.email: "No@Email",
					isSubscriber: (!!data)? data.isSubscriber: false
				};
				
				userList.push(user);
			});
			defer.resolve( userList );
			
			return defer.promise;
		};
		
		this.updateParticipants = function( users ) {
			var defer = $q.defer();
			defer.resolve();
			return defer.promise;
		};
	} catch(e) {
		Debugger.log( e.stack );
	}
	}
]);
practice.controller( 'selectSubscribersController', [
	'$scope',
	'SubscriptionService',
	function( $scope, SubscriptionService ) {
	try {
		$scope.model = {};
		
		SubscriptionService.getUsers().then( function( users) {
			Debugger.log( users );
			$scope.model.users = users;
		} );
		
		$scope.watchSubscribers = function( newValue, oldValue ) {
			if( (newValue === oldValue) || (!newValue) ) return;
			$scope.model.selected.isSubscriber = true;
		};
		
		$scope.$watch('model.selected', $scope.watchSubscribers);
		
		$scope.removeSubscriber = function( subscriber ) {
			subscriber.isSubscriber = false;
			$scope.model.selected = null; // reset choice
		}
		
		$scope.saveChanges = function() {
			SubscriptionService.updateUsers($scope.model.users).then(
				function() {
					/* Handle save success */
				},
				function() {
					/* Handle save failure */
				}
			)
		}
	} catch(e) {
		Debugger.log( e.stack );
	}
	}
]);


practice.controller( 'typeBoxController', function($scope) {
try {	
	$scope.MAX_LEN = 100;
	$scope.WARN_LEN = 10;
	$scope.greeting = "You said,";
	$scope.usrmsg = $scope.usrmsg || "";
	$scope.longmsg = false;
	
	$scope.remaining = function() {
		if(! $scope.usrmsg ) return $scope.MAX_LEN;
		
		var remains = $scope.MAX_LEN - $scope.usrmsg.length;
		return( remains > 0 )?
			remains:
			0;
	};
	
	$scope.warning = function() {
		if(! $scope.usrmsg ) return false;
		
		var remains = $scope.MAX_LEN - $scope.usrmsg.length;
		return( remains < $scope.WARN_LEN );
	};

	$scope.transformField = function() {
		if(! $scope.usrmsg ) return $scope.longmsg;
		
	try {
		if ($scope.usrmsg.length > 20) {
			$scope.longmsg = true;
		} else {
			$scope.longmsg = false;				
		}
	} catch (e) {
		Debugger.log( "Failed to update usrmsg box: "+ e.stack );
	} finally {
		return $scope.longmsg;
	}
		
	};
} catch(e) {
	Debugger.log( e.stack );
}
} );
practice.directive( 'practiceUserMessage', function() {
try {
	return {
		restrict: 	'C',
		replace: 	true,
		//transclude:	true,
		template: 	'<span data-reactid={{reactid}}>'+
						'<input '+
							'data-ng-model="usrmsg" data-ng-change="transformField()" data-ng-hide="longmsg"></input>'+
						'<textarea  '+
							'data-ng-model="usrmsg" data-ng-change="transformField()" data-ng-show="longmsg"></textarea>'+
					'</span>',
		link: function( scope, element, attrs ) {
			var $lilBox = angular.element( element.children()[0] );
			var $bigBox = angular.element( element.children()[1] );
			
			/* Handel React id from original template element */
			if( attrs['reactid'] ) scope.reactid = attrs['reactid'];
			
			scope.$watch(scope.transformField, function( v ){
				setTimeout(function() {
					if(! v ) {
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
				}, 3);
				Debugger.log( v, "practiceUserMessage: $1" );
			} );
		}
	};
} catch(e) {
	Debugger.log( e.stack );
}
} );
practice.directive( 'practiceSvgMessage', function() {
try {
	return {
		restrict: 	'C',
		//transclude:	true,
		// the following two configuration options are 
		// required for SVG custom elements.
		templateNamespace: 'svg',
		replace: true, 
		template: 	'<tspan data-ng-model="usrmsg" data-ng-hide="longmsg"  data-ng-change="transformField()">{{usrmsg}}</tspan>',
		link: function( scope, element, attrs ) {
			var $lilBox = $( element.children()[0] ); //angular.element( element.children()[0] );
			var $bigBox = $( element.children()[1] ); //angular.element( element.children()[1] );
			
			/* Handel React id from original template element */
			if( attrs['reactid'] ) scope.reactid = attrs['reactid'];
			
			scope.$watch(scope.transformField, function( v ){
				setTimeout(function() {
					if(! v ) {
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
				}, 3);
				Debugger.log( v, "practiceUserMessage: $1" );
			} );
		}
	};
} catch(e) {
	Debugger.log( e.stack );
}
} );

try {
module.exports = practice;
} catch(e) {} finally { 1; }
