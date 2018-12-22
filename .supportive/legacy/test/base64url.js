(() => {
    'use strict';

    const { encode, decode } = require('../jsboost').Base64URL;

    let str1 = 'A';
    let encodeStr1 = encode(str1);
    let decodeStr1 = decode(encodeStr1);
    console.log(`Origin: ${str1}, Encode: ${encodeStr1}, Decode: ${decodeStr1}`);

    let str2 = 'BC';
    let encodeStr2 = encode(str2);
    let decodeStr2 = decode(encodeStr2);
    console.log(`Origin: ${str2}, Encode: ${encodeStr2}, Decode: ${decodeStr2}`);

    let str3 = 'Man';
    let encodeStr3 = encode(str3);
    let decodeStr3 = decode(encodeStr3);
    console.log(`Origin: ${str3}, Encode: ${encodeStr3}, Decode: ${decodeStr3}`);
})();
