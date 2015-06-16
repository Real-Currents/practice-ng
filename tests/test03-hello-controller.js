/* Adapted from "Learning AngularJS"
 * by Ken Williamson (O'Reilly, 2015)
 *
 * Test HelloController
 */

describe( 'Hello Controller...', function() {
	var scope, ctrl;
	
	beforeEach( function() { Debugger.on = true; } );
	beforeEach( module('practice-common') );
	beforeEach( inject(
		function( $controller, $rootScope ) {
			scope = $rootScope.$new();
			ctrl = $controller('HelloController', { $scope: scope });
		}
	) );
	
	afterEach( function() { Debugger.on = false; } );
	
	it( 'should be available', function() {
		expect(ctrl).not.toBe(undefined);
	} );
	
	it( 'should have method for greeting', function() {
		expect(scope.greet).toEqual(jasmine.any(Function));
	} );
	
	it( 'should create initial greeting', function() {
		var greeting = Debugger.log( scope.greet("Controller") );
		expect(greeting).toEqual("Hello, Controller!");
	} );
	   
			   
} );

1;
