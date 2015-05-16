/* This simple class constructor can be used as a template */

function ClassName( config ) {
	Debugger.on = true;
	
	/* STATIC constants, fields & functions */
	
	
	/* this properties and methods */	
	ClassName.prototype.init = function( config ) {
		Debugger.log( config );
		
		if( typeof config !== 'object' ) {
			Debugger.log( "ClassName initialization requires a valid config object: "+ config );
		}
		
		return this;
	}
	
	Debugger.on = false;
	return this.init(config);
}

1;
