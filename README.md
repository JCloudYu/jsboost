# JS Boost #

## For user ##

### How to use ###

#### Big Number ####

```javascript
const { BigNumber } = require('jsboost');

// constructor
const Num_BN = new BigNumber('9007199254740991');       // argument can be a number, string or BigNumber

// methods
Num_BN.add(4815627910169);          // +    equal to "plus" function
Num_BN.sub(10000000000000);         // -    equal to "minus" function
Num_BN.mul(100);                    // *    equal to "multipliedBy" or "times" function
Num_BN.idiv(100);                   // /    equal to "dividedToIntegerBy" function
Num_BN.comparedTo(100);             // 1: more than, -1: less than, 0: equal
Num_BN.toString(16);                // returns a string representing the value of this number in the specified base, base default: 10

let result = new BigNumber(5).add(97).sub(53).add(434).mul(5435423).add(321453).mul(21).idiv(2).pow(2);
console.log(result.toString());     // 760056543044267246001
```

* Please refer to [bignumber.js](http://mikemcl.github.io/bignumber.js/) for other usages.

#### Int64 / UInt64 ####

```javascript
const { Int64, UInt64 } = require('jsboost');

// constructor
const Num_Int64 = Int64.from('9007199254740991');       // argument can be a number, string or Number Array (little-endian)
const Num_UInt64 = UInt64.from([0x000003E7, 0x000002000]);

// properties
const MAX_INT64 = Int64.MAX;
const MIN_INT64 = Int64.MIN;        // UInt64 doesn't have Min
const ZERO = Int64.ZERO;

// methods
Num_Int64.add(4815627910169);       // +
Num_Int64.sub(10000000000000);      // -
Num_Int64.mul(100);                 // *    equal to "multiply" function
Num_Int64.div(100);                 // /    equal to "divide" function
Num_Int64.modulo(10000);            // %
Num_Int64.and(MIN_INT64);
Num_Int64.or(ZERO);
Num_Int64.xor(ZERO);
Num_Int64.not();
Num_Int64.rshift(8);                // right shift n bits
Num_Int64.lshift(8);                // left shift n bits
Num_Int64.compare(ZERO);            // 1: more than, -1: less than, 0: equal
Num_Int64.toString(16);             // returns a string representing the value of this number in the specified base, base default: 10

let result = Num_Int64.add(4815627910169).sub(10000000000000).mul(100).div(100);
console.log(result.toString());     // 30000000000000
```

#### Int128 / UInt128 ####

```javascript
const { Int128, UInt128 } = require('jsboost');

// constructor
const Num_Int128 = Int128.from('9007199254740991');         // argument can be a number, string or Number Array (little-endian)
const Num_UInt128 = UInt128.from([0x000003E7, 0x000002000, 0x00000000, 0x00000000]);

// properties
const MAX_INT128 = Int128.MAX;
const MIN_INT128 = Int128.MIN;      // UInt128 doesn't have Min
const ZERO = Int128.ZERO;

// methods
Num_Int128.add(4815627910169);      // +
Num_Int128.sub(10000000000000);     // -
Num_Int128.mul(100000);             // *    equal to "multiply" function
Num_Int128.div(100000);             // /    equal to "divide" function
Num_Int128.modulo(10000);           // %
Num_Int128.and(MIN_INT128);
Num_Int128.or(ZERO);
Num_Int128.xor(ZERO);
Num_Int128.not();
Num_Int128.rshift(8);               // right shift n bits
Num_Int128.lshift(8);               // left shift n bits
Num_Int128.compare(ZERO);           // 1: more than, -1: less than, 0: equal
Num_Int128.toString(16);            // returns a string representing the value of this number in the specified base, base default: 10

let result = Num_Int128.add(4815627910169).sub(10000000000000).mul(100000).div(100000);
console.log(result.toString());     // 30000000000000
```

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
