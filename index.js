/**
 * Author: JCloudYu
 * Create: 2018/09/19
**/
(()=>{
	"use strict";
	
	const DOMEventEmitter = require( './native/dom-event-emitter' );
	const Base64URL = require( './node/bas64url' );
	const BigNumber = require( './node/bn' );
	const { serialize:Serialize, deserialize:Deserialize } = require( './node/serialization' );
	
	module.exports = {
		DOMEventEmitter,
	
		Base64URL,
		BigNumber,
		Serialize,
		Deserialize
	}
})();
