(()=>{
	"use strict";
	
    const {Int128} = require( '../native/legacy/uint128' );
	const MAX = Int128.from(Number.MAX_SAFE_INTEGER);
	const MAX_INT = Int128.MAX;
	const MIN = Int128.from(Number.MIN_SAFE_INTEGER);
	const MIN_INT = Int128.MIN;
	
	
	
	process.stdout.write("==================== Constructor Test ====================\n\n");
	{
		process.stdout.write("Testing constructor input...\n");
		{
			process.stdout.write("    Testing Int128.from... ");
			const ANSWER = [0xA29C779B, 0xFFFCB923, 0xFFFFFFFF, 0xFFFFFFFF];
			const TESTS = [
				Int128.from(-922337203685477),
				Int128.from('-922337203685477'),
				Int128.from('0xfffffffffffffffffffcb923a29c779b'),
				Int128.from('0xFfFffFfFffffFFFFfFFcb923a29c779b'),
				Int128.from('0b11111111111111111111111111111111111111111111111111111111111111111111111111111100101110010010001110100010100111000111011110011011')
			];
			
			let passed = true;
			for ( let TEST of TESTS ) {
				for ( let idx=0; idx<ANSWER.length; idx++ ) {
					passed = passed && (TEST[idx] === ANSWER[idx]);
				}
			}
			
			 if ( passed ) {
                process.stdout.write( "failed!\n" );
            }
			else{
				process.stdout.write("passed!\n");
			}
		}
	}
	
	process.stdout.write("\n==================== Max Test ====================\n\n");
	{
		process.stdout.write("Testing arithmetic operations...\n");
		process.stdout.write("    Testing Int128.add... ");
		{
			const ANSWER = [0x000003E7, 0x00200000, 0x00000000, 0x00000000];
			const TEST = MAX.add(1000);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.sub... ");
		{
			const ANSWER = [0xCAFA8000, 0x001FF973, 0x00000000, 0x00000000];
			const TEST = MAX.sub(7199254740991);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.multiply... ");
		{
			const ANSWER = [0xFFFFFC18, 0x7CFFFFFF, 0x00000000, 0x00000000];
			const TEST = MAX.multiply(1000);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.divide... ");
		{
			const ANSWER = [0x20000020, 0x00000000, 0x00000000, 0x00000000];
			const TEST = MAX.divide(16777215);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.modulo... ");
		{
			const ANSWER = [0x000016AF, 0x00000000, 0x00000000, 0x00000000];
			const MAX_TEST = Int128.from([0xFFFFFFFF, 0x7FFFFFFF, 0x00000000, 0x00000000]);
			const TEST = MAX_TEST.modulo(10000);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.modulo... ");
		{
			const ANSWER = [0x000016AF, 0x00000000, 0x00000000, 0x00000000];
			const MAX_TEST = Int128.from([0xFFFFFFFF, 0x7FFFFFFF, 0x00000000, 0x00000000]);
			const TEST = MAX_TEST.modulo(-10000);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("\nTesting arithmetic operations...\n");
		process.stdout.write("    Testing Int128.and... ");
		{
			const ANSWER = [0xFFFFFFFF, 0x001FFFFF, 0x00000000, 0x00000000];
			const TEST = MAX_INT.and(MAX);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.or... ");
		{
			const ANSWER = [0xFFFFFFFF, 0x001FFFFF, 0x00000000, 0x00000000];
			const TEST = MAX.or(Int128.ZERO);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.not... ");
		{
			const ANSWER = [0x00000000, 0xFFE00000, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MAX.not();
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.xor... ");
		{
			const ANSWER = [0x00000000, 0x00000000, 0x00000000, 0x00000000];
			const TEST = MAX.xor(MAX);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.rshift (8 bits)... ");
		{
			const ANSWER = [0xFFFFFFFF, 0x00001FFF, 0x00000000, 0x00000000];
			const TEST = MAX.rshift(8);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.rshift (40 bits)... ");
		{
			const ANSWER = [0x00001FFF, 0x00000000, 0x00000000, 0x00000000];
			const TEST = MAX.rshift(40);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.lshift (8 bits)... ");
		{
			const ANSWER = [0xFFFFFF00, 0x1FFFFFFF, 0x00000000, 0x00000000];
			const TEST = MAX.lshift(8);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.lshift (40 bits)... ");
		{
			const ANSWER = [0x00000000, 0xFFFFFF00, 0x1FFFFFFF, 0x00000000];
			const TEST = MAX.lshift(40);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		/*
		process.stdout.write("\nTesting rendering operations...\n");
		process.stdout.write("    Testing Int128.toString()... ");
		{
			const ANSWER = "34567890000123456";
			const TEST = Int128.from(34567890000123456).toString();
			process.stdout.write((ANSWER !== TEST) ? "failed!\n" : "passed!\n");
		}
		
		process.stdout.write("    Testing Int128.toString(2)... ");
		{
			const ANSWER = "0000000000011111111111110000000000000000000000001111111111111111";
			const TEST = Int128.from(0x1FFF000000FFFF).toString(2);
			process.stdout.write((ANSWER !== TEST) ? "failed!\n" : "passed!\n");
		}
		
		process.stdout.write("    Testing Int128.toString(16)... ");
		{
			const ANSWER = "1fff000000ffff";
			const TEST = Int128.from(0x1FFF000000FFFF).toString(16);
			process.stdout.write((ANSWER !== TEST) ? "failed!\n" : "passed!\n");
		}
		
				process.stdout.write("\nTesting serialization... ");
				{
					const INPUT = JSON.stringify(MAX.serialize());
					const TEST = Int128.deserialize(JSON.parse(INPUT));
					process.stdout.write((MAX.compare(TEST) !== 0) ? "failed!\n" : "passed!\n");
				}
		*/
	}
	
	process.stdout.write("\n==================== Min Test ====================\n\n");
	{
		process.stdout.write("Testing arithmetic operations...\n");
		process.stdout.write("    Testing Int128.add... ");
		{
			const ANSWER = [0x35058000, 0xFFE0068C, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.add(7199254740991);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.sub... ");
		{
			const ANSWER = [0x35058000, 0xFFE0068C, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.sub(-7199254740991);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.multiply... ");
		{
			const ANSWER = [0x000003E8, 0x83000000, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.multiply(1000);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.divide... ");
		{
			const ANSWER = [0xDFFFFFE0, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.divide(16777215);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.modulo... ");
		{
			const ANSWER = [0xFFFFE950, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF];
			const MIN_TEST = Int128.from([0x00000000, 0x80000000, 0xFFFFFFFF, 0xFFFFFFFF]);
			const TEST = MIN_TEST.modulo(10000);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.modulo... ");
		{
			const ANSWER = [0xFFFFE950, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF];
			const MIN_TEST = Int128.from([0x00000000, 0x80000000, 0xFFFFFFFF, 0xFFFFFFFF]);
			const TEST = MIN_TEST.modulo(-10000);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("\nTesting arithmetic operations...\n");
		process.stdout.write("    Testing Int128.and... ");
		{
			const ANSWER = [0x00000000, 0x000000, 0x00000000, 0x80000000];
			const TEST = MIN_INT.and(MIN);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.or... ");
		{
			const ANSWER = [0x00000001, 0xFFE00000, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.or(Int128.ZERO);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.not... ");
		{
			const ANSWER = [0xFFFFFFFE, 0x001FFFFF, 0x00000000, 0x00000000];
			const TEST = MIN.not();
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.xor... ");
		{
			const ANSWER = [0x00000000, 0x00000000, 0x00000000, 0x00000000];
			const TEST = MIN.xor(MIN);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.rshift (8 bits)... ");
		{
			const ANSWER = [0x00000000, 0xFFFFE000, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.rshift(8);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.rshift (40 bits)... ");
		{
			const ANSWER = [0xFFFFE000, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.rshift(40);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.lshift (8 bits)... ");
		{
			const ANSWER = [0x00000100, 0xE0000000, 0xFFFFFFFF, 0xFFFFFFFF];
			const TEST = MIN.lshift(8);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("    Testing Int128.lshift (40 bits)... ");
		{
			const ANSWER = [0x00000000, 0x00000100, 0xE0000000, 0xFFFFFFFF];
			const TEST = MIN.lshift(40);
			let passed = true;
			for ( let i=0; i < ANSWER.length; i++ ) {
				passed = passed && (ANSWER[i] === TEST._ta[i]);
			}
			
			if ( passed ) {
				process.stdout.write("passed!\n");
			}
			else {
				process.stdout.write("failed!\n");
			}
		}
		
		process.stdout.write("\nTesting rendering operations...\n");
		process.stdout.write("    Testing Int128.toString()... ");
		{
			const ANSWER = "34567890000123456";
			const TEST = Int128.from(34567890000123456).toString();
			process.stdout.write((ANSWER !== TEST) ? "failed!\n" : "passed!\n");
		}
		
		process.stdout.write("    Testing Int128.toString(2)... ");
		{
			const ANSWER = "00000000000000000000000000000000000000000000000000000000000000000000000000011111111111110000000000000000000000001111111111111111";
			const TEST = Int128.from(0x1FFF000000FFFF).toString(2);
			process.stdout.write((ANSWER !== TEST) ? "failed!\n" : "passed!\n");
		}
		
		process.stdout.write("    Testing Int128.toString(16)... ");
		{
			const ANSWER = "1fff000000ffff";
			const TEST = Int128.from(0x1FFF000000FFFF).toString(16);
			process.stdout.write((ANSWER !== TEST) ? "failed!\n" : "passed!\n");
		}
		
		process.stdout.write("\nTesting serialization... ");
		{
			const INPUT = JSON.stringify(MIN.serialize());
			const TEST = Int128.deserialize(JSON.parse(INPUT));
			process.stdout.write((MIN.compare(TEST) !== 0) ? "failed!\n" : "passed!\n");
		}
	}
})();
