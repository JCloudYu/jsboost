/**
 *	Author: JCloudYu
 *	Create: 2019/05/04
**/
// region [ Object extension ]
const _ObjectDefineProperty = Object.defineProperty;
const _ObjectDefineProperties = Object.defineProperties;

export function ObjectDefineProperty(object, prop_name, prop_attr) {
	_ObjectDefineProperty(object, prop_name, prop_attr);
	return object;
}
export function ObjectDefineProperties(object, prop_contents) {
	_ObjectDefineProperties(object, prop_contents);
	return object;
}
export function ObjectMerge(target, source) {
	if ( Object(target) !== target ) {
		throw new Error("Given target is not an object");
	}
	
	if ( Object(source) !== source ) {
		throw new Error("Given source is not an object");
	}
	
	
	for (const key in source) {
		if ( !source.hasOwnProperty(key) ) {
			continue;
		}
		
		const tValue = target[key];
		const sValue = source[key];
		const tType	 = TypeOf(tValue);
		const sType	 = TypeOf(sValue);
		
		if ( tType !== "object" || sType !== "object" ) {
			if ( target instanceof Map ) {
				target.set(key, sValue);
			}
			else {
				target[key] = sValue;
			}
			continue;
		}
		
		ObjectMerge(tValue, sValue);
	}
	
	return target;
}
export function ObjectGenerate(prototype=null, props={}) {
	const object = Object.create(prototype);
	if ( Object(props) === props ) {
		Object.assign(object, props);
	}
	return object;
}
// endregion

// region [ Promise Extension ]
export function PromiseWaitAll(promise_queue=[]) {
	if ( !Array.isArray(promise_queue) ){
		promise_queue = [promise_queue];
	}
	
	if( promise_queue.length === 0 ){
		return Promise.resolve([]);
	}
	
	return new Promise((resolve, reject) =>{
		let result_queue=[], ready_count=0, resolved = true;
		for(let idx=0; idx<promise_queue.length; idx++) {
			let item = {resolved:true, seq:idx, result:null};
			
			result_queue.push(item);
			Promise.resolve(promise_queue[idx]).then(
				(result)=>{
					resolved = (item.resolved = true) && resolved;
					item.result = result;
				},
				(error)=>{
					resolved = (item.resolved = false) && resolved;
					item.result = error;
				}
			).then(()=>{
				ready_count++;
				
				if ( promise_queue.length === ready_count ) {
					(resolved?resolve:reject)(result_queue);
				}
			});
		}
	});
}
export function FlattenedPromise() {
	const compact = {};
	compact.promise = new Promise((resolve, reject)=>{
		compact.resolve=resolve;
		compact.reject=reject;
	});
	return compact;
}
// endregion

// region [ Timer Extension ]
export function ThrottledTimeout() {
	let _scheduled	= null;
	let _executing	= false;
	let _hTimeout	= null;
	const timeout_cb = (cb, delay=0, ...args)=>{
		_scheduled = {cb, delay, args};
		
		if ( _executing ) return;
		
		
		if ( _hTimeout ) {
			clearTimeout(_hTimeout);
			_hTimeout = null;
		}
		__DO_TIMEOUT();
	};
	timeout_cb.clear=()=>{
		_scheduled = null;
		if ( _hTimeout ) {
			clearTimeout(_hTimeout);
			_hTimeout = null;
		}
	};
	return timeout_cb;
	
	
	
	function __DO_TIMEOUT() {
		if ( !_scheduled ) return;
	
		let {cb, delay, args} = _scheduled;
		_hTimeout = setTimeout(()=>{
			_executing = true;
			
			Promise.resolve(cb(...args))
			.then(
				()=>{
					_executing = false;
					_hTimeout = null;
					
					__DO_TIMEOUT();
				},
				(e)=>{
					_executing	= false;
					_hTimeout	= null;
					_scheduled	= null;
					
					throw e;
				}
			);
		}, delay);
		_scheduled = null;
	}
}
export function ThrottledTimer() {
	const _timeout = ThrottledTimeout();
	const timeout_cb = (cb, interval=0, ...args)=>{
		const ___DO_TIMEOUT=async()=>{
				_timeout(___DO_TIMEOUT, interval);
				
				try {
					await cb(...args);
				}
				catch(e) {
					_timeout.clear();
					throw e;
				}
			};
		_timeout(___DO_TIMEOUT, interval, ...args);
	};
	timeout_cb.clear=()=>{
		_timeout.clear();
	};
	return timeout_cb;
}
export function Idle(duration=0) {
	return new Promise((resolve)=>{setTimeout(resolve, duration)});
}
// endregion

// region [ Misc ]
export function TypeOf(input, resolveObj=false) {
	const type = typeof input;
	switch(type) {
		case "number":
		case "string":
		case "function":
		case "boolean":
		case "undefined":
		case "symbol":
			return type;
	}
	
	if ( input === null ) {
		return "null";
	}
	
	if ( input instanceof String ) {
		return "string";
	}
	
	if ( input instanceof Number ) {
		return "number";
	}
	
	if ( input instanceof Boolean ) {
		return "boolean";
	}
	
	if ( Array.isArray(input) ) {
		return "array";
	}
	
	
	if ( !resolveObj ) {
		return "object";
	}
	
	
	// None-primitive
	if ( input instanceof ArrayBuffer ) {
		return "array-buffer"
	}
	
	if ( input instanceof DataView ) {
		return "data-view";
	}
	
	if ( input instanceof Uint8Array ) {
		return "uint8-array";
	}
	
	if ( input instanceof Uint8ClampedArray ) {
		return "uint8-clamped-array";
	}
	
	if ( input instanceof Int8Array ) {
		return "int8-array";
	}
	
	if ( input instanceof Uint16Array ) {
		return "uint16-array";
	}
	
	if ( input instanceof Int16Array ) {
		return "int16-array";
	}
	
	if ( input instanceof Uint32Array ) {
		return "uint32-array";
	}
	
	if ( input instanceof Int32Array ) {
		return "int32-array";
	}
	
	if ( input instanceof Float32Array ) {
		return "float32-array";
	}
	
	if ( input instanceof Float64Array ) {
		return "float64-array";
	}
	
	if ( input instanceof Map ) {
		return "map";
	}
	
	if ( input instanceof WeakMap ) {
		return "weak-map";
	}
	
	if ( input instanceof Set ) {
		return "set";
	}
	
	if ( input instanceof WeakSet ) {
		return "weak-set";
	}
	
	if ( input instanceof RegExp ) {
		return "regexp"
	}
	
	if ( input instanceof Promise ) {
		return "promise";
	}
	
	return "object";
}
// endregion
