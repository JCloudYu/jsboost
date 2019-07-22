/**
 *	Author: JCloudYu
 *	Create: 2019/05/04
**/
import {UTF8String} from "./utf8string.esm.js";
const HEX_FORMAT = /^(0x)?([0-9a-fA-F]+)$/;
const BIT_FORMAT = /^(0b|0B)?([01]+)$/;
const HEX_MAP	 = "0123456789abcdef";
const HEX_MAP_R	 = {
	"0":0, "1":1, "2":2, "3":3,
	"4":4, "5":5, "6":6, "7":7,
	"8":8, "9":9, "a":10, "b":11,
	"c":12, "d":13, "e":14, "f":15
};

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
export function ExtractArrayBuffer(input) {
	if ( typeof Buffer !== "undefined" ) {
		if ( input instanceof Buffer ) {
			let buff = Buffer.alloc(input.length);
			input.copy(buff, 0);
			return buff.buffer;
		}
	}
	
	if ( ArrayBuffer.isView(input) ) {
		return input.buffer;
	}
	
	if ( input instanceof ArrayBuffer ) {
		return input;
	}
	
	throw new TypeError( "Cannot convert given input data into array buffer" );
}
export function BuildArrayBuffer(input, conversion_info=null) {
	if ( typeof Buffer !== "undefined" ) {
		if ( input instanceof Buffer ) {
			let buff = Buffer.alloc(input.length);
			input.copy(buff, 0);
			return buff.buffer;
		}
	}
	
	if ( ArrayBuffer.isView(input) ) {
		return input.buffer.slice(0);
	}
	
	if ( input instanceof ArrayBuffer ) {
		return input.slice(0);
	}
	
	if ( Array.isArray(input) ) {
		const buffer = new Uint8Array(input);
		return buffer.buffer;
	}
	
	if ( typeof input === "number" ) {
		let data_buffer = null;
		switch(conversion_info) {
			case 'int8':
				data_buffer = new Int8Array([input]);
				break;
			
			case 'uint8':
				data_buffer = new Uint8Array([input]);
				break;
				
			case 'int16':
				data_buffer = new Int16Array([input]);
				break;
				
			case 'uint16':
				data_buffer = new Uint16Array([input]);
				break;
				
			case 'int32':
				data_buffer = new Int32Array([input]);
				break;
				
			case 'int64':{
				const negative = input < 0;
				if ( negative ) { input = -input; }
				
				let upper = Math.floor(input/0xFFFFFFFF);
				let lower = input & 0xFFFFFFFF;
				if ( negative ) {
					lower = ((~lower)>>>0) + 1;
					upper = (~upper) + Math.floor(lower/0xFFFFFFFF);
				}
				
				data_buffer = new Uint32Array([lower, upper]);
				break;
			}
			
			case 'uint64': {
				const upper = Math.floor(input/0xFFFFFFFF);
				const lower = input & 0xFFFFFFFF;
				data_buffer = new Uint32Array([lower, upper]);
				break;
			}
			
			case 'float32':
				data_buffer = new Float32Array([input]);
				break;
			
			case 'float64':
				data_buffer = new Float64Array([input]);
				break;
				
			case 'uint32':
			default:
				data_buffer = new Uint32Array([input]);
				break;
		}
		
		return data_buffer.buffer;
	}
	
	if ( typeof input === "string" ) {
		if ( conversion_info === "hex" ) {
			const matches = input.match(HEX_FORMAT);
			if ( !matches ) {
				throw new RangeError( "Input argument is not a valid hex string!" );
			}
		
			let [,,hex_string] = matches;
			if ( hex_string.length % 2 === 0 ) {
				hex_string = hex_string.toLowerCase();
			}
			else {
				hex_string = '0' + hex_string.toLowerCase();
			}
			
			
			
			const buff = new Uint8Array((hex_string.length/2)|0);
			for ( let i=0; i<buff.length; i++ ) {
				const offset = i * 2;
				buff[i] = HEX_MAP_R[hex_string[offset]]<<4 | (HEX_MAP_R[hex_string[offset+1]] & 0x0F);
			}
			
			return buff.buffer;
		}
		else
		if ( conversion_info === "bits" ) {
			const matches = input.match(BIT_FORMAT);
			if ( !matches ) {
				throw new RangeError( "Input argument is not a valid bit string!" );
			}
			
			let [,,bit_string] = matches;
			if ( bit_string.length % 8 !== 0 ) {
				bit_string = '0'.repeat(bit_string.length%8) + bit_string;
			}
			
			
			
			const buff = new Uint8Array((bit_string.length/8)|0);
			for ( let i=0; i<buff.length; i++ ) {
				const offset = i * 8;
				let value = (bit_string[offset]==='1'?1:0);
				for (let k=1; k<8; k++) {
					value = (value << 1) | (bit_string[offset + k]==='1'?1:0);
				}
				buff[i] = value;
			}
			
			return buff.buffer;
		}
		else {
			return UTF8String.Encode(input).buffer;
		}
	}
	
	throw new TypeError( "Cannot convert given input data into array buffer!" );
}
export function CastArrayBufferToString(input, format=16, padding=false) {
	if ( !(input instanceof ArrayBuffer) ) {
		throw new TypeError( "Given input must be an ArrayBuffer!" );
	}
	
	const bytes = new Uint8Array(input);
		
	let result = '';
	switch(format) {
		case 16:
			for(let i=0; i<bytes.length; i++) {
				const value = bytes[i];
				result += HEX_MAP[(value&0xF0)>>>4] + HEX_MAP[value&0x0F];
			}
			break;
			
		case 2:
			for(let i=0; i<bytes.length; i++) {
				const value = bytes[i];
				for (let k=7; k>=0; k--) {
					result += ((value >>> k) & 0x01) ? '1' : '0';
				}
			}
			break;
		
		default:
			throw new RangeError( "Unsupported numeric representation!" );
	}
	
	return padding ? result : result.replace(/^0+/, '');
}
export function ObjectAssignProperties(object, props, attr={configurable:false, enumerable:false, writable:false}) {
	for( const prop in props ) {
		if ( (props.hasOwnProperty && !props.hasOwnProperty(prop)) ||
			 (props[prop] === undefined)
		) { continue; }
		
		Object.defineProperties(object, prop, {
			value:props[prop],
			configurable:!!attr.configurable,
			enumerable:!!attr.enumerable,
			writable:!!attr.writable
		});
	}
	
	return object;
}
