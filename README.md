# JS Boost #

## For user ##

### How to use ###

#### Big Number ####

```javascript
const BigNumber = require('jsboost');
// add: +
// sub: -
// mul: *
// div: /
// pow: ^
let result = new BigNumber(5).add(97).sub(53).add(434).mul(5435423).add(321453).mul(21).div(2).pow(2);
// 760056543044267246001
console.log(result);
```

* Please refer to [bignumber.js](http://mikemcl.github.io/bignumber.js/) for other usages.

#### Base64Url ####

```javascript
const { encode, decode } = require('jsboost').Base64URL;
let str = 'BC';
let encodeStr = encode(str);
let decodeStr = decode(encodeStr);
// Origin: BC, Encode: QkM, Decode: BC
console.log(`Origin: ${str}, Encode: ${encodeStr}, Decode: ${decodeStr}`);
```

#### Serialization ####

```javascript
const { BigNumber, Serialize, Deserialize } = require('jsboost');

let number = '760056543044267246001';
let data = {
    k1: new BigNumber(number),
    k2: new BigNumber(`-${number}`),
    k3: false,
    k4: 123456,
    k5: 'a4b5c6',
    k6: [new BigNumber(number), new BigNumber(`-${number}`), false, 123456, 'a4b5c6'],
    k7: {
        k71: new BigNumber(number),
        k72: new BigNumber(`-${number}`),
        k73: false,
        k74: 123,
        k75: 'a4b5c6'
    },
    k8: null,
    k9: undefined
};
let serializeStr = Serialize(data);
let deserializeData = Deserialize(serializeStr);

console.log('Origin data:');
console.log(data);

console.log('\nSerialize data:');
console.log(serializeStr);

console.log('\nDeserialize data:');
console.log(deserializeData);
```

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
