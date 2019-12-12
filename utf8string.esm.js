/**
 *	Author: JCloudYu
 *	Create: 2019/04/17
**/
import {ExtractArrayBuffer} from "./_helper.esm.js";



const ___IS_NODEJS = (typeof Buffer !== "undefined");
const EMPTY_BUFFER	= new ArrayBuffer(0);
const EMPTY_BYTES	= new Uint8Array(EMPTY_BUFFER);
const UTF8_DECODE_CHUNK_SIZE = 100;

export class UTF8String {
	constructor(inputString='') {
		if ( typeof inputString !== "string" ) {
			throw new TypeError( "UTF8String constructor only accepts js string!" );
		}
		
		this._raw_string = '';
		this._ab = EMPTY_BUFFER;
		this._ba = EMPTY_BYTES;
		
		this.string = inputString;
	}
	
	get string() {
		return this._raw_string;
	}
	set string(value) {
		value = `${value}`;
		this._raw_string = value;
		this._ba = UTF8String.Encode(value);
		this._ab = this._ba.buffer;
	}
	get buffer() {
		return this._ab.slice(0);
	}
	
	toString() {
		return this.string
	}
	[Symbol.toStringTag]() {
		return this.string
	}
	[Symbol.toPrimitive]() {
		return this.string
	}
	
	
	
	/**
	 * Generate a UTF8String object from given input
	 * @param {*} input
	 * @return {UTF8String}
	 * @constructor
	**/
	static From(input) {
		const instance = new UTF8String();
	
		if ( ___IS_NODEJS ) {
			if ( Buffer.isBuffer(input) ) {
				input = new Uint8Array(input);
			}
		}
		
		if ( ArrayBuffer.isView(input) ) {
			input = input.buffer;
		}
		
		if ( input instanceof ArrayBuffer ) {
			input = this.Decode(new Uint8Array(input));
		}
		
		
		
		instance.string = `${input}`;
		return instance;
	}
	
	/**
	 * Encode string to UTF8 buffer
	 * @param {string} str
	 * @returns {Uint8Array}
	**/
	static Encode(str) {
		if ( typeof str !== "string" ) {
			throw new TypeError( "Given input argument must be a js string!" );
		}
	
		let codePoints = [];
		let i=0;
		while( i < str.length ) {
			let codePoint = str.codePointAt(i);
			
			// 1-byte sequence
			if( (codePoint & 0xffffff80) === 0 ) {
				codePoints.push(codePoint);
			}
			// 2-byte sequence
			else if( (codePoint & 0xfffff800) === 0 ) {
				codePoints.push(
					0xc0 | (0x1f & (codePoint >> 6)),
					0x80 | (0x3f & codePoint)
				);
			}
			// 3-byte sequence
			else if( (codePoint & 0xffff0000) === 0 ) {
				codePoints.push(
					0xe0 | (0x0f & (codePoint >> 12)),
					0x80 | (0x3f & (codePoint >> 6)),
					0x80 | (0x3f & codePoint)
				);
			}
			// 4-byte sequence
			else if( (codePoint & 0xffe00000) === 0 ) {
				codePoints.push(
					0xf0 | (0x07 & (codePoint >> 18)),
					0x80 | (0x3f & (codePoint >> 12)),
					0x80 | (0x3f & (codePoint >> 6)),
					0x80 | (0x3f & codePoint)
				);
			}
			
			i += (codePoint>0xFFFF) ? 2 : 1;
		}
		return new Uint8Array(codePoints);
	}
	
	/**
	 * Decode UTF8 buffer to string
	 * @param {Uint8Array} raw_bytes
	 * @returns {string}
	**/
	static Decode(raw_bytes) {
		raw_bytes = new Uint8Array(ExtractArrayBuffer(raw_bytes));
	
		let uint8 = raw_bytes;
		let codePoints = [];
		let i = 0;
		while( i < uint8.length ) {
			let codePoint = uint8[i] & 0xff;
			
			// 1-byte sequence (0 ~ 127)
			if( (codePoint & 0x80) === 0 ){
				codePoints.push(codePoint);
				i += 1;
			}
			// 2-byte sequence (192 ~ 223)
			else if( (codePoint & 0xE0) === 0xC0 ){
				codePoint = ((0x1f & uint8[i]) << 6) | (0x3f & uint8[i + 1]);
				codePoints.push(codePoint);
				i += 2;
			}
			// 3-byte sequence (224 ~ 239)
			else if( (codePoint & 0xf0) === 0xe0 ){
				codePoint = ((0x0f & uint8[i]) << 12)
					| ((0x3f & uint8[i + 1]) << 6)
					| (0x3f & uint8[i + 2]);
				codePoints.push(codePoint);
				i += 3;
			}
			// 4-byte sequence (249 ~ )
			else if( (codePoint & 0xF8) === 0xF0 ){
				codePoint = ((0x07 & uint8[i]) << 18)
					| ((0x3f & uint8[i + 1]) << 12)
					| ((0x3f & uint8[i + 2]) << 6)
					| (0x3f & uint8[i + 3]);
				codePoints.push(codePoint);
				i += 4;
			}
			else {
				i += 1;
			}
		}
		
		
		
		let result_string = "";
		while(codePoints.length > 0) {
			const chunk = codePoints.splice(0, UTF8_DECODE_CHUNK_SIZE);
			result_string += String.fromCodePoint(...chunk);
		}
		return result_string;
	}
}
