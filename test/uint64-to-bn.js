(() => {

    const { UInt64, BigNumber } = require('../jsboost');

    // 2097151 * (2^32) + 4294967295 = 9007199254740991
    const MAX = UInt64.from(Number.MAX_SAFE_INTEGER);

    process.stdout.write('    Testing UInt64 convert to bn (add)... ');
	{
        let answer = '9007199254741991';
		// 2097152 * (2^32) + 999 = 9007199254741991
        let num1 = new BigNumber(MAX).add(1000);
        let num2 = new BigNumber(1000).add(MAX);
		if ((num1.toString() !== answer) || (num2.toString() !== answer)) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }
    
    process.stdout.write('    Testing UInt64 convert to bn (sub)... ');
	{
        let answer = '9000000000000000';
        // 2095475 * (2^32) + 3405414400 = 9000000000000000
        let num1 = new BigNumber(MAX).sub(7199254740991);
		if (num1.toString() !== answer) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }
    
    process.stdout.write('    Testing UInt64 convert to bn (mul)... ');
	{
		let answer = '9007199254740991000';
        // 2097151999 * (2^32) + 4294966296 = 9007199254740991000
        let num1 = new BigNumber(MAX).mul(1000);
        let num2 = new BigNumber(1000).mul(MAX);
		if ((num1.toString() !== answer) || (num2.toString() !== answer)) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }
    
    process.stdout.write('    Testing UInt64 convert to bn (div)... ');
	{
		let answer = '536870944';
        // 0 * (2^32) + 536870944 = 536870944
        let num1 = new BigNumber(MAX).idiv(16777215);
		if (num1.toString() !== answer) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
	}
})();
