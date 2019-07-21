/**
 *	Author: JCloudYu
 *	Create: 2018/12/22
**/
import {ExtractArrayBuffer} from "./_helper.esm.js";



const BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
const BASE64URL_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split('');
const BASE64_DECODE_CHAR = {
	'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8,
	'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16,
	'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24,
	'Z': 25, 'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31, 'g': 32,
	'h': 33, 'i': 34, 'j': 35, 'k': 36, 'l': 37, 'm': 38, 'n': 39, 'o': 40,
	'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45, 'u': 46, 'v': 47, 'w': 48,
	'x': 49, 'y': 50, 'z': 51, '0': 52, '1': 53, '2': 54, '3': 55, '4': 56,
	'5': 57, '6': 58, '7': 59, '8': 60, '9': 61, '+': 62, '/': 63, '-': 62,
	'_': 63
};
const BASE64_FORMAT_CHECK = /^([0-9a-zA-Z+-/_]+)={0,2}$/;


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
 * Decode base64 encoded data
 * @param {String} base64Str
 * @return {ArrayBuffer}
**/
export function Base64Decode(base64Str) {
	let _tmp;

	if ( typeof base64Str !== "string" ) {
		throw new Error( "Given input is neither base64 encoded nor base64url encoded!" );
	}
	
	const matches = base64Str.match(BASE64_FORMAT_CHECK);
	if ( !matches ) {
		throw new Error( "Given input is neither base64 encoded nor base64url encoded!" );
	}
	
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
