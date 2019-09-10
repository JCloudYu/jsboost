/**
 *	Author: JCloudYu
 *	Create: 2018/12/22
**/
import {ExtractArrayBuffer} from "./_helper.esm.js";



const BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
const BASE64URL_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');
const BASE64SORT_ENCODE_CHAR = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz'.split('');
const BASE64_DECODE_CHAR = {
	'A':  0, 'B':  1, 'C':  2, 'D':  3, 'E':  4, 'F':  5, 'G':  6, 'H':  7,
	'I':  8, 'J':  9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15,
	'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23,
	'Y': 24, 'Z': 25, 'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31,
	'g': 32, 'h': 33, 'i': 34, 'j': 35, 'k': 36, 'l': 37, 'm': 38, 'n': 39,
	'o': 40, 'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45, 'u': 46, 'v': 47,
	'w': 48, 'x': 49, 'y': 50, 'z': 51, '0': 52, '1': 53, '2': 54, '3': 55,
	'4': 56, '5': 57, '6': 58, '7': 59, '8': 60, '9': 61, '+': 62, '/': 63,
	'-': 62, '_': 63
};
const BASE64SORT_DECODE_CHAR = {
	'-':  0, 'A':  1, 'B':  2, 'C':  3, 'D':  4, 'E':  5, 'F':  6, 'G':  7,
	'H':  8, 'I':  9, 'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15,
	'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23,
	'X': 24, 'Y': 25, 'Z': 26, '_': 27, 'a': 28, 'b': 29, 'c': 30, 'd': 31,
	'e': 32, 'f': 33, 'g': 34, 'h': 35, 'i': 36, 'j': 37, 'k': 38, 'l': 39,
	'm': 40, 'n': 41, 'o': 42, 'p': 43, 'q': 44, 'r': 45, 's': 46, 't': 47,
	'u': 48, 'v': 49, 'w': 50, 'x': 51, 'y': 52, 'z': 53, '0': 54, '1': 55,
	'2': 56, '3': 57, '4': 58, '5': 59, '6': 60, '7': 61, '8': 62, '9': 63,
};
const BASE64_FORMAT_CHECK = /^([0-9a-zA-Z+\-/_]+)={0,2}$/;


/**
 * Encode data into base64 representation
 * @param {ArrayBuffer} input
 * @return {string}
**/
export function Base64Encode(input) {
	input = ExtractArrayBuffer(input);
	
	let bytes = new Uint8Array(input);
	var v1, v2, v3, base64Str = '', length = bytes.length;
	for( var i = 0, count = ((length/3)>>>0) * 3; i < count; ){
		v1 = bytes[i++];
		v2 = bytes[i++];
		v3 = bytes[i++];
		base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
			BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
			BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
			BASE64_ENCODE_CHAR[v3 & 63];
	}
	
	// remain char
	var remain = length - count;
	if( remain === 1 ){
		v1 = bytes[i];
		base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
			BASE64_ENCODE_CHAR[(v1 << 4) & 63] +
			'==';
	}
	else if( remain === 2 ){
		v1 = bytes[i++];
		v2 = bytes[i];
		base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] +
			BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
			BASE64_ENCODE_CHAR[(v2 << 2) & 63] +
			'=';
	}
	return base64Str;
}

/**
 * Decode base64 encoded data
 * @param {String} base64Str
 * @return {ArrayBuffer}
**/
export function Base64Decode(base64Str) {
	let _tmp;
	base64Str = '' + base64Str;
	
	const matches = base64Str.match(BASE64_FORMAT_CHECK);
	if ( !matches ) { return null; }
	
	base64Str = matches[1];
	
	
	
	const length = base64Str.length;
	const remain = length % 4;
	switch( remain ) {
		case 0:
			_tmp = (length/4|0)*3;
			break;
			
		case 2:
			_tmp = (length/4|0)*3 + 1;
			break;
			
		case 3:
			_tmp = (length/4|0)*3 + 2;
			break;
			
		default:
			return null;
	}
	
	
	
	const bytes = new Uint8Array(_tmp);
	
	let v1, v2, v3, v4, i=0, j=0, end=(length/4|0)*4;
	while ( i<end ) {
		v1 = BASE64_DECODE_CHAR[base64Str[i++]];
		v2 = BASE64_DECODE_CHAR[base64Str[i++]];
		v3 = BASE64_DECODE_CHAR[base64Str[i++]];
		v4 = BASE64_DECODE_CHAR[base64Str[i++]];
		bytes[j++] = (v1 << 2 | v2 >>> 4);
		bytes[j++] = (v2 << 4 | v3 >>> 2);
		bytes[j++] = (v3 << 6 | v4);
	}
	
	
	
	// Decode remaining bytes
	switch( remain ) {
		case 2:
			v1 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
			v2 = BASE64_DECODE_CHAR[base64Str.charAt(i)];
			bytes[j] = (v1 << 2 | v2 >>> 4);
			break;
		
		case 3:
			v1 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
			v2 = BASE64_DECODE_CHAR[base64Str.charAt(i++)];
			v3 = BASE64_DECODE_CHAR[base64Str.charAt(i)];
			bytes[j] = (v1 << 2 | v2 >>> 4);
			bytes[j+1] = (v2 << 4 | v3 >>> 2);
			break;
	}
	
	return bytes.buffer;
}

/**
 * Encode data into base64url representation
 * @param {ArrayBuffer} input
 * @return {String}
**/
export function Base64URLEncode(input) {
	input = ExtractArrayBuffer(input);
	

	let bytes = new Uint8Array(input);

	var v1, v2, v3, base64Str = '', length = bytes.length;
	for( var i = 0, count = ((length/3)>>>0) * 3; i < count; ){
		v1 = bytes[i++];
		v2 = bytes[i++];
		v3 = bytes[i++];
		base64Str += BASE64URL_ENCODE_CHAR[v1 >>> 2] +
			BASE64URL_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
			BASE64URL_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
			BASE64URL_ENCODE_CHAR[v3 & 63];
	}
	
	// remain char
	var remain = length - count;
	if( remain === 1 ){
		v1 = bytes[i];
		base64Str += BASE64URL_ENCODE_CHAR[v1 >>> 2] + BASE64URL_ENCODE_CHAR[(v1 << 4) & 63] + '';
	}
	else if( remain === 2 ){
		v1 = bytes[i++];
		v2 = bytes[i];
		base64Str += BASE64URL_ENCODE_CHAR[v1 >>> 2] + BASE64URL_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64URL_ENCODE_CHAR[(v2 << 2) & 63] + '';
	}
	return base64Str;
}

/**
 * Encode data into sortable base64 representation
 * @param {ArrayBuffer} input
 * @return {String}
**/
export function Base64SortEncode(input) {
	input = ExtractArrayBuffer(input);
	

	let bytes = new Uint8Array(input);

	var v1, v2, v3, base64Str = '', length = bytes.length;
	for( var i = 0, count = ((length/3)>>>0) * 3; i < count; ){
		v1 = bytes[i++];
		v2 = bytes[i++];
		v3 = bytes[i++];
		base64Str += BASE64SORT_ENCODE_CHAR[v1 >>> 2] +
			BASE64SORT_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] +
			BASE64SORT_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] +
			BASE64SORT_ENCODE_CHAR[v3 & 63];
	}
	
	// remain char
	var remain = length - count;
	if( remain === 1 ){
		v1 = bytes[i];
		base64Str += BASE64SORT_ENCODE_CHAR[v1 >>> 2] + BASE64SORT_ENCODE_CHAR[(v1 << 4) & 63] + '';
	}
	else if( remain === 2 ){
		v1 = bytes[i++];
		v2 = bytes[i];
		base64Str += BASE64SORT_ENCODE_CHAR[v1 >>> 2] + BASE64SORT_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64SORT_ENCODE_CHAR[(v2 << 2) & 63] + '';
	}
	return base64Str;
}

/**
 * Decode base64 sortable encoded data
 * @param {String} base64Str
 * @return {ArrayBuffer|null}
**/
export function Base64SortDecode(base64Str) {
	let _tmp;
	base64Str = '' + base64Str;
	
	const matches = base64Str.match(BASE64_FORMAT_CHECK);
	if ( !matches ) { return null; }
	
	base64Str = matches[1];
	
	
	
	const length = base64Str.length;
	const remain = length % 4;
	switch( remain ) {
		case 0:
			_tmp = (length/4|0)*3;
			break;
			
		case 2:
			_tmp = (length/4|0)*3 + 1;
			break;
			
		case 3:
			_tmp = (length/4|0)*3 + 2;
			break;
			
		default:
			throw new Error( "Given input is neither base64 encoded nor base64url encoded!" );
	}
	
	
	
	const bytes = new Uint8Array(_tmp);
	
	let v1, v2, v3, v4, i=0, j=0, end=(length/4|0)*4;
	while ( i<end ) {
		v1 = BASE64SORT_DECODE_CHAR[base64Str[i++]];
		v2 = BASE64SORT_DECODE_CHAR[base64Str[i++]];
		v3 = BASE64SORT_DECODE_CHAR[base64Str[i++]];
		v4 = BASE64SORT_DECODE_CHAR[base64Str[i++]];
		bytes[j++] = (v1 << 2 | v2 >>> 4);
		bytes[j++] = (v2 << 4 | v3 >>> 2);
		bytes[j++] = (v3 << 6 | v4);
	}
	
	
	
	// Decode remaining bytes
	switch( remain ) {
		case 2:
			v1 = BASE64SORT_DECODE_CHAR[base64Str.charAt(i++)];
			v2 = BASE64SORT_DECODE_CHAR[base64Str.charAt(i)];
			bytes[j] = (v1 << 2 | v2 >>> 4);
			break;
		
		case 3:
			v1 = BASE64SORT_DECODE_CHAR[base64Str.charAt(i++)];
			v2 = BASE64SORT_DECODE_CHAR[base64Str.charAt(i++)];
			v3 = BASE64SORT_DECODE_CHAR[base64Str.charAt(i)];
			bytes[j] = (v1 << 2 | v2 >>> 4);
			bytes[j+1] = (v2 << 4 | v3 >>> 2);
			break;
	}
	
	return bytes.buffer;
}

export {Base64Decode as Base64URLDecode}
