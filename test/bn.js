(() => {
    const BI = require('../node/bn.js');
    const max = 100000;
    let start = 0, end = 0;

    start = new Date().getTime();
    let result1, result2;
    for (let i = 0; i < max; i++) {
        result1 = new BI(5).plus(97).minus(53).plus(434).multipliedBy(5435423).add(321453).multipliedBy(21).div(2).pow(2);
        result2 = new BI(5).add(97).sub(53).add(434).mul(5435423).add(321453).mul(21).div(2).pow(2);
        // 760056543044267246001
    }
    end = new Date().getTime();
    console.log(`Result1: ${result1.toString()}, Result2: ${result2.toString()}, Time: ${(end - start) / 1000} sec`);

    BI.config({ CRYPTO: true });
    let val1 = BI.random().toString();
    let val2 = BI.random().toString();
    let add1 = new BI(val1).add(val2);
    let pow1 = new BI(val1).pow(2)
    console.log(`Random1: ${val1}, Random2: ${val2}`);
    console.log(`AddResult: ${add1}, PowRandom1: ${pow1.toString()}`);
})();
