import {ExtractArrayBuffer} from "./_helper.esm.js";



/**
 *	Author: JCloudYu
 *	Create: 2018/12/22
**/
const __FORMAT_CHECK = /^[0123456789abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV]+$/;
const __CHAR_MAP = "0123456789abcdefghijklmnopqrstuv".split('');
const __REV_MAP = {
	'0': 0, '1': 1, '2': 2, '3': 3, '4': 4,
	'5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
	'A':10, 'B':11, 'C':12, 'D':13, 'E':14,
	'F':15, 'G':16, 'H':17, 'I':18, 'J':19,
	'K':20, 'L':21, 'M':22, 'N':23, 'O':24,
	'P':25, 'Q':26, 'R':27, 'S':28, 'T':29,
	'U':30, 'V':31,
	
	'a':10, 'b':11, 'c':12, 'd':13, 'e':14,
	'f':15, 'g':16, 'h':17, 'i':18, 'j':19,
	'k':20, 'l':21, 'm':22, 'n':23, 'o':24,
	'p':25, 'q':26, 'r':27, 's':28, 't':29,
	'u':30, 'v':31
};

/**
 * @param {ArrayBuffer} input
 * @param {String} [map=null]
 * @return {String}
**/
export function Base32Encode(input, map=null) {
	input = ExtractArrayBuffer(input);
	
	
	let inputData = new Uint8Array(input);
	if ( inputData.length < 1 ) return '';
	
	
	const CVT_MAP = map ? map.split('') : __CHAR_MAP;
	
	
	
	// Run complete bundles
	let encoded = '';
	let begin, loop = Math.floor(inputData.length/5);
	for (let run=0; run<loop; run++) {
		begin = run * 5;
		encoded += CVT_MAP[  inputData[begin]           >> 3];								// 0
		encoded += CVT_MAP[ (inputData[begin  ] & 0x07) << 2 | (inputData[begin+1] >> 6)];	// 1
		encoded += CVT_MAP[ (inputData[begin+1] & 0x3E) >> 1];								// 2
		encoded += CVT_MAP[ (inputData[begin+1] & 0x01) << 4 | (inputData[begin+2] >> 4)];	// 3
		encoded += CVT_MAP[ (inputData[begin+2] & 0x0F) << 1 | (inputData[begin+3] >> 7)];	// 4
		encoded += CVT_MAP[ (inputData[begin+3] & 0x7C) >> 2];								// 5
		encoded += CVT_MAP[ (inputData[begin+3] & 0x03) << 3 | (inputData[begin+4] >> 5)];	// 6
		encoded += CVT_MAP[  inputData[begin+4] & 0x1F];										// 7
	}
	
	// Run remains
	let remain = inputData.length % 5;
	if ( remain === 0 ) { return encoded; }
	
	
	begin = loop*5;
	if ( remain === 1 ) {
		encoded += CVT_MAP[  inputData[begin]           >> 3];								// 0
		encoded += CVT_MAP[ (inputData[begin  ] & 0x07) << 2];								// 1
	}
	else
	if ( remain === 2 ) {
		encoded += CVT_MAP[  inputData[begin]           >> 3];								// 0
		encoded += CVT_MAP[ (inputData[begin  ] & 0x07) << 2 | (inputData[begin+1] >> 6)];	// 1
		encoded += CVT_MAP[ (inputData[begin+1] & 0x3E) >> 1];								// 2
		encoded += CVT_MAP[ (inputData[begin+1] & 0x01) << 4];								// 3
	}
	else
	if ( remain === 3 ) {
		encoded += CVT_MAP[  inputData[begin]           >> 3];								// 0
		encoded += CVT_MAP[ (inputData[begin  ] & 0x07) << 2 | (inputData[begin+1] >> 6)];	// 1
		encoded += CVT_MAP[ (inputData[begin+1] & 0x3E) >> 1];								// 2
		encoded += CVT_MAP[ (inputData[begin+1] & 0x01) << 4 | (inputData[begin+2] >> 4)];	// 3
		encoded += CVT_MAP[ (inputData[begin+2] & 0x0F) << 1];								// 4
	}
	else
	if ( remain === 4 ) {
		encoded += CVT_MAP[  inputData[begin]           >> 3];								// 0
		encoded += CVT_MAP[ (inputData[begin  ] & 0x07) << 2 | (inputData[begin+1] >> 6)];	// 1
		encoded += CVT_MAP[ (inputData[begin+1] & 0x3E) >> 1];								// 2
		encoded += CVT_MAP[ (inputData[begin+1] & 0x01) << 4 | (inputData[begin+2] >> 4)];	// 3
		encoded += CVT_MAP[ (inputData[begin+2] & 0x0F) << 1 | (inputData[begin+3] >> 7)];	// 4
		encoded += CVT_MAP[ (inputData[begin+3] & 0x7C) >> 2];								// 5
		encoded += CVT_MAP[ (inputData[begin+3] & 0x03) << 3];								// 6
	}
	
	return encoded;
}

/**
 * @param {String} inputBase32
 * @param {String} [map=null]
 * @return {ArrayBuffer}
**/
export function Base32Decode(inputBase32, map=null) {
	if ( !__FORMAT_CHECK.test(inputBase32) ) {
		return null;
	}
	
	let remain = inputBase32.length % 8;
	if ( [0, 2, 4, 5, 7].indexOf(remain) < 0 ) {
		return null;
	}
	
	let decoded = new Uint8Array(Math.floor(inputBase32.length * 5 / 8));
	let CVT_MAP = !map ? __REV_MAP : (()=>{ const _MAP = {}; map.split('').forEach((key, val)=>{ _MAP[key] = val; }); return _MAP; })();
	
	
	
	
	
	// Run complete bundles
	let dest, begin, loop = Math.floor(inputBase32.length/8);
	for (let run=0; run<loop; run++) {
		begin = run * 8;
		dest  = run * 5;
		decoded[dest] 	=  CVT_MAP[inputBase32[begin]] << 3 | CVT_MAP[inputBase32[begin+1]] >> 2;	// 0
		decoded[dest+1] = (CVT_MAP[inputBase32[begin+1]] & 0x03) << 6 |								// 1
						   CVT_MAP[inputBase32[begin+2]]		   << 1 |
						   CVT_MAP[inputBase32[begin+3]]		   >> 4;
		decoded[dest+2] = (CVT_MAP[inputBase32[begin+3]] & 0x0F) << 4 |								// 2
						   CVT_MAP[inputBase32[begin+4]]		   >> 1;
		decoded[dest+3] = (CVT_MAP[inputBase32[begin+4]] & 0x01) << 7 |								// 3
						   CVT_MAP[inputBase32[begin+5]]		   << 2 |
						   CVT_MAP[inputBase32[begin+6]]		   >> 3;
		decoded[dest+4] = (CVT_MAP[inputBase32[begin+6]] & 0x07) << 5 |								// 4
						   CVT_MAP[inputBase32[begin+7]];
	}
	
	if ( remain === 0 ) { return decoded.buffer; }
	
	
	
	begin = loop*8;
	dest  = loop*5;
	if ( remain >= 2 ) {
		decoded[dest] =  CVT_MAP[inputBase32[begin]] << 3 | CVT_MAP[inputBase32[begin+1]] >> 2;		// 0
	}
	
	if ( remain >= 4 ) {
		decoded[dest+1] = (CVT_MAP[inputBase32[begin+1]] & 0x03) << 6 |								// 1
						   CVT_MAP[inputBase32[begin+2]]		   << 1 |
						   CVT_MAP[inputBase32[begin+3]]		   >> 4;
	}
	
	if ( remain >= 5 ) {
		decoded[dest+2] = (CVT_MAP[inputBase32[begin+3]] & 0x0F) << 4 |								// 2
						   CVT_MAP[inputBase32[begin+4]]		   >> 1;
	}
	
	if ( remain === 7 ) {
		decoded[dest+3] = (CVT_MAP[inputBase32[begin+4]] & 0x01) << 7 |								// 3
						   CVT_MAP[inputBase32[begin+5]]		   << 2 |
						   CVT_MAP[inputBase32[begin+6]]		   >> 3;
	}
	
	return decoded.buffer;
}
