(() => {
    'use strict';

    const padString = (input) => {
        let segmentLength = 4;
        let stringLength = input.length;
        let diff = stringLength % segmentLength;
    
        if (!diff) {
            return input;
        }
    
        let position = stringLength;
        let padLength = segmentLength - diff;
        let paddedStringLength = stringLength + padLength;
        let buffer = Buffer.alloc(paddedStringLength);
    
        buffer.write(input);
    
        while (padLength--) {
            buffer.write('=', position++);
        }
    
        return buffer.toString();
    };

    module.exports = {
        /**
         * @param {string|Buffer} data
         * @param {string} [encoding=utf8]
         * @return {string}
         */
        encode: (data, encoding = 'utf8') => {
            let tempData = (Buffer.isBuffer(data))
                ? data.toString('base64')
                : Buffer.from(data, encoding).toString('base64');
            return tempData.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        },

        /**
         * @param {string} base64url
         * @param {string} [encoding=utf8]
         * @return {string}
         */
        decode: (base64url, encoding = 'utf8') => {
            let base64str = padString(base64url).replace(/\-/g, '+').replace(/_/g, '/');
            return Buffer.from(base64str, 'base64').toString(encoding);
        }
    };
})();
