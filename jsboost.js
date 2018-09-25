/**
 * Author: JCloudYu
 * Create: 2018/09/19
**/
(()=>{
	"use strict";
	
	const {EventEmitter}	= require( './native/event-emitter' );
	const {DOMEventEmitter} = require( './native/dom-event-emitter' );
	const {AsyncInvoke}		= require( './native/async-invoke' );
	const {UInt64}			= require( './native/uint64' );
	
	const Base64URL = require( './node/base64url' );
	const BigNumber = require( './node/bn' );
	const { serialize:Serialize, deserialize:Deserialize } = require( './node/serialization' );
	
	
	
	module.exports = {
		EventEmitter,
		DOMEventEmitter,
		AsyncInvoke,
	
		Base64URL,
		UInt64,
		BigNumber,
		Serialize,
		Deserialize
	};
})();
