(() => {

    const {BigNumber} = require('../jsboost');
    const {UInt64} = require( '../native/legacy/uint64' );

	// 9007199254740991
    const MAX = new BigNumber(Number.MAX_SAFE_INTEGER);

    process.stdout.write('    Testing bn convert to UInt64 (add)... ');
	{
        let answer = '9010000000000000';
        let num1 = UInt64.from(MAX).add(2800745259009);
        let num2 = UInt64.from(2800745259009).add(MAX);
		if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }

    process.stdout.write('    Testing bn convert to UInt64 (sub)... ');
	{
        let answer = '9000000000000000';
        let num1 = UInt64.from(MAX).sub(7199254740991);
		if (num1.toString() !== answer) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }
    
    process.stdout.write('    Testing bn convert to UInt64 (mul)... ');
	{
		let answer = '9007199254740991000';
        let num1 = UInt64.from(MAX).mul(1000);
        let num2 = UInt64.from(1000).mul(MAX);
		if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
    }
    
    process.stdout.write('    Testing bn convert to UInt64 (div)... ');
	{
		let answer = '536870944';
        let num1 = UInt64.from(MAX).div(16777215);
		if (num1.toString() !== answer) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
	}

	process.stdout.write('    Testing bn convert to UInt64 (conversion)... ');
	{
		let answer = '18446744073709551615';
		let bn = new BigNumber('18446744073709551615');
		if (UInt64.from(bn).toString() !== answer) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
	}

	process.stdout.write('    Testing bn convert to UInt64 (conversion)... ');
	{
		let answer = '1';
		let bn = new BigNumber('-18446744073709551615');
		if (UInt64.from(bn).toString() !== answer) {
			process.stdout.write('failed!\n');
		}
		else {
			process.stdout.write('passed!\n');
		}
	}
})();
