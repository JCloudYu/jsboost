/**
 * Author: JCloudYu
 * Create: 2018/09/24
**/
((exported)=>{
	"use strict";
	
	const _previous = exports.AsyncInvoke;
	
	// Detect NodeJS Buffer implementation
	let BUFFER = null;
	if ( typeof Buffer !== "undefined" ) {
		BUFFER = Buffer;
	}
	
	
	
	const LO = 0, HI = 1;
	const LEFT_MOST_32 = 0x80000000;
	const OVERFLOW_MAX	= (0xFFFFFFFF >>> 0) + 1;
	
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
		divide(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			return new UInt64(___DIVIDE(this._ta.slice(0), val.slice(0)));
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
		toString(bits=10) {
			switch( bits ) {
				case 2:
					return ___TO_BINARY_STRING(this._ta);
				default:
					throw new TypeError( "Unexpected representation type" )
			}
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
		
		
		static compare(a, b) {
			if (!(a instanceof UInt64)) {
				a = UInt64.from(a);
			}
			
			return a.compare(b);
		}
		static from(value=0) {
			return new UInt64(value);
		}
		static noConflict() {
			if ( _previous ) {
				exports.UInt64 = _previous;
			}
			return exports.UInt64;
		}
		static Zero() {
			return new UInt64();
		}
		static MAX_UINT64() {
			const val = new UInt64();
			val.hi = 0xFFFFFFFF;
			val.lo = 0xFFFFFFFF;
			return val;
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
			const array = new Uint32Array(value);
			array[LO] = value[LO] || 0;
			array[HI] = value[HI] || 0;
			return array;
		}
		if ( BUFFER && value instanceof BUFFER ) {
			const buff	= new ArrayBuffer(8);
			const uint8 = new Uint8Array(buff);
			for ( let i=0; i<8; i++ ) {
				uint8[i] = buff[i]||0;
			}
			
			return new Uint32Array(buff);
		}
		
		const type = typeof value;
		const buff = new ArrayBuffer(8);
		const u32 = new Uint32Array(buff);
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
	 * Return a binary representation of the given UInt64 number
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
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));
