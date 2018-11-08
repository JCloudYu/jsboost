(() => {

    const {BigNumber} = require('../jsboost');
    const {Int64} = require( '../native/legacy/uint64' );

    // 9007199254740991
	const MAX = new BigNumber(Number.MAX_SAFE_INTEGER);

	// −9007199254740991
	const MIN = new BigNumber(Number.MIN_SAFE_INTEGER);

	process.stdout.write('Testing Int64 positive number...\n');
	{
		process.stdout.write('    Testing bn convert to Int64 (add positive)... ');
		{
			let answer = '9010000000000000';
			let num1 = Int64.from(MAX).add(2800745259009);
			let num2 = Int64.from(2800745259009).add(MAX);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (add negative)... ');
		{
			let answer = '9000000000000000';
			let num1 = Int64.from(MAX).add(-7199254740991);
			let num2 = Int64.from(-7199254740991).add(MAX);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
		
		process.stdout.write('    Testing bn convert to Int64 (sub positive)... ');
		{
			let answer = '9000000000000000';
			let num1 = Int64.from(MAX).sub(7199254740991);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (sub negative)... ');
		{
			let answer = '9010000000000000';
			let num1 = Int64.from(MAX).sub(-2800745259009);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
		
		process.stdout.write('    Testing bn convert to Int64 (mul positive)... ');
		{
			// + * + = +
			let answer = '9007199254740991000';
			let num1 = Int64.from(MAX).mul(1000);
			let num2 = Int64.from(1000).mul(MAX);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (mul negative)... ');
		{
			// + * - = -
			let answer = '-9007199254740991000';
			let num1 = Int64.from(MAX).mul(-1000);
			let num2 = Int64.from(-1000).mul(MAX);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
		
		process.stdout.write('    Testing bn convert to Int64 (div positive)... ');
		{
			// + / + = +
			let answer = '536870944';
			let num1 = Int64.from(MAX).div(16777215);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (div negative)... ');
		{
			// + / - = -
			let answer = '-536870944';
			let num1 = Int64.from(MAX).div(-16777215);
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
		process.stdout.write('    Testing bn convert to Int64 (add positive)... ');
		{
			let answer = '-9000000000000000';
			let num1 = Int64.from(MIN).add(7199254740991);
			let num2 = Int64.from(7199254740991).add(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (add negative)... ');
		{
			let answer = '-9010000000000000';
			let num1 = Int64.from(MIN).add(-2800745259009);
			let num2 = Int64.from(-2800745259009).add(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (sub positive)... ');
		{
			let answer = '-9010000000000000';
			let num1 = Int64.from(MIN).sub(2800745259009);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (sub negative)... ');
		{
			let answer = '-9000000000000000';
			let num1 = Int64.from(MIN).sub(-7199254740991);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (mul positive)... ');
		{
			// - * + = -
			let answer = '-9007199254740991000';
			let num1 = Int64.from(MIN).mul(1000);
			let num2 = Int64.from(1000).mul(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (mul negative)... ');
		{
			// - * - = +
			let answer = '9007199254740991000';
			let num1 = Int64.from(MIN).mul(-1000);
			let num2 = Int64.from(-1000).mul(MIN);
			if ((num1.toString() !== answer) || (num1.toString() !== num2.toString())) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
		
		process.stdout.write('    Testing bn convert to Int64 (div positive)... ');
		{
			// - / + = -
			let answer = '-536870944';
			let num1 = Int64.from(MIN).div(16777215);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}

		process.stdout.write('    Testing bn convert to Int64 (div negative)... ');
		{
			// - / - = +
			let answer = '536870944';
			let num1 = Int64.from(MIN).div(-16777215);
			if (num1.toString() !== answer) {
				process.stdout.write('failed!\n');
			}
			else {
				process.stdout.write('passed!\n');
			}
		}
	}
})();
