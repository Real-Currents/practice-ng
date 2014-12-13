describe("Test props and methods of global function, Debugger: \n", function() {
 
    beforeEach(function(){
        Debugger.on = true;
    });
 
    afterEach(function() {
        Debugger.on = false;
    });
	
	it( "Should report jasmine props", function() {

		Debugger.log( 'jasmine-version: ' + jasmine.version );

		jasmine.DEFAULT_TIMEOUT_INTERVAL = 0xFFFFFF;
		Debugger.log( 
				"Async timeout is "+ 
				 jasmine.DEFAULT_TIMEOUT_INTERVAL/(1000*60) +" minutes" );

		var consoleReporter = new (jasmineRequire.ConsoleReporter())({
			timer: new jasmine.Timer, 
			print: function () {
				Debugger.log.apply(console,arguments);
			}
		});
		jasmine.getEnv().addReporter(consoleReporter); // Add reporter to execution
		
	} );
 
    it("Should exist...\n", function() {
        expect( typeof Debugger ).toBe( 'function' );
    });
 
    it("Should print argument to console...\n", function() {
        expect( typeof Debugger.log( "Hello, String" ) ).toBe( 'string' );
        expect( typeof Debugger.log( {'Hello': "Object"} ) ).toBe( 'object' );
        expect( typeof Debugger.log( {'Subsitution': "Object"}, "Hello, $1" ) ).toBe( 'object' );
    });
	
	return true;
});

1;
