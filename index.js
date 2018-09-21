/**
 * Author: JCloudYu
 * Create: 2018/09/19
**/
(()=>{
	"use strict";
	
	const DOMEventEmitter = require( './native/dom-event-emitter' );
	const {serialize:Serialize, deserialize:Deserialize} = require( './node/serialization' );
	const BigNumber = require( './node/bn' );
	
	module.exports = {
		DOMEventEmitter,
	
		BigNumber,
		Serialize,
		Deserialize
	}
})();
