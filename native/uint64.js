/**
 * Author: JCloudYu
 * Create: 2018/09/24
**/
((exports)=>{
	"use strict";
	
	const _previous_uint64 = exports.UInt64;
	const _previous_int64  = exports.Int64;
	
	// region [ Detect NodeJS Buffer implementation ]
	let BUFFER = null;
	if ( typeof Buffer !== "undefined" ) {
		BUFFER = Buffer;
	}
	// endregion
	
	// region [ Internal constants ]
	const MAGIC_STRING_UINT64 = "\u0000\u0018\u0002\u000C";
	const MAGIC_STRING_INT64  = "\u0000\u0018\u0002\u000C";
	const LO = 0, HI = 1;
	
	const LEFT_MOST_32    = 0x80000000;
	const OVERFLOW32_MAX  = (0xFFFFFFFF >>> 0) + 1;
	const OVERFLOW16_MAX  = (0xFFFF >>> 0) + 1;
	const DECIMAL_STEPPER = new Uint32Array([0x3B9ACA00, 0x00000000]);	// 1000000000
	const SERIALIZE_MAP   = "0123456789abcdefghijklmnopqrstuvwxyz-_ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	const SERIALIZE_MAP_R = {};
	const INTEGER_FORMAT  = /^[+-]?[0-9]+$/;
	const HEX_FORMAT	  = /^(0x)?[0-9A-F]+$/;
	const BIN_FORMAT	  = /^0b[01]+$/;
	for( let i=0; i<SERIALIZE_MAP.length; i++ ) { SERIALIZE_MAP_R[SERIALIZE_MAP[i]] = i; }
	// endregion
	
	
	
	class UInt64 {
		/**
		 * UInt64 Constructor
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		**/
		constructor(value=0){
			this.value  = value;
		}
		
		/**
		 * Perform bit-wise right shift operation and return the result
		 * @param {Number} bits shift distance
		 * @returns {UInt64}
		**/
		rshift(bits) {
			const newVal = UInt64.from(this);
			___RIGHT_SHIFT_UNSIGNED(newVal._ta, bits);
			return newVal;
		}
		
		/**
		 * Perform bit-wise left shift operation and return the result
		 * @param {Number} bits shift distance
		 * @returns {UInt64}
		**/
		lshift(bits) {
			const newVal = UInt64.from(this);
			___LEFT_SHIFT(newVal._ta, bits);
			return newVal;
		}
		
		/**
		 * Perform bit-wise not operation and return the result
		 * @returns {UInt64}
		**/
		not() {
			const newVal = UInt64.from(this);
			___NOT(newVal._ta);
			return newVal;
		}
		
		/**
		 * Perform bit-wise or operation with the given value and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		or(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			
			const newVal = new UInt64(this);
			___OR(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Perform bit-wise and operation with the given value and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		and(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			
			const newVal = new UInt64(this);
			___AND(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Perform bit-wise xor operation with the given value and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		xor(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			
			const newVal = new UInt64(this);
			___XOR(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Add the instance with given value (UInt64 + value) and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		add(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			const newVal = new UInt64(this);
			___ADD(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Sub the instance with given value (UInt64 - value) and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		sub(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			const newVal = new UInt64(this);
			___SUB(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Multiply the instance with given value (UInt64 * value) and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		multiply(value) {
			return this.mul(value);
		}
		
		/**
		 * Multiply the instance with given value (UInt64 * value) and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		mul(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			const newVal = new UInt64(this);
			___MULTIPLY(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Divide the instance with given value (UInt64 / value) and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		divide(value) {
			return this.div(value);
		}
		
		/**
		 * Divide the instance with given value (UInt64 / value) and return the result
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		div(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			return new UInt64(___DIVIDE(this._ta.slice(0), val.slice(0)));
		}
		
		/**
		 * Divide the instance with given value (UInt64 / value) and return the modulo
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		modulo(value) {
			return this.mod(value);
		}
		
		/**
		 * Divide the instance with given value (UInt64 / value) and return the modulo
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		mod(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 format!" );
			}
			
			const newVal = UInt64.from(this);
			___DIVIDE(newVal._ta, val.slice(0));
			return newVal;
		}
		
		/**
		 * Compare the instance with given value
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {number} returns 1 if UInt32 > value, -1 if UInt32 < value, 0 otherwise
		**/
		compare(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid UInt64 representation!" );
			}
			
			return ___COMPARE(this._ta, val);
		}
		
		/**
		 * A short hand function that tells whether the instance equals zero
		 * @returns {boolean}
		**/
		isZero() {
			return ___IS_ZERO(this._ta);
		}
		
		/**
		 * Serialize the instance
		 * @returns {string}
		**/
		serialize() {
			const resultBuff = new Uint8Array(this._ta.buffer);
			let tail = [0, 0, 0, 0], str = MAGIC_STRING_UINT64;
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
		
		/**
		 * Render the instance into printable string representation
		 * @param {number} bits The representation format
		 * @returns {string}
		**/
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
		
		/**
		 * @alias UInt64.serialize
		**/
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
		
		
		/**
		 * Deserialize a serialized data and return the corresponding UInt64 instance
		 * @param {string} serialized_str The serialized UInt64 data
		 * @returns {UInt64}
		**/
		static deserialize(serialized_str) {
			if ( serialized_str.length !== 16 && serialized_str.slice(0, 4) !== MAGIC_STRING_UINT64 ) {
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
		
		/**
		 * Instantiate a UInt64 base on input value
		 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {UInt64}
		**/
		static from(value=0) {
			return new UInt64(value);
		}
		
		
		/**
		 * Return an UInt64 instance with value 0
		 * @returns {UInt64}
		**/
		static get ZERO() {
			return new UInt64();
		}
		
		/**
		 * Return an UInt64 instance with value 0xFFFFFFFFFFFFFFFF
		 * @returns {UInt64}
		**/
		static get MAX_UINT64() {
			const val = new UInt64();
			val.hi = 0xFFFFFFFF;
			val.lo = 0xFFFFFFFF;
			return val;
		}
		
		/**
		 * Revert to previous version...
		 * @returns {UInt64}
		**/
		static noConflict() {
			if ( _previous_uint64 ) {
				exports.UInt64 = _previous_uint64;
			}
			return exports.UInt64;
		}
	}
	exports.UInt64 = UInt64;
	
	class Int64 {
		/**
		 * Int64 Constructor
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		**/
		constructor(value=0){
			this.value  = value;
		}
		
		/**
		 * Perform bit-wise right shift operation and return the result
		 * @param {Number} bits shift distance
		 * @returns {Int64}
		**/
		rshift(bits) {
			const newVal = Int64.from(this);
			___RIGHT_SHIFT_SIGNED(newVal._ta, bits);
			return newVal;
		}
		
		/**
		 * Perform bit-wise left shift operation and return the result
		 * @param {Number} bits shift distance
		 * @returns {Int64}
		**/
		lshift(bits) {
			const newVal = Int64.from(this);
			___LEFT_SHIFT(newVal._ta, bits);
			return newVal;
		}
		
		/**
		 * Perform bit-wise not operation and return the result
		 * @returns {Int64}
		**/
		not() {
			const newVal = Int64.from(this);
			___NOT(newVal._ta);
			return newVal;
		}
		
		/**
		 * Perform bit-wise or operation with the given value and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		or(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 representation!" );
			}
			
			
			const newVal = new Int64(this);
			___OR(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Perform bit-wise and operation with the given value and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		and(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 representation!" );
			}
			
			
			const newVal = new Int64(this);
			___AND(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Perform bit-wise xor operation with the given value and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		xor(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 representation!" );
			}
			
			
			const newVal = new Int64(this);
			___XOR(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Add the instance with given value (Int64 + value) and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		add(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 representation!" );
			}
			
			const newVal = new Int64(this);
			___ADD(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Sub the instance with given value (Int64 - value) and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		sub(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 format!" );
			}
			
			const newVal = new Int64(this);
			___SUB(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Multiply the instance with given value (Int64 * value) and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		multiply(value) {
			return this.mul(value);
		}
		
		/**
		 * Multiply the instance with given value (Int64 * value) and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		mul(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 format!" );
			}
			
			const newVal = new Int64(this);
			___MULTIPLY(newVal._ta, val);
			return newVal;
		}
		
		/**
		 * Divide the instance with given value (Int64 / value) and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		divide(value) {
			return this.div(value);
		}
		
		/**
		 * Divide the instance with given value (Int64 / value) and return the result
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		div(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 format!" );
			}
			
			let neg_self  = ___IS_NEGATIVE(this._ta) ? 1 : 0;
			let self = this._ta.slice(0);
			if ( neg_self ) {
				___TWO_S_COMPLIMENT(self);
			}
			
			let neg_input = ___IS_NEGATIVE(val) ? 1 : 0;
			let input = val.slice(0);
			if ( neg_input ) {
				___TWO_S_COMPLIMENT(input);
			}
			
			let quotient = ___DIVIDE(self, input);
			if ( neg_input ^ neg_self ) {
				___TWO_S_COMPLIMENT(quotient);
			}
			
			return new Int64(quotient);
		}
		
		/**
		 * Divide the instance with given value (Int64 / value) and return the modulo
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		modulo(value) {
			return this.mod(value);
		}
		
		/**
		 * Divide the instance with given value (Int64 / value) and return the modulo
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		mod(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 format!" );
			}
			
			let neg_self  = ___IS_NEGATIVE(this._ta) ? 1 : 0;
			let self = this._ta.slice(0);
			if ( neg_self ) {
				___TWO_S_COMPLIMENT(self);
			}
			
			let neg_input = ___IS_NEGATIVE(val) ? 1 : 0;
			let input = val.slice(0);
			if ( neg_input ) {
				___TWO_S_COMPLIMENT(input);
			}
			
			___DIVIDE(self, input);
			if ( neg_input ^ neg_self ) {
				if ( neg_self ) {
					___TWO_S_COMPLIMENT(self);
				}
			}
			
			return Int64.from(self);
		}
		
		/**
		 * Compare the instance with given value
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {number} returns 1 if UInt32 > value, -1 if UInt32 < value, 0 otherwise
		**/
		compare(value) {
			const val = ___UNPACK(value);
			if ( val === null ) {
				throw new TypeError( "Given value is not a valid Int64 representation!" );
			}
			
			return ___COMPARE(this._ta, val);
		}
		
		/**
		 * A short hand function that tells whether the instance equals zero
		 * @returns {boolean}
		**/
		isZero() {
			return ___IS_ZERO(this._ta);
		}
		
		/**
		 * A short hand function that tells whether the instance is negative
		 * @returns {boolean}
		**/
		isNegative() {
			return ___IS_NEGATIVE(this._ta);
		}
		
		/**
		 * Serialize the instance
		 * @returns {string}
		**/
		serialize() {
			const resultBuff = new Uint8Array(this._ta.buffer);
			let tail = [0, 0, 0, 0], str = MAGIC_STRING_INT64;
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
		
		/**
		 * Render the instance into printable string representation
		 * @param {number} bits The representation format
		 * @returns {string}
		**/
		toString(bits=10) {
			switch( bits ) {
				case 2:
					return ___TO_BINARY_STRING(this._ta);
				case 10:
					return ___TO_DECIMAL_STRING_SIGNED(this._ta);
				case 16:
					return ___TO_HEX_STRING(this._ta);
				default:
					throw new TypeError( "Unexpected representation type" )
			}
		}
		
		/**
		 * @alias Int64.serialize
		**/
		toJSON() {
			return this.serialize();
		}
		
		
		set value(val) {
			const _val = ___UNPACK(val);
			if ( _val === null ) {
				throw new TypeError( "Given value is not a valid Int64 representation!" );
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
		
		
		/**
		 * Deserialize a serialized data and return the corresponding Int64 instance
		 * @param {string} serialized_str The serialized Int64 data
		 * @returns {Int64}
		**/
		static deserialize(serialized_str) {
			if ( serialized_str.length !== 16 && serialized_str.slice(0, 4) !== MAGIC_STRING_INT64 ) {
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
			
			return Int64.from(recovered.buffer);
		}
		
		/**
		 * Instantiate a Int64 base on input value
		 * @param {String|Number|Int64|Uint32Array|ArrayBuffer|Number[]} value
		 * @returns {Int64}
		**/
		static from(value=0) {
			return new Int64(value);
		}
		
		
		/**
		 * Return an Int64 instance with value 0
		 * @returns {Int64}
		**/
		static get ZERO() {
			return new Int64();
		}
		
		/**
		 * Return an Int64 instance with value 0xFFFFFFFFFFFFFFFF
		 * @returns {Int64}
		**/
		static get MAX_INT64() {
			const val = new Int64();
			val.hi = 0x7FFFFFFF;
			val.lo = 0xFFFFFFFF;
			return val;
		}
		
		/**
		 * Return an Int64 instance with value 0xFFFFFFFFFFFFFFFF
		 * @returns {Int64}
		**/
		static get MIN_INT64() {
			const val = new Int64();
			val.hi = 0x80000000;
			val.lo = 0x00000000;
			return val;
		}
		
		/**
		 * Revert to previous version...
		 * @returns {Int64}
		**/
		static noConflict() {
			if ( _previous_int64 ) {
				exports.Int64 = _previous_int64;
			}
			return exports.Int64;
		}
	}
	exports.Int64 = Int64;
	
	
	
	// region [ Helper functions for binary operations ]
	/**
	 * A mutable operation that perform bitwise and between two UInt64 value
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	**/
	function ___AND(a, b) {
		a[HI] = (a[HI] & b[HI])>>>0;
		a[LO] = (a[LO] & b[LO])>>>0;
	}
	
	/**
	 * A mutable operation that perform bitwise or between two UInt64 value
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	**/
	function ___OR(a, b) {
		a[HI] = (a[HI] | b[HI])>>>0;
		a[LO] = (a[LO] | b[LO])>>>0;
	}
	
	/**
	 * A mutable operation that perform bitwise or between two UInt64 value
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	**/
	function ___XOR(a, b) {
		a[HI] = (a[HI] ^ b[HI])>>>0;
		a[LO] = (a[LO] ^ b[LO])>>>0;
	}
	
	/**
	 * A mutable operation that perform bitwise not to the given UInt64 value
	 * @param {Uint32Array} value
	 * @private
	**/
	function ___NOT(value) {
		value[HI] = (~value[HI])>>>0;
		value[LO] = (~value[LO])>>>0;
	}
	
	/**
	 * A mutable operation that perform bitwise two's compliment to the given UInt64 value
	 * @param {Uint32Array} value
	 * @private
	**/
	function ___TWO_S_COMPLIMENT(value) {
		value[HI] = (~value[HI])>>>0;
		value[LO] = (~value[LO])>>>0;
		let temp = value[LO] + 1;
		value[HI] += ((temp / OVERFLOW32_MAX)|0);
		value[LO]  =   temp % OVERFLOW32_MAX;
	}

	/**
	 * A mutable operation that shifts the bits right using zero padded scheme
	 * Note that this function is mutable...
	 * @param {Uint32Array} value
	 * @param {Number} BITS
	 * @private
	**/
	function ___RIGHT_SHIFT_UNSIGNED(value, BITS) {
		if ( typeof BITS !== "number" ) {
			throw new TypeError( "Shift bits number must be a number" );
		}
		
		if ( BITS >= 64 ) {
			value[HI] = 0;
			value[LO] = 0;
			return;
		}
		
		if ( BITS < 32 ) {
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
	 * A mutable operation that shifts the bits right.
	 * Note that this function is mutable...
	 * @param {Uint32Array} value
	 * @param {Number} BITS
	 * @private
	**/
	function ___RIGHT_SHIFT_SIGNED(value, BITS) {
		if ( typeof BITS !== "number" ) {
			throw new TypeError( "Shift bits number must be a number" );
		}
		
		if ( BITS >= 64 ) {
			const negative = ___IS_NEGATIVE(value);
			value[HI] = negative ? 0xFFFFFFFF : 0;
			value[LO] = negative ? 0xFFFFFFFF : 0;
			return;
		}
		
		if ( BITS < 32 ) {
			const MASK = ___GEN_MASK(BITS);
			let shifted = (value[HI] & MASK) >>> 0;
			value[HI] = value[HI] >> BITS;
			value[LO] = ((value[LO] >>> BITS) | (shifted << (32 - BITS)))>>>0;
			
			return;
		}
		
		BITS = BITS - 32;
		value[LO] = (value[HI] >> BITS);
		value[HI] = (value[HI] >> 16 >> 16);
	}
	
	/**
	 * A mutable operation that shifts the bits left.
	 * Note that this function is mutable...
	 * @param {Uint32Array} value
	 * @param {Number} BITS
	 * @private
	**/
	function ___LEFT_SHIFT(value, BITS) {
		if ( typeof BITS !== "number" ) {
			throw new TypeError( "Shift bits number must be a number" );
		}
	
		if ( BITS >= 64 ) {
			value[HI] = 0;
			value[LO] = 0;
			return;
		}
		
		if ( BITS < 32 ) {
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
	// endregion
	
	// region [ Helper functions for arithmetic operations ]
	/**
	 * Perform UInt64 a + b and write the result back to a
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	**/
	function ___ADD(a, b) {
		let temp = b[LO] + a[LO];
		a[HI] = (b[HI] + a[HI]) + ((temp/OVERFLOW32_MAX)|0);
		a[LO] = temp % OVERFLOW32_MAX;
	}
	
	/**
	 * Perform UInt64 a * b and write the result back to a
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	**/
	function ___MULTIPLY(a, b) {
		let FINAL = new Uint16Array(a.buffer);
		let A = new Uint16Array(a.buffer.slice(0));
		let B = new Uint16Array(b.buffer);
		
		let overflow = 0;
		for ( let i=0; i<8; i++ ) {
			let val = overflow;
			for ( let j=i; j>=0; j-- ) {
				val += A[j] * B[i-j];
			}
			overflow = (val / OVERFLOW16_MAX) | 0;
			FINAL[i] = val % OVERFLOW16_MAX;
		}
	}
	
	/**
	 * Perform UInt64 a / b and write the remainder back to a and return quotient back
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @return {Uint32Array}
	 * @private
	**/
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
		___RIGHT_SHIFT_UNSIGNED(b, r_padding);
		// endregion
		
		// region [ Calc division ]
		count = d_padding - r_padding + 1;
		while( count-- > 0 ) {
			if ( ___COMPARE(remainder, b) >= 0 ) {
				___SUB(remainder, b);
				quotient[LO] = quotient[LO] | 0x01;
			}
			
			if ( count > 0 ) {
				___LEFT_SHIFT(quotient, 1);
				___RIGHT_SHIFT_UNSIGNED(b, 1);
			}
		}
		// endregion
		return quotient;
	}
	
	/**
	 * Perform UInt64 a + b and write the result back to a
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @private
	**/
	function ___SUB(a, b) {
		let B = b.slice(0);
		___TWO_S_COMPLIMENT(B);
		___ADD(a, B);
	}
	// endregion
	
	// region [ Helper functions for comparison ]
	/**
	 * Check if given val is zero
	 * @param {Uint32Array} val
	 * @return {boolean}
	 * @private
	**/
	function ___IS_ZERO(val) {
		return (val[HI] === 0) && (val[LO] === 0);
	}
	
	/**
	 * Check if the given value is negative
	 * @param {Uint32Array} val
	 * @returns {boolean}
	 * @private
	**/
	function ___IS_NEGATIVE(val) {
		return (val[HI] & LEFT_MOST_32) !== 0;
	}
	
	/**
	 * Compare two UInt64 values return -1 if a < b, 1 if a > b, 0 otherwise
	 * @param {Uint32Array} a
	 * @param {Uint32Array} b
	 * @return {Number}
	 * @private
	**/
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
	// endregion
	
	// region [ Miscellaneous helper functions ]
	/**
	 * Get raw Uint32Array values converted from source value
	 * @param {String|Number|UInt64|Uint32Array|ArrayBuffer} value
	 * @returns {Uint32Array}
	 * @private
	**/
	function ___UNPACK(value=0) {
		if ( value instanceof Int64 ) {
            return value._ta;
        }
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
		const u32  = new Uint32Array(2);
		switch( type ) {
			case "number":
				___PARSE_NUMBER(u32, value);
				break;
			
			case "string":
			{
				value = value.trim();
				
				if ( INTEGER_FORMAT.test(value) ) {
					___PARSE_INT_STRING(u32, value);
				}
				else
				if ( HEX_FORMAT.test(value) ) {
					___PARSE_HEX_STRING(u32, value);
				}
				else
				if ( BIN_FORMAT.test(value) ) {
					___PARSE_BIN_STRING(u32, value);
				}
				break;
			}
			
			default:
				return null;
		}
		
		return u32;
	}
	
	/**
	 * Parse js number and write the parsed result into buff
	 * @param {Uint32Array} buff
	 * @param {number} value
	 * @private
	**/
	function ___PARSE_NUMBER(buff, value) {
		let negate = value < 0;
		if ( negate ) {
			value = Math.abs(value);
		}
		
		value = Math.floor(value);
		buff[LO] = value % OVERFLOW32_MAX;
		value = Math.floor(value / OVERFLOW32_MAX);
		buff[HI] = value % OVERFLOW32_MAX;
		
		if ( negate ) {
			___TWO_S_COMPLIMENT(buff);
		}
	}
	
	/**
	 * Parse js number and write the parsed result into buff
	 * @param {Uint32Array} buff
	 * @param {number} value
	 * @private
	**/
	function ___PARSE_NUMBER_UNSIGNED(buff, value) {
		value = Math.floor(value);
		buff[LO] = value % OVERFLOW32_MAX;
		value = Math.floor(value / OVERFLOW32_MAX);
		buff[HI] = value % OVERFLOW32_MAX;
	}
	
	/**
	 * Parse integer formatted string and write the parsed result into buff
	 * @param {Uint32Array} buff
	 * @param {string} value
	 * @private
	**/
	function ___PARSE_INT_STRING(buff, value) {
		let temp = new Uint32Array(2);
		let negative;
		if ( negative = ['-', '+'].indexOf(value[0]) ) {
			value = value.substring(1);
			negative = ( negative >= 0 ) ? 1-negative : 0;
		}
		
		buff[HI] = buff[LO] = 0;
		while( value.length > 0 ) {
			let int = parseInt(value.substring(value.length - 9, value.length), 10);
			
			___PARSE_NUMBER_UNSIGNED(temp, int);
			___MULTIPLY(buff, DECIMAL_STEPPER);
			___ADD(buff, temp);
			
			value = value.substring(0, value.length - 9);
		}
		
		if ( negative ) {
			___TWO_S_COMPLIMENT(buff);
		}
	}
	
	/**
	 * Parse hex formatted string and write the parsed result into buff
	 * @param {Uint32Array} buff
	 * @param {string} value
	 * @private
	**/
	function ___PARSE_HEX_STRING(buff, value) {
		buff[LO] = parseInt(value.substring(value.length - 8, value.length), 16);
		value = value.substring(0, value.length - 8);
		buff[HI] = ( value.length <= 0 ) ? 0 : parseInt(value.substring(value.length - 8, value.length), 16);
	}
	
	/**
	 * Parse binary formatted string and write the parsed result into buff
	 * @param {Uint32Array} buff
	 * @param {string} value
	 * @private
	**/
	function ___PARSE_BIN_STRING(buff, value) {
		buff[LO] = parseInt(value.substring(value.length - 32, value.length), 2);
		value = value.substring(0, value.length - 32);
		buff[HI] = ( value.length <= 0 ) ? 0 : parseInt(value.substring(value.length - 32, value.length), 2);
	}
	
	/**
	 * Generate a 32bits mask
	 * @param {Number} BITS
	 * @private
	**/
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
	 * Return binary representation of the given UInt64 number
	 * @param {Uint32Array} val
	 * @return {String}
	 * @private
	**/
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
	**/
	function ___TO_HEX_STRING(val) {
		let hHex = val[HI].toString(16);
		let lHex = val[LO].toString(16);
		return ___PADDING_ZERO(hHex, 0) + ___PADDING_ZERO(lHex, 8);
	}
	
	/**
	 * Return decimal representation of the given UInt64 number
	 * @return {String}
	 * @private
	**/
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
	 * Return decimal representation of the given UInt64 number
	 * @return {String}
	 * @private
	**/
	function ___TO_DECIMAL_STRING_SIGNED(val) {
		let output = [];
		
		let negative = ___IS_NEGATIVE(val);
		let remain = val.slice(0);
		if ( negative ) { ___TWO_S_COMPLIMENT(remain); }
		while ( !___IS_ZERO(remain) ) {
			let quotient = ___DIVIDE(remain, DECIMAL_STEPPER);
			output.unshift(remain[LO].toString(10));
			remain = quotient;
		}
		
		if ( output.length === 0 ) {
			return '0';
		}
		else {
			let o = (negative ? '-' : '') + output.shift();
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
	**/
	function ___PADDING_ZERO(data, length=8) {
		let padding = length - data.length;
		let padded = '';
		while(padding-- > 0) {
			padded += '0';
		}
		
		return padded + data;
	}
	// endregion
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));
