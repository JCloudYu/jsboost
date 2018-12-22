/**
*	Author: JCloudYu
*	Create: 2018/11/08
**/
export class JSAssertionError extends Error {
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

/**
 * Perform an assertion check to given test expression
 *
 * @param {Function|*} test A function or a normal value that can be evaluated as truthy or falsy
 * @param {Function|Error|String} message A function that is used to handle the error outcome
**/
export function JSAssert(test, message='Assertion fail!') {
	let error = test ? null : true;
	if ( typeof test === "function" ) {
		try {
			test();
			error = null;
		} catch(e) {
			error = e;
		}
	}
	if ( !error ) return;
	
	
	
	let type = typeof message;
	let content = message;
	if ( type === "function" ) {
		try {
			content = message(error);
		}
		catch(e) {
			content = e;
		}
	}
	else
	if ( !(content instanceof Error) ) {
		content = new JSAssertionError(content);
	}
	
	
	
	if ( content instanceof Error ) {
		throw content;
	}
}
