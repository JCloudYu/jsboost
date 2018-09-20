(() => {
    'use strict';

    const BN = require('../node/bn');
    const max = 100000;
    let start = 0, end = 0;

    start = new Date().getTime();
    let result1, result2;
    for (let i = 0; i < max; i++) {
        // 760056543044267246001
        result1 = new BN(5).plus(97).minus(53).plus(434).multipliedBy(5435423).add(321453).multipliedBy(21).div(2).pow(2);
        result2 = new BN(5).add(97).sub(53).add(434).mul(5435423).add(321453).mul(21).div(2).pow(2);
    }
    end = new Date().getTime();
    console.log(`ManCnt: ${max}, Time: ${(end - start) / 1000} sec`);
    console.log(`Result1: ${result1.toString()}, Result2: ${result2.toString()}`);

    BN.config({ CRYPTO: true });
    let val1 = BN.random().toString();
    let val2 = BN.random().toString();
    let add1 = new BN(val1).add(val2);
    let pow1 = new BN(val1).pow(2)
    console.log(`\nRandom1: ${val1}, Random2: ${val2}`);
    console.log(`AddResult: ${add1}, PowRandom1: ${pow1.toString()}`);
})();
