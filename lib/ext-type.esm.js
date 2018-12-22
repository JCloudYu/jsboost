/**
*	Author: JCloudYu
*	Create: 2018/12/22
**/
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
}
