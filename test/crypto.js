(() => {
    'use strict';

    const { ECDSA, Signature } = require('../jsboost');

    let curve = 'secp256k1';
    let sigAlg = 'SHA256withECDSA';

    function generateKeys() {
        let ec = new ECDSA({ curve });
        let keypair = ec.generateKeyPairHex();
        return {
            prvkey: keypair.ecprvhex,
            pubkey: keypair.ecpubhex
        };
    }
      
    function sign(prvkey, msg) {
        let sig = new Signature({ alg: sigAlg });
        sig.init({ d: prvkey, curve });
        sig.updateString(msg);
        return sig.sign();
    }

    function verify(pubkey, signVal, msg) {
        let sig = new Signature({ alg: sigAlg });
        sig.init({ xy: pubkey, curve });
        sig.updateString(msg);
        return sig.verify(signVal);
    }

    let keys = generateKeys();
    let sigValueHex = sign(keys.prvkey, 'hello world!!!');
    let verifyResult = verify(keys.pubkey, sigValueHex, 'hello world!!!');

    console.log(`* Private key: ${keys.prvkey}`);
    console.log(`* Public key: ${keys.pubkey}`);
    console.log(`* Sign value (hex string): ${sigValueHex}`);
    console.log(`* ECDSA sign valid: ${verifyResult}`);
})();
