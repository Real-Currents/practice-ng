/* Adapted from "Learning AngularJS"
 * by Ken Williamson (O'Reilly, 2015)
 *
 * End-to-End testing with Protractor
 */
 
 describe( "Hello Practice AngularJS", function() {
	 
	 it( "should test the main page", function() {
		 browser.get('http://127.0.0.1:3000/');
		 expect(browser.getTitle()).toEqual('Practice AngularJS');
	 } );
	 
 } );
