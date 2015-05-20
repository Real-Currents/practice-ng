/* From 'Learning AngularJS'
 * by Ken Williamson
 *
 * Test HelloController
 */

describe( 'Hello Controller...', function() {
	var scope, ctrl;
	
	beforeEach( function() { Debugger.on = true; } );
	beforeEach( module('practice-common') );
	beforeEach( inject(
		function( $rootScope, $controller ) {
			scope = $rootScope.$new();
			ctrl = $controller('HelloController', { $scope: scope });
		}
	) );
	
	afterEach( function() { Debugger.on = false; } );
	
	it( 'shoud have method for greeting', function() {
		expect(scope.greet).toEqual(jasmine.any(Function));
	} );
	
	it( 'shoud create initial greeting', function() {
		var greeting = Debugger.log( scope.greet("Controller") );
		expect(greeting).toEqual("Hello, Controller!");
	} );
	   
			   
} );

1;
