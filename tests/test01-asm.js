/* Adapted from http://asmjs.org/spec/latest/#introduction
 *
 * In a JavaScript engine that supports AOT compilation of asm.js, 
 * calling the module on a proper global object and heap buffer would 
 * link the exports object to use the statically compiled functions.
 */

describe("Test GeometricMean: \n", function() {
 
    beforeEach(function(){
        Debugger.on = true;
    });
 
    afterEach(function() {
        Debugger.on = false;
    });
 
    it("Should initialize...\n", function() {
		var heap = new ArrayBuffer(0x1000); //new ArrayBuffer(0x10000);

		var START = 8, END = 64;
		Debugger.log( 
			"start:\t"+ (START|0) +", "+
			"end:\t"+ (END|0) 	
		);

		function init( buffer, start, end ) {
			/* Fill a region with input values */
			var initBuffer = new Float64Array(buffer);

			for( var v=1, i=0, z=buffer.byteLength; i<z; i++ ) {
				if( start <= i && i <= end  ) { 
					initBuffer[i] = v*(++v);
				} else initBuffer[i] = 0;
			}

			return initBuffer;
		}
		//heap = init(heap, START, END); 

		var fast = GeometricMean(window, null, heap);
		Debugger.profile.start()/1000;
		expect( typeof 
			Debugger.log( fast.geometricMean(START, END),
				"geometricMean: $1\n"+
				"time: "+ (Debugger.profile.stop()/1000) +" seconds"
			)
		).toBe( 'number' );

		var bogusGlobal = {
		  Math: {
			exp: Math.exp,
			log: Math.log
		  },
		  Float64Array: Float64Array
		};

		var slow = GeometricMean(bogusGlobal, null, heap); // produces purely-interpreted/JITted version
		Debugger.profile.start();
		Debugger.log( 
			"geometricMean: "+ slow.geometricMean(START, END) +"\n"+ // computes bizarro-geometric mean thanks to bogusGlobal
			"time: "+ (Debugger.profile.stop()/1000) +" seconds"
		);
	} );
} );

1;
