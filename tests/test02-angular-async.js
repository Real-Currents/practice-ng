/* Adapted from "Mastering Web Application Development With AngularJS"
 * by Pawel Kozlowski and Peter Bacon
 *
 * Use angular mock objects to test async functionallity
 */

describe( 'Async greeter test', function() {
	var asyncGreeter, $timeout, $log;
	
	beforeEach( module('async') );
	beforeEach( inject(function( _asyncGreeter_, _$timeout_, _$log_ ) {
		asyncGreeter = _asyncGreeter_;
		$timeout = _$timeout_;
		$log = _$log_;
	} ) );
	
	it( 'should greet the async World', function() {
		asyncGreeter.say( 'World', 999999 );
		$timeout.flush();
		expect( $log.info.logs ).toContain( ['Hello, World!'] );
	} );
			   
} );

1;
