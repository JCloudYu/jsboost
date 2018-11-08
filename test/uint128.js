/**
 * Author: JCloudYu
 * Create: 2018/09/25
**/
(()=>{
	"use strict";
	
	const {UInt128} = require( '../native/legacy/uint128' );
	const MAX = UInt128.from(Number.MAX_SAFE_INTEGER);
    const MAX_UINT128 = UInt128.MAX;
    
    
	process.stdout.write( "Testing arithmetic operations...\n" );
	process.stdout.write( "    Testing UInt128.add... " );
	{
		const ANSWER = [0x000003E7, 0x00200000, 0x00000000, 0x00000000];
		const TEST	 = MAX.add(1000);
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
    
    process.stdout.write( "    Testing UInt128.add... " );
	{
		const ANSWER = [0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF];
		const TEST	 = UInt128.from('300000000000000000000000000000000000000').add('40282366920938463463374607431768211455');
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
	
	process.stdout.write( "    Testing UInt128.sub... " );
	{
		const ANSWER = [0xCAFA8000, 0x001FF973, 0x00000000, 0x00000000];
		const TEST	 = MAX.sub('7199254740991');
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
    
    process.stdout.write( "    Testing UInt128.sub... " );
	{
		const ANSWER = [0x000000, 0x1C9E66C0, 0x0F944D6E, 0xE1b1E5F9];
		const TEST	 = MAX_UINT128.sub('40282366920938463463374607431768211455');
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
	
	process.stdout.write( "    Testing UInt128.multiply... " );
	{
		const ANSWER = [0xFFFFFC18, 0x7CFFFFFF, 0x00000000, 0x00000000];
		const TEST	 = MAX.multiply(1000);
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
    
    process.stdout.write( "    Testing UInt128.multiply... " );
	{
		const ANSWER = [0x000000, 0x1C9E66C0, 0x0F944D6E, 0xE1b1E5F9];
		const TEST	 = UInt128.from('300000000000000000000000000000000000').multiply(1000);
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
	
	process.stdout.write( "    Testing UInt128.divide... " );
	{
		const ANSWER = [0x20000020, 0x00000000, 0x00000000, 0x00000000];
		const TEST	 = MAX.divide(16777215);
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
    
    process.stdout.write( "    Testing UInt128.divide... " );
	{
		const ANSWER = [0x00000100, 0x01000001, 0x00010000, 0x00000100];
		const TEST	 = MAX_UINT128.divide(16777215);
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
	
	process.stdout.write( "    Testing UInt128.modulo... " );
	{
		const ANSWER = [0x0000001F, 0x00000000, 0x00000000, 0x00000000];
		const TEST	 = MAX.modulo(16777215);
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
    
    process.stdout.write( "    Testing UInt128.modulo... " );
	{
		const ANSWER = [0x000000FF, 0x00000000, 0x00000000, 0x00000000];
		const TEST	 = MAX_UINT128.modulo(16777215);
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
    
    

	process.stdout.write( "\nTesting arithmetic operations...\n" );
	process.stdout.write( "    Testing UInt128.and... " );
	{
		const ANSWER = [0xFFFFFFFF, 0x001FFFFF, 0x00000000, 0x00000000];
		const TEST	 = MAX_UINT128.and(MAX);
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
	
	process.stdout.write( "    Testing UInt128.or... " );
	{
		const ANSWER = [0xFFFFFFFF, 0x001FFFFF, 0x00000000, 0x00000000];
		const TEST	 = MAX.or(UInt128.ZERO);
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
	
	process.stdout.write( "    Testing UInt128.not... " );
	{
		const ANSWER = [0x00000000, 0xFFE00000, 0xFFFFFFFF, 0xFFFFFFFF];
		const TEST	 = MAX.not();
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
	
	process.stdout.write( "    Testing UInt128.xor... " );
	{
		const ANSWER = [0x00000000, 0x00000000, 0x00000000, 0x00000000];
		const TEST	 = MAX.xor(MAX);
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
	
	process.stdout.write( "    Testing UInt128.rshift (8 bits)... " );
	{
		const ANSWER = [0xFFFFFFFF, 0x00001FFF, 0x00000000, 0x00000000];
		const TEST	 = MAX.rshift(8);
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
    
    process.stdout.write( "    Testing UInt128.rshift (8 bits)... " );
	{
		const ANSWER = [0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0x00FFFFFF];
		const TEST	 = MAX_UINT128.rshift(8);
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
	
	process.stdout.write( "    Testing UInt128.rshift (40 bits)... " );
	{
		const ANSWER = [0x00001FFF, 0x00000000, 0x00000000, 0x00000000];
		const TEST	 = MAX.rshift(40);
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
    
    process.stdout.write( "    Testing UInt128.rshift (40 bits)... " );
	{
		const ANSWER = [0xFFFFFFFF, 0xFFFFFFFF, 0x00FFFFFF, 0x00000000];
		const TEST	 = MAX_UINT128.rshift(40);
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
	
	process.stdout.write( "    Testing UInt128.lshift (8 bits)... " );
	{
		const ANSWER = [0xFFFFFF00, 0x1FFFFFFF, 0x00000000, 0x00000000];
		const TEST	 = MAX.lshift(8);
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
    
    process.stdout.write( "    Testing UInt128.lshift (8 bits)... " );
	{
		const ANSWER = [0xFFFFFF00, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF];
		const TEST	 = MAX_UINT128.lshift(8);
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
	
	process.stdout.write( "    Testing UInt128.lshift (40 bits)... " );
	{
        const ANSWER = [0x00000000, 0xFFFFFF00, 0x1FFFFFFF, 0x00000000];
		const TEST	 = MAX.lshift(40);
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
    
    process.stdout.write( "    Testing UInt128.lshift (40 bits)... " );
	{
        const ANSWER = [0x00000000, 0xFFFFFF00, 0xFFFFFFFF, 0xFFFFFFFF];
		const TEST	 = MAX_UINT128.lshift(40);
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
    
    

	process.stdout.write( "\nTesting rendering operations...\n" );
	process.stdout.write( "    Testing UInt128.toString()... " );
	{
        const ANSWER = "34567890000123456789012345678900";
		const TEST = UInt128.from("34567890000123456789012345678900").toString();
		process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
	}
	
	process.stdout.write( "    Testing UInt128.toString(2)... " );
	{
		const ANSWER = "00000000000000000000000000000000000000000000000000000000000000000000000000011111111111110000000000000000000000001111111111111111";
		const TEST = UInt128.from(0x1FFF000000FFFF).toString(2);
		process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
	}
	
	process.stdout.write( "    Testing UInt128.toString(16)... " );
	{
		const ANSWER = "1fff000000ffff";
		const TEST = UInt128.from(0x1FFF000000FFFF).toString(16);
		process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
	}
    
    

	process.stdout.write( "\nTesting serialization... " );
	{
		const INPUT = JSON.stringify(MAX.serialize());
		const TEST	= UInt128.deserialize(JSON.parse(INPUT));
		process.stdout.write( (MAX.compare(TEST) !== 0) ? "failed!\n" : "passed!\n" );
    }
})();
