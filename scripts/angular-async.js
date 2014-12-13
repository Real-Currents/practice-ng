/* From 'Mastering Web Application Development With AngularJS'
 * by Pawel Kozlowski and Peter Bacon
 *
 * Use angular mock objects to test async functionallity
 */

angular.module( 'async', [] 
	)
	.factory( 'asyncGreeter',
		 function( $timeout, $log ) {
			 return {
				say: function( name, timeout ) {
					$timeout(function() {
						$log.info( "Hello, "+ name +"!" );
					} );
				}
			 };
		 }
	);
