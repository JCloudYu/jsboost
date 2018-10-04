/**
 * Author: JCloudYu
 * Create: 2018/09/19
**/
(()=>{
	"use strict";
	
	const {EventEmitter}	= require( './native/event-emitter' );
	const {DOMEventEmitter} = require( './native/dom-event-emitter' );
	const {AsyncInvoke}		= require( './native/async-invoke' );
	const {ECDSA, Signature} = require( './native/crypto' );
	const {UInt64, Int64}	= require( './native/uint64' );
	const {UInt128, Int128}	= require( './native/uint128' );
	const Base64URL = require( './node/base64url' );
	const BigNumber = require( './node/bn' );
	const { serialize:Serialize, deserialize:Deserialize } = require( './node/serialization' );
	
	
	
	module.exports = {
		EventEmitter,
		DOMEventEmitter,
		AsyncInvoke,
		ECDSA,
		Signature,
	
		Base64URL,
		UInt64,
		Int64,
		UInt128,
		Int128,
		BigNumber,
		Serialize,
		Deserialize
	};
})();
