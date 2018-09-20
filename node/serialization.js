(() => {
	'use strict';

	const { encode: base64urlEncode, decode: base64urlDecode } = require('./base64url');
	const BigNumber = require('./bn');

	const __preString = "\u0000\u0007\u0005\u0007"
	const __receiver = (key, value) => {
		if (typeof value !== 'string') {
			return value;
		}

		let result = value;
		if (value.slice(0, 4) === __preString) {
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

	module.exports = {
		serialize: (obj) => {
			let flattenArray = [];
			let flattenObject = (obj) => {
				for (let i in obj) {
					if (!obj.hasOwnProperty(i)) continue;
		
					flattenArray.push(i);
					if (obj[i] !== null && (typeof obj[i]) === 'object') {
						flattenObject(obj[i]);
					}
				}
			};
			flattenObject(obj);
		
			let str = JSON.stringify(obj, flattenArray.sort());
			return str;
		},
		deserialize: (str) => {
			return JSON.parse(str, __receiver);
		}
	};
})();
