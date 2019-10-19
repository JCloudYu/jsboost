/**
 *	Author: JCloudYu
 *	Create: 2019/10/19
**/
import crypto from "crypto";
import assert from "assert";
import {
	Base64Encode, Base64Decode,
	Base64URLEncode, Base64URLDecode,
	Base64SortEncode, Base64SortDecode
} from "../base64.esm.js";


init_context(()=>{
	const truth_raw = Buffer.alloc(61);
	truth_raw.set(crypto.randomBytes(61));
	
	
	
	test_group( "Testing Base64 Encode / Decode", ()=>{
		const result = Buffer.from(Base64Decode(Base64Encode(truth_raw.buffer)));
		assert(result.compare(truth_raw) === 0);
	});
	
	test_group( "Testing Base64URL Encode / Decode", ()=>{
		const result = Buffer.from(Base64URLDecode(Base64URLEncode(truth_raw.buffer)));
		assert(result.compare(truth_raw) === 0);
	});
	
	
	test_group( "Testing Base64Sort Encode / Decode", ()=>{
		const result = Buffer.from(Base64SortDecode(Base64SortEncode(truth_raw.buffer)));
		assert(result.compare(truth_raw) === 0);
	});
});
