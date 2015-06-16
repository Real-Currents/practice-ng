/* Adapted from "Learning AngularJS"
 * by Ken Williamson (O'Reilly, 2015)
 *
 * Test HelloController
 */

describe( 'User Controller...', function() {
	var scope, ctrl;
	
	beforeEach( function() { Debugger.on = true; } );
	beforeEach( module('practice-common') );
	beforeEach( inject(
		function( $controller, $rootScope ) {
			scope = $rootScope.$new();
			ctrl = $controller('userController', { 
				$scope: scope, 
				$routeParams:  {}
			});
		}
	) );
	
	afterEach( function() { Debugger.on = false; } );
	
	it( 'should be available', function() {
		expect(ctrl).not.toBe(undefined);
	} );
	
	it( 'should define a user', function() {
		expect(scope.user).toEqual(jasmine.any(Object));
	} );
	
	it( 'should define a user id', function() {
		expect(scope.user.id).toEqual(jasmine.any(Number));
	} );
	
	it( 'should define a user name', function() {
		expect(scope.user.name).toEqual(jasmine.any(String));
	} );
	
	it( 'should define a user email', function() {
		expect(scope.user.email).toEqual(jasmine.any(String));
	} );
	
	it( 'should have method to change user', function() {
		expect(scope.changeUser).toEqual(jasmine.any(Function));
	} );
	
	it( 'should change user name', function() {
		Debugger.log( "User name: "+ scope.user.name );
		scope.uName = "New Name";
		scope.changeUser();
		var name = Debugger.log( scope.user.name, "User name: $1" );
		expect(name).toEqual("New Name");
	} );
	      
			   
} );

1;
