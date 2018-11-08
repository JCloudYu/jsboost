(() => {

    const { BigNumber } = require('../jsboost');
    const { Int64 } = require( '../native/legacy/uint64' );
    

    // 9007199254740991
	const MAX = Int64.from(Number.MAX_SAFE_INTEGER);

	// −9007199254740991
	const MIN = Int64.from(Number.MIN_SAFE_INTEGER);

	process.stdout.write('Testing Int64 positive number...\n');
	{
		process.stdout.write('    Testing Int64 convert to bn (add positive)... ');
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

		process.stdout.write('    Testing Int64 convert to bn (add negative)... ');
		{
			let answer = '9000000000000000';
			let num1 = new BigNumber(MAX).add(-7199254740991);
			let num2 = new BigNumber(-7199254740991).add(MAX);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (sub positive)... ');
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

		process.stdout.write('    Testing Int64 convert to bn (sub negative)... ');
		{
			let answer = '9010000000000000';
			let num1 = new BigNumber(MAX).sub(-2800745259009);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
		
		process.stdout.write('    Testing Int64 convert to bn (mul positive)... ');
		{
			// + * + = +
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

		process.stdout.write('    Testing Int64 convert to bn (mul negative)... ');
		{
			// + * - = -
			let answer = '-9007199254740991000';
			let num1 = new BigNumber(MAX).mul(-1000);
			let num2 = new BigNumber(-1000).mul(MAX);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
		
		process.stdout.write('    Testing Int64 convert to bn (div positive)... ');
		{
			// + / + = +
			let answer = '536870944';
			let num1 = new BigNumber(MAX).idiv(16777215);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (div negative)... ');
		{
			// + / - = -
			let answer = '-536870944';
			let num1 = new BigNumber(MAX).idiv(-16777215);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
	}

	process.stdout.write('Testing Int64 negative number...\n');
	{
		process.stdout.write('    Testing Int64 convert to bn (add positive)... ');
		{
			let answer = '-9000000000000000';
			let num1 = new BigNumber(MIN).add(7199254740991);
			let num2 = new BigNumber(7199254740991).add(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (add negative)... ');
		{
			let answer = '-9010000000000000';
			let num1 = new BigNumber(MIN).add(-2800745259009);
			let num2 = new BigNumber(-2800745259009).add(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (sub positive)... ');
		{
			let answer = '-9010000000000000';
			let num1 = new BigNumber(MIN).sub(2800745259009);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (sub negative)... ');
		{
			let answer = '-9000000000000000';
			let num1 = new BigNumber(MIN).sub(-7199254740991);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (mul positive)... ');
		{
			// - * + = -
			let answer = '-9007199254740991000';
			let num1 = new BigNumber(MIN).mul(1000);
			let num2 = new BigNumber(1000).mul(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (mul negative)... ');
		{
			// - * - = +
			let answer = '9007199254740991000';
			let num1 = new BigNumber(MIN).mul(-1000);
			let num2 = new BigNumber(-1000).mul(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
		
		process.stdout.write('    Testing Int64 convert to bn (div positive)... ');
		{
			// - / + = -
			let answer = '-536870944';
			let num1 = new BigNumber(MIN).idiv(16777215);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing Int64 convert to bn (div negative)... ');
		{
			// - / - = +
			let answer = '536870944';
			let num1 = new BigNumber(MIN).idiv(-16777215);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
	}
})();
