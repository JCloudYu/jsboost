(() => {
    'use strict';

    module.exports = {
        encode: (data) => {
            return data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        },
        decode: (base64url) => {
            let base64str = base64url.replace(/\-/g, '+').replace(/_/g, '/');
            return Buffer.from(base64str, 'base64').toString('utf8');
        }
    };
})();
