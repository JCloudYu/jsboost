/**
 * Author: JCloudYu
 * Create: 2018/09/19
**/
(()=>{
	"use strict";
	
	const {EventEmitter} = require( './native/event-emitter' );
	const {DOMEventEmitter} = require( './native/dom-event-emitter' );
	const Base64URL = require( './node/base64url' );
	const BigNumber = require( './node/bn' );
	const { serialize:Serialize, deserialize:Deserialize } = require( './node/serialization' );
	
	module.exports = {
		EventEmitter,
		DOMEventEmitter,
	
		Base64URL,
		BigNumber,
		Serialize,
		Deserialize
	}
})();
