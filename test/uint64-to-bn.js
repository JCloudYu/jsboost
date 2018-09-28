(() => {

    const { UInt64, BigNumber } = require('../jsboost');

    // 9007199254740991
    const MAX = UInt64.from(Number.MAX_SAFE_INTEGER);

    process.stdout.write('    Testing UInt64 convert to bn (add)... ');
	{
        let answer = '9010000000000000';
        let num1 = new BigNumber(MAX).add(2800745259009);
        let num2 = new BigNumber(2800745259009).add(MAX);
		if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }
    
    process.stdout.write('    Testing UInt64 convert to bn (sub)... ');
	{
        let answer = '9000000000000000';
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
        let num1 = new BigNumber(MAX).mul(1000);
        let num2 = new BigNumber(1000).mul(MAX);
		if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }
    
    process.stdout.write('    Testing UInt64 convert to bn (div)... ');
	{
		let answer = '536870944';
        let num1 = new BigNumber(MAX).idiv(16777215);
		if (num1.toString() !== answer) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
	}
})();
