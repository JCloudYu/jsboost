/**
 *	Author: JCloudYu
 *	Create: 2019/12/12
**/
export function PackEncapsulateExecutor(_functions) {
	const functions = [];
	for ( const func of _functions ) {
		if ( typeof func === "function" ) {
			functions.push(func);
		}
	}
	
	
	const EncapsulateAsyncExec = async function(...init_args) {
		let should_stop = false;
		const state = {};
		const args = init_args.slice(0);
		const inst = {};
		Object.defineProperties(inst, {
			state: {get:()=>state, configurable:false, enumerable:true},
			stop: {value:()=>{should_stop=true}, configurable:false, writable:false, enumerable:true}
		});
		
		let result = undefined;
		for ( const func of functions ) {
			result = await func.call(inst, ...args);
			if ( should_stop ) break;
			args.splice(0, args.length, result);
		}
		
		return result;
	};
	const EncapsulateExecutor = function(...init_args) {
		let should_stop = false;
		const state = {};
		const args = init_args.slice(0);
		const inst = {};
		Object.defineProperties(inst, {
			state: {get:()=>state, configurable:false, enumerable:true},
			stop: {value:()=>{should_stop=true}, configurable:false, writable:false, enumerable:true}
		});
		
		let result = undefined;
		for ( const func of functions ) {
			result = func.call(inst, ...args);
			if ( should_stop ) break;
			args.splice(0, args.length, result);
		}
		
		return result;
	};
	Object.defineProperties(EncapsulateExecutor, {
		async: { value:EncapsulateAsyncExec, configurable:false, writable:false, enumerable:true }
	});
	
	
	
	return EncapsulateExecutor;
}

