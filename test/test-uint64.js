/**
 * Author: JCloudYu
 * Create: 2018/09/25
**/
(()=>{
	"use strict";
	
	const {UInt64} = require( '../jsboost' );
	const MAX = UInt64.from(Number.MAX_SAFE_INTEGER);
	const MAX_UINT64 = UInt64.MAX_UINT64();
	
	
	process.stdout.write( "Testing arithmetic operations...\n" );
	process.stdout.write( "    Testing UInt64.add... " );
	{
		const ANSWER = [0x000003E7, 0x00200000];
		const TEST	 = MAX.add(1000);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.sub... " );
	{
		const ANSWER = [0xCAFA8000, 0x001FF973];
		const TEST	 = MAX.sub(7199254740991);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.multiply... " );
	{
		const ANSWER = [0xFFFFFC18, 0x7CFFFFFF];
		const TEST	 = MAX.multiply(1000);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.divide... " );
	{
		const ANSWER = [0x20000020, 0x00000000];
		const TEST	 = MAX.divide(16777215);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.modulo... " );
	{
		const ANSWER = [0x0000001F, 0x00000000];
		const TEST	 = MAX.modulo(16777215);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "\nTesting arithmetic operations...\n" );
	process.stdout.write( "    Testing UInt64.and... " );
	{
		const ANSWER = [0xFFFFFFFF, 0x001FFFFF];
		const TEST	 = MAX_UINT64.and(MAX);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.or... " );
	{
		const ANSWER = [0xFFFFFFFF, 0x001FFFFF];
		const TEST	 = MAX.or(UInt64.Zero());
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.not... " );
	{
		const ANSWER = [0x00000000, 0xFFE00000];
		const TEST	 = MAX.not();
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.xor... " );
	{
		const ANSWER = [0x00000000, 0x00000000];
		const TEST	 = MAX.xor(MAX);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.rshift (8 bits)... " );
	{
		const ANSWER = [0xFFFFFFFF, 0x00001FFF];
		const TEST	 = MAX.rshift(8);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.rshift (40 bits)... " );
	{
		const ANSWER = [0x00001FFF, 0x00000000];
		const TEST	 = MAX.rshift(40);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.lshift (8 bits)... " );
	{
		const ANSWER = [0xFFFFFF00, 0x1FFFFFFF];
		const TEST	 = MAX.lshift(8);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
	
	
	
	process.stdout.write( "    Testing UInt64.lshift (40 bits)... " );
	{
		const ANSWER = [0x00000000, 0xFFFFFF00];
		const TEST	 = MAX.lshift(40);
		if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
			process.stdout.write( "failed!\n" );
		}
		else {
			process.stdout.write( "passed!\n" );
		}
	}
})();
