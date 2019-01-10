# JS Boost #

## For user ##

### How to use ###

#### Base64Url ####

```javascript
const { encode, decode } = require('jsboost').Base64URL;
let str = 'BC';
let encodeStr = encode(str);
let decodeStr = decode(encodeStr);
// Origin: BC, Encode: QkM, Decode: BC
console.log(`Origin: ${str}, Encode: ${encodeStr}, Decode: ${decodeStr}`);
```

#### Crypto ####

Only support curve "secp256k1" and algorithm "SHA256withECDSA"

```javascript
const { Signature, ECDSA, KEYUTIL } = require('../jsboost');

let curve = 'secp256k1';
let sigAlg = 'SHA256withECDSA';

// generate keys
let ec = new ECDSA({ curve });
let keypair = ec.generateKeyPairHex();
let keys = {
    prvkey: keypair.ecprvhex,               // private key
    pubkey: keypair.ecpubhex                // public key
};

// sign message
let sig = new Signature({ alg: sigAlg });
sig.init({ d: keys.prvkey, curve });
sig.updateString('hello world');
let sigValueHex = sig.sign();               // sign hex string

// verify string
let sig = new Signature({ alg: sigAlg, prov: 'cryptojs/jsrsa' });
sig.init({ xy: keys.pubkey, curve });
sig.updateString('hello world');
let isValid = sig.verify(sigValueHex);      // bool
```

* Please refer to [ECDSA](https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.ECDSA.html) or [Signature](https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.Signature.html) for other usages.

---

## For maintainer ##

### Install project ###

* Clone project:
    > git clone \<project-url\>

* Install dependency package:
    > npm install

### Build and Run ###

* Run test-bn (use npm):
    > npm run test-bn

* Run test-base64url (use npm):
    > npm run test-base64url

* Run test-serialization (use npm):
    > npm run test-serialization
