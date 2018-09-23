(() => {
    'use strict';

    const { BigNumber, Serialize, Deserialize } = require('../jsboost');

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
})();
