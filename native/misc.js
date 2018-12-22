/**
 *	Author: JCloudYu
 *	Create: 2018/12/22
**/
(()=>{
	"use strict";
	
	module.exports = {
		TypeOf:function(input, resolveObj=false) {
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
	}
})();
