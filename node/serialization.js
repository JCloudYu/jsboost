(() => {
	'use strict';

	const {UInt64}	= require( '../native/uint64' );
	const BigNumber = require('./bn');

	module.exports = {
		serialize: (obj) => {
			return JSON.stringify(obj, ___NESTED_DUMP_OBJECT_KEYS(obj).sort());
		},
		deserialize: (str) => {
			return JSON.parse(str, ___JSON_PARSE_RECEIVER);
		}
	};

	function ___NESTED_DUMP_OBJECT_KEYS(obj, container=null) {
		if ( Object(obj) !== obj ) { return []; }
	
		container = container||[];
		for ( let i in obj ) {
			if (!obj.hasOwnProperty(i)) continue;

			container.push(i);
			if (Object(obj[i]) === obj[i]) {
				___NESTED_DUMP_OBJECT_KEYS(obj[i], container);
			}
		}
		
		return container;
	}

	// 0 + 24
	const MAGIC_STRING = "\u0000\u0018";
	function ___JSON_PARSE_RECEIVER(key, value) {
		if ( typeof value !== 'string' || value.slice(0, 2) !== MAGIC_STRING ) {
			return value;
		}

		let type = value.charCodeAt(2);
		switch(type) {
			// BigNumber
			case 1:
				return BigNumber.deserialize(value);

			// UInt64
			case 2:
				return UInt64.deserialize(value);
			
			// int64
			case 3:
			default:
				return value;
		}
	}
})();
