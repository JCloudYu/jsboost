(() => {
    'use strict';

    const BN = require('../node/bn');
    const { serialize, deserialize } = require('../node/serialization');

    let number = '760056543044267246001';
    let data = {
        k1: new BN(number),
        k2: new BN(`-${number}`),
        k3: false,
        k4: 123456,
        k5: 'a4b5c6',
        k6: [new BN(number), new BN(`-${number}`), false, 123456, 'a4b5c6'],
        k7: {
            k71: new BN(number),
            k72: new BN(`-${number}`),
            k73: false,
            k74: 123,
            k75: 'a4b5c6'
        },
        k8: null,
        k9: undefined
    };
    let serializeStr = serialize(data);
    let deserializeData = deserialize(serializeStr);

    console.log('Origin data:');
    console.log(data);

    console.log('\nSerialize data:');
    console.log(serializeStr);

    console.log('\nDeserialize data:');
    console.log(deserializeData);
})();