/* Adapted from "AngularJS Web Application Development Cookbook"
 * by Matt Frisbie (Packt Publishing, 2015)
 */

describe('Controller: HandleCtrl', function() {
	
	var HandleCtrl, scope, httpBackend, createEndpointExpectation;
	 
    beforeEach(function(){
        Debugger.on = true;
    });
	
	beforeEach(module('myApp'));
	
	beforeEach(inject(
		function( $controller, $rootScope, $httpBackend ) {
			
			httpBackend = $httpBackend;
			
			scope = $rootScope.$new();
			
			HandleCtrl = $controller('HandleCtrl', {
				$scope: scope
			});
	
			createEndpointExpectation = function() {
				httpBackend.expectGET(/\/api\/handle\/\w+/i).respond(
					function( method, url, data, headers ) {
						var urlComponents = url.split("/"),
							handle = urlComponents[urlComponents.length - 1],
							payload = { handle: handle };

						if( handle == 'jakehsu' ) {
							payload.id = 1;
						} else {
							payload.id = null;
						}

						return [ 200, payload, {} ];
					}
				);
			};
		}
	));
	
	afterEach(function() {
		
		httpBackend.verifyNoOutstandingExpectation();
		
		httpBackend.verifyNoOutstandingRequest();
	});
 
    afterEach(function() {
        Debugger.on = false;
    });
	
	it('Should mark handles which are too short as invalid',
	   function() {
		   scope.handle = 'jake';
		   Debugger.log( "Given the handle '"+ scope.handle +"'" );
		   scope.$apply();
		   Debugger.log( "HandleCtrl returns "+ scope.valid );
		   expect(scope.valid).toBe(false);
	   }
	);
	
	it('Should mark handles which exist on the server as invalid',
	   function() {
		   createEndpointExpectation();
		   scope.handle = 'jakehsu';
		   Debugger.log( "Given the handle '"+ scope.handle +"'" );
		   scope.$apply();
		   httpBackend.flush();
		   Debugger.log( "HandleCtrl returns "+ scope.valid );
		   expect(scope.valid).toBe(false);
	   }
	);
	
	it('Should mark handles available on the server as valid',
	   function() {
		   createEndpointExpectation();
		   scope.handle = 'jakehsu123';
		   Debugger.log( "Given the handle '"+ scope.handle +"'" );
		   scope.$apply();
		   httpBackend.flush();
		   Debugger.log( "HandleCtrl returns "+ scope.valid );
		   expect(scope.valid).toBe(true);
	   }
	);
});
