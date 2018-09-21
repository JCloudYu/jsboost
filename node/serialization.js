(() => {
	'use strict';

	const { encode: base64urlEncode, decode: base64urlDecode } = require('./base64url');
	const BigNumber = require('./bn');

	module.exports = {
		serialize: (obj) => {
			return JSON.stringify(obj, ___NESTED_DUMP_OBJECT_KEYS(obj).sort());
		},
		deserialize: (str) => {
			return JSON.parse(str, ___JSON_PARSE_RECEIVER);
		}
	};
	
	
	
	
	
	
	const MAGIC_STRING = "\u0000\u0007\u0005\u0007";
	function ___JSON_PARSE_RECEIVER(key, value) {
		if (typeof value !== 'string') {
			return value;
		}

		let result = value;
		if (value.slice(0, 4) === MAGIC_STRING) {
			let type = value.charCodeAt(4);
			switch(type) {
				// big number
				case 1:
					let bnStructure = JSON.parse(base64urlDecode(value.slice(5)));
					result = BigNumber.deserialize(bnStructure);
				break;

				// uint64
				case 2:
				// int64
				case 3:
				default:
					result = value.slice(5);
				break;
			}
		}

		return result;
	}
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
})();
