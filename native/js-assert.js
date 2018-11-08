/**
 *	Author: JCloudYu
 *	Create: 2018/11/08
**/
((exports)=>{
	"use strict";
	
	class JSAssertionError extends Error {
		/**
		 * Create a JSAssertionError object that contains given error message
		 * @param {String=} [message]
		**/
		constructor(message) {
			super(message);
			if ( Error.captureStackTrace ) {
				Error.captureStackTrace(this, JSAssertionError);
			}
			
			this.timestamp = Date.now();
		}
	}
	
	exports.JSAssert = (truthy_test, message='Assertion fail!')=>{
		if ( truthy_test ) return;
		throw new JSAssertionError( message );
	};
	
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));
