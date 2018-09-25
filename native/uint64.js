/**
 * Author: JCloudYu
 * Create: 2018/09/24
**/
((exports)=>{
	"use strict";
	
	const _previous = exports.UInt64;
	
	// Detect NodeJS Buffer implementation
	let BUFFER = null;
	if ( typeof Buffer !== "undefined" ) {
		BUFFER = Buffer;
	}
	
	
	
	const LO = 0, HI = 1;
	const LEFT_MOST_32 = 0x80000000;
	const OVERFLOW_MAX	= (0xFFFFFFFF >>> 0) + 1;
	const DECIMAL_STEPPER = new Uint32Array([0x3B9ACA00, 0x00000000]);
	const MAGIC_STRING = "\u0000\u0018\u0002\u000C";
	const SERIALIZE_MAP = "0123456789abcdefghijklmnopqrstuvwxyz-_ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
//	const SERIALIZE_MAP = "lqNOoVX_vMhSQZzFkRP51n3x8m6HJd-T9Bg0EapysGY7twLruCf4cjieKbUWI2DA".split('');
	const SERIALIZE_MAP_R = {};
	for( let i=0; i<SERIALIZE_MAP.length; i++ ) { SERIALIZE_MAP_R[SERIALIZE_MAP[i]] = i; }
	
	class UInt64 {
		constructor(value=0){
			this.value  = value;
		}
		
		rshift(bits) {
			const newVal = UInt64.from(this);
			___RIGHT_SHIFT(newVal._ta, bits);
			return newVal;
		}
		lshift(bits) {
			const newVal = UInt64.from(this);
			___LEFT_SHIFT(newVal._ta, bits);
			return newVal;
		}
		not() {
			const newVal = UInt64.from(this);
			___NOT(newVal._ta);
			return newVal;
		}
		or(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			
			const newVal = new UInt64(this);
			___OR(newVal._ta, val);
			return newVal;
		}
		and(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			
			const newVal = new UInt64(this);
			___AND(newVal._ta, val);
			return newVal;
		}
		xor(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			
			const newVal = new UInt64(this);
			___XOR(newVal._ta, val);
			return newVal;
		}
		
		
		add(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			const newVal = new UInt64(this);
			___ADD(newVal._ta, val);
			return newVal;
		}
		sub(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			const newVal = new UInt64(this);
			___SUB(newVal._ta, val.slice(0));
			return newVal;
		}
		multiply(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			const newVal = new UInt64(this);
			___MULTIPLY(newVal._ta, val);
			return newVal;
		}
		mul(...args) {
			return this.multiply(...args);
		}
		divide(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			return new UInt64(___DIVIDE(this._ta.slice(0), val.slice(0)));
		}
		div(...args) {
			return this.divide(...args);
		}
		modulo(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			const newVal = UInt64.from(this);
			___DIVIDE(newVal._ta, val.slice(0));
			return newVal;
		}
		
		compare(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			return ___COMPARE(this._ta, val);
		}
		isZero() {
			return ___IS_ZERO(this._ta);
		}
		
		serialize() {
			const resultBuff = new Uint8Array(this._ta.buffer);
			let tail = [0, 0, 0, 0], str = MAGIC_STRING;
			str += SERIALIZE_MAP[resultBuff[0] >>> 2];
			tail[0] = (tail[0] | (resultBuff[0] & 0x03)) << 2;
			str += SERIALIZE_MAP[resultBuff[1] >>> 2];
			tail[0] =  tail[0] | (resultBuff[1] & 0x03);
			
			str += SERIALIZE_MAP[resultBuff[2] >>> 2];
			tail[1] = (tail[1] | (resultBuff[2] & 0x03)) << 2;
			str += SERIALIZE_MAP[resultBuff[3] >>> 2];
			tail[1] =  tail[1] | (resultBuff[3] & 0x03);
			
			str += SERIALIZE_MAP[resultBuff[4] >>> 2];
			tail[2] = (tail[2] | (resultBuff[4] & 0x03)) << 2;
			str += SERIALIZE_MAP[resultBuff[5] >>> 2];
			tail[2] =  tail[2] | (resultBuff[5] & 0x03);
			
			str += SERIALIZE_MAP[resultBuff[6] >>> 2];
			tail[3] = (tail[3] | (resultBuff[6] & 0x03)) << 2;
			str += SERIALIZE_MAP[resultBuff[7] >>> 2];
			tail[3] =  tail[3] | (resultBuff[7] & 0x03);
			
			str += SERIALIZE_MAP[tail[0]];
			str += SERIALIZE_MAP[tail[1]];
			str += SERIALIZE_MAP[tail[2]];
			str += SERIALIZE_MAP[tail[3]];
			
			return str;
		}
		toString(bits=10) {
			switch( bits ) {
				case 2:
					return ___TO_BINARY_STRING(this._ta);
				case 10:
					return ___TO_DECIMAL_STRING(this._ta);
				case 16:
					return ___TO_HEX_STRING(this._ta);
				default:
					throw new TypeError( "Unexpected representation type" )
			}
		}
		toJSON() {
			return this.serialize();
		}
		
		
		set value(val) {
			const _val = ___UNPACK(val);
			if ( _val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			this._ta = _val.slice(0);
		}
		get hi() {
			return this._ta[HI];
		}
		set hi(value) {
			const val = parseInt(value);
			if ( Number.isNaN(val) ) {
				throw new TypeError( "Given value is not a valid UInt32 format" );
			}
			
			this._ta[HI] = val >>> 0;
		}
		get lo() {
			return this._ta[LO];
		}
		set lo(value) {
			const val = parseInt(value);
			if ( Number.isNaN(val) ) {
				throw new TypeError( "Given value is not a valid UInt32 format" );
			}
			
			this._ta[LO] = val >>> 0;
		}
		
		
		static deserialize(serialized_str) {
			if ( serialized_str.length !== 16 && serialized_str.slice(0, 4) !== MAGIC_STRING ) {
				throw new TypeError( "The input serialized string is invalid!" );
			}
			
			const recovered = new Uint8Array(8);
			const tail = [
				SERIALIZE_MAP_R[serialized_str[12]],
				SERIALIZE_MAP_R[serialized_str[13]],
				SERIALIZE_MAP_R[serialized_str[14]],
				SERIALIZE_MAP_R[serialized_str[15]]
			];
			
			recovered[0] = (SERIALIZE_MAP_R[serialized_str[ 4]] << 2)|((tail[0]>>2) & 0x03);
			recovered[1] = (SERIALIZE_MAP_R[serialized_str[ 5]] << 2)|( tail[0]     & 0x03);
			
			recovered[2] = (SERIALIZE_MAP_R[serialized_str[ 6]] << 2)|((tail[1]>>2) & 0x03);
			recovered[3] = (SERIALIZE_MAP_R[serialized_str[ 7]] << 2)|( tail[1]     & 0x03);
		
			recovered[4] = (SERIALIZE_MAP_R[serialized_str[ 8]] << 2)|((tail[2]>>2) & 0x03);
			recovered[5] = (SERIALIZE_MAP_R[serialized_str[ 9]] << 2)|( tail[2]     & 0x03);
			
			recovered[6] = (SERIALIZE_MAP_R[serialized_str[10]] << 2)|((tail[3]>>2) & 0x03);
			recovered[7] = (SERIALIZE_MAP_R[serialized_str[11]] << 2)|( tail[3]     & 0x03);
			
			return UInt64.from(recovered.buffer);
		}
		static from(value=0) {
			return new UInt64(value);
		}
		static ZERO() {
			return new UInt64();
		}
		static MAX_UINT64() {
			const val = new UInt64();
			val.hi = 0xFFFFFFFF;
			val.lo = 0xFFFFFFFF;
			return val;
		}
		
		
		static noConflict() {
			if ( _previous ) {
				exports.UInt64 = _previous;
			}
			return exports.UInt64;
		}
	}
	exports.UInt64 = UInt64;
	
	
	
	/**
	 * Get raw Uint32Array values converted from source value
	 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer} value
	 * @returns {Uint32Array}
	 * @private
	 */
	function ___UNPACK(value) {
		if ( value instanceof UInt64 ) {
			return value._ta;
		}
		if ( value instanceof Uint32Array ) {
			const array = new Uint32Array(2);
			array[LO] = value[LO] || 0;
			array[HI] = value[HI] || 0;
			return array;
		}
		if ( value instanceof ArrayBuffer ) {
			return new Uint32Array(value);
		}
		if ( BUFFER && value instanceof BUFFER ) {
			const buff	= new ArrayBuffer(8);
			const uint8 = new Uint8Array(buff);
			for ( let i=0; i<8; i++ ) {
				uint8[i] = buff[i]||0;
			}
			
			return new Uint32Array(buff);
		}
		
		// UInt64 represented with UInt32 values, little-endian
		if ( Array.isArray(value) ) {
			return new Uint32Array(value);
		}
		
		const type = typeof value;
		const buff = new ArrayBuffer(8);
		const u32  = new Uint32Array(buff);
		switch( type ) {
			case "number":
			{
				value = Math.floor(value);
				u32[LO] = value % OVERFLOW_MAX;
				value = Math.floor(value / OVERFLOW_MAX);
				u32[HI] = value % OVERFLOW_MAX;
				break;
			}
			
			case "string":
			default:
				return null;
		}
		
		return u32;
	}
	
	/**
	 * A mutable operation that perform bitwise and between two UInt64 value
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	 */
	function ___AND(a, b) {
		a[HI] = (a[HI] & b[HI])>>>0;
		a[LO] = (a[LO] & b[LO])>>>0;
	}
	
	/**
	 * A mutable operation that perform bitwise or between two UInt64 value
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	 */
	function ___OR(a, b) {
		a[HI] = (a[HI] | b[HI])>>>0;
		a[LO] = (a[LO] | b[LO])>>>0;
	}
	
	/**
	 * A mutable operation that perform bitwise or between two UInt64 value
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	 */
	function ___XOR(a, b) {
		a[HI] = (a[HI] ^ b[HI])>>>0;
		a[LO] = (a[LO] ^ b[LO])>>>0;
	}
	
	/**
	 * A mutable operation that perform bitwise not to the given UInt64 value
	 * @param {Uint32Array} value
	 * @private
	 */
	function ___NOT(value) {
		value[HI] = (~value[HI])>>>0;
		value[LO] = (~value[LO])>>>0;
	}

	/**
	 * A mutable operation that shifts the bits right.
	 * Note that this function is mutable...
	 * @param {Uint32Array} value
	 * @param {Number} BITS
	 * @private
	 */
	function ___RIGHT_SHIFT(value, BITS) {
		if ( typeof BITS !== "number" ) {
			throw new TypeError( "Shift bits number must be a number" );
		}
	
		if ( BITS >= 64 ) {
			value[HI] = 0;
			value[LO] = 0;
			return;
		}
		
		if ( BITS <= 32 ) {
			const MASK = ___GEN_MASK(BITS);
			let shifted = (value[HI] & MASK) >>> 0;
			value[HI] = value[HI] >>> BITS;
			value[LO] = ((value[LO] >>> BITS) | (shifted << (32 - BITS)))>>>0;
			
			return;
		}
		
		BITS = BITS - 32;
		value[LO] = (value[HI] >>> BITS);
		value[HI] = 0;
	}
	
	/**
	 * A mutable operation that shifts the bits left.
	 * Note that this function is mutable...
	 * @param {Uint32Array} value
	 * @param {Number} BITS
	 * @private
	 */
	function ___LEFT_SHIFT(value, BITS) {
		if ( typeof BITS !== "number" ) {
			throw new TypeError( "Shift bits number must be a number" );
		}
	
		if ( BITS >= 64 ) {
			value[HI] = 0;
			value[LO] = 0;
			return;
		}
		
		if ( BITS <= 32 ) {
			const MASK = (~___GEN_MASK(32-BITS)) >>> 0;
			let shifted = (value[LO] & MASK) >>> (32-BITS);
			value[LO] = (value[LO] << BITS) >>> 0;
			value[HI] = (value[HI] << BITS | shifted) >>> 0;
			return;
		}
		
		BITS = BITS - 32;
		value[HI] = (value[LO] << BITS) >>> 0;
		value[LO] = 0;
	}
	
	/**
	 * Compare two UInt64 values return -1 if a < b, 1 if a > b, 0 otherwise
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @return {Number}
	 * @private
	 */
	function ___COMPARE(a, b) {
		if ( a[HI] < b[HI] ) {
			return -1;
		}
		else
		if( a[HI] > b[HI] ) {
			return 1;
		}
		else
		if ( a[LO] < b[LO] ) {
			return -1;
		}
		else
		if (a[LO] > b[LO] ) {
			return 1;
		}
		else {
			return 0;
		}
	}
	
	/**
	 * Perform UInt64 a + b and write the result back to a
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @param {Number} _v
	 * @private
	 */
	function ___ADD(a, b, _v=0) {
		let temp = b[LO] + a[LO] + _v;
		a[HI] = (b[HI] + a[HI]) + (temp / OVERFLOW_MAX);
		a[LO] = temp % OVERFLOW_MAX;
	}
	
	/**
	 * Perform UInt64 a * b and write the result back to a
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	 */
	function ___MULTIPLY(a, b) {
		let temp = a[LO] * b[LO];
		a[HI] = a[LO] * b[HI] + a[HI] * b[LO] + (temp / OVERFLOW_MAX);
		a[LO] = temp % OVERFLOW_MAX;
	}
	
	/**
	 * Perform UInt64 a / b and write the remainder back to a and return quotient back
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @return {Uint32Array}
	 * @private
	 */
	function ___DIVIDE(a, b) {
		const quotient	= new Uint32Array(2);
		if ( ___COMPARE(a, b) < 0 ) {
			return quotient;
		}
		
		
		
		let remainder = a.slice(0);
		
		// region [ Align divider and remainder ]
		let d_padding = 0, r_padding = 0, count = 64;
		while( count-- > 0 ) {
			if ( (remainder[HI] & LEFT_MOST_32) !== 0 ) {
				break;
			}
			
			___LEFT_SHIFT(remainder, 1);
			r_padding++;
		}
		remainder = a;
		
		count = 64;
		while( count-- > 0 ) {
			if ( (b[HI] & LEFT_MOST_32) !== 0 ) {
				break;
			}
			
			___LEFT_SHIFT(b, 1);
			d_padding++;
		}
		___RIGHT_SHIFT(b, r_padding);
		// endregion
		
		// region [ Calc division ]
		count = d_padding - r_padding;
		while( count-- > 0 ) {
			if ( ___COMPARE(a, b) < 0 ) {
				___LEFT_SHIFT(quotient, 1);
			}
			else {
				___SUB(remainder, b.slice(0));
				quotient[LO] = quotient[LO] | 0x01;
				___LEFT_SHIFT(quotient, 1);
			}
			___RIGHT_SHIFT(b, 1);
		}
		// endregion
		
		return quotient;
	}
	
	/**
	 * Perform UInt64 a + b and write the result back to a
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	 */
	function ___SUB(a, b) {
		___NOT(b);
		___ADD(a, b, 1);
	}
	
	/**
	 * Generate a 32bits mask
	 * @param {Number} BITS
	 * @private
	 */
	function ___GEN_MASK(BITS) {
		if ( BITS > 32 ) BITS = 32;
		if ( BITS < 0 ) BITS = 0;
	
		let val = 0;
		while( BITS-- > 0 ) {
			val = ((val << 1) | 1) >>> 0;
		}
		return val;
	}
	
	/**
	 * Check if given val is zero
	 * @param {Uint32Array} val
	 * @return {boolean}
	 * @private
	 */
	function ___IS_ZERO(val) {
		return (val[HI] === 0) && (val[LO] === 0);
	}
	
	
	
	/**
	 * Return binary representation of the given UInt64 number
	 * @param {Uint32Array} val
	 * @return {String}
	 * @private
	 */
	function ___TO_BINARY_STRING(val) {
		let count = 0, str = '', copy = val.slice(0);
		while(count++ < 64) {
			str += (copy[1] & LEFT_MOST_32) ? '1' : '0';
			___LEFT_SHIFT(copy, 1);
		}
		return str;
	}
	
	/**
	 * Return hex representation of the given UInt64 number
	 * @return {String}
	 * @private
	 */
	function ___TO_HEX_STRING(val) {
		let hHex = val[HI].toString(16);
		let lHex = val[LO].toString(16);
		return ___PADDING_ZERO(hHex, 0) + ___PADDING_ZERO(lHex, 8);
	}
	
	/**
	 * Return decimal representation of the given UInt64 number
	 * @return {String}
	 * @private
	 */
	function ___TO_DECIMAL_STRING(val) {
		let output = [];
		
		let remain = val.slice(0);
		while ( !___IS_ZERO(remain) ) {
			let quotient = ___DIVIDE(remain, DECIMAL_STEPPER);
			output.unshift(remain[LO].toString(10));
			remain = quotient;
		}
		
		if ( output.length === 0 ) {
			return '0';
		}
		else {
			let o = output.shift();
			for(let comp of output) {
				o += ___PADDING_ZERO(comp, 9);
			}
			
			return o;
		}
	}
	
	/**
	 * Add padding zeros to the given string data
	 * @param {string} data
	 * @param {number} length
	 * @private
	 */
	function ___PADDING_ZERO(data, length=8) {
		let padding = length - data.length;
		let padded = '';
		while(padding-- > 0) {
			padded += '0';
		}
		
		return padded + data;
	}
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));
