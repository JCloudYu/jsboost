
(()=>{
    "use strict";
    
    const { Int64 } = require( '../jsboost' );
    const MAX = Int64.from(Number.MAX_SAFE_INTEGER);
    const MAX_INT64 = Int64.MAX;
    const MIN = Int64.from(Number.MIN_SAFE_INTEGER);
    const MIN_INT64 = Int64.MIN;

    process.stdout.write( "==================== Constructor Test ====================\n\n" );
    {
        process.stdout.write( "Testing constructor input...\n" );
        {
            process.stdout.write( "    Testing Int64.from... " );
            const INPUT1 = Int64.from(-922337203685477);
            const INPUT2 = Int64.from('-922337203685477');
            const INPUT3 = Int64.from('0xfffcb923a29c779b');
            const INPUT4 = Int64.from('0xfFFcb923a29c779b');
            const INPUT5 = Int64.from('0b1111111111111100101110010010001110100010100111000111011110011011');

            if ( (INPUT1.compare(INPUT2) !== 0) || (INPUT2.compare(INPUT3) !== 0) || (INPUT3.compare(INPUT4) !== 0) || (INPUT4.compare(INPUT5) !== 0) ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    }

    process.stdout.write( "\n==================== Max Test ====================\n\n" );
    {
        process.stdout.write( "Testing arithmetic operations...\n" );
        process.stdout.write( "    Testing Int64.add... " );
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
    
        process.stdout.write( "    Testing Int64.sub... " );
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
    
        process.stdout.write( "    Testing Int64.multiply... " );
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
    
        process.stdout.write( "    Testing Int64.divide... " );
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
    
        process.stdout.write( "    Testing Int64.modulo... " );
        {
            const ANSWER = [0x000016AF, 0x00000000];
            const TEST	 = MAX_INT64.modulo(10000);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }

        process.stdout.write( "    Testing Int64.modulo... " );
        {
            const ANSWER = [0x000016AF, 0x00000000];
            const TEST	 = MAX_INT64.modulo(-10000);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "\nTesting arithmetic operations...\n" );
        process.stdout.write( "    Testing Int64.and... " );
        {
            const ANSWER = [0xFFFFFFFF, 0x001FFFFF];
            const TEST	 = MAX_INT64.and(MAX);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.or... " );
        {
            const ANSWER = [0xFFFFFFFF, 0x001FFFFF];
            const TEST	 = MAX.or(Int64.ZERO);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.not... " );
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
    
        process.stdout.write( "    Testing Int64.xor... " );
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
    
        process.stdout.write( "    Testing Int64.rshift (8 bits)... " );
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
    
        process.stdout.write( "    Testing Int64.rshift (40 bits)... " );
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
    
        process.stdout.write( "    Testing Int64.lshift (8 bits)... " );
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
    
        process.stdout.write( "    Testing Int64.lshift (40 bits)... " );
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
    
        process.stdout.write( "\nTesting rendering operations...\n" );
        process.stdout.write( "    Testing Int64.toString()... " );
        {
            const ANSWER = "34567890000123456";
            const TEST = Int64.from(34567890000123456).toString();
            process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
        }
    
        process.stdout.write( "    Testing Int64.toString(2)... " );
        {
            const ANSWER = "0000000000011111111111110000000000000000000000001111111111111111";
            const TEST = Int64.from(0x1FFF000000FFFF).toString(2);
            process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
        }
    
        process.stdout.write( "    Testing Int64.toString(16)... " );
        {
            const ANSWER = "1fff000000ffff";
            const TEST = Int64.from(0x1FFF000000FFFF).toString(16);
            process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
        }
    
        process.stdout.write( "\nTesting serialization... " );
        {
            const INPUT = JSON.stringify(MAX.serialize());
            const TEST	= Int64.deserialize(JSON.parse(INPUT));
            process.stdout.write( (MAX.compare(TEST) !== 0) ? "failed!\n" : "passed!\n" );
        }
    }

    process.stdout.write( "\n==================== Min Test ====================\n\n" );
    {
        process.stdout.write( "Testing arithmetic operations...\n" );
        process.stdout.write( "    Testing Int64.add... " );
        {
            const ANSWER = [0x35058000, 0xFFE0068C];
            const TEST	 = MIN.add(7199254740991);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.sub... " );
        {
            const ANSWER = [0x35058000, 0xFFE0068C];
            const TEST	 = MIN.sub(-7199254740991);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.multiply... " );
        {
            const ANSWER = [0x000003E8, 0x83000000];
            const TEST	 = MIN.multiply(1000);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.divide... " );
        {
            const ANSWER = [0xDFFFFFE0, 0xFFFFFFFF];
            const TEST	 = MIN.divide(16777215);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.modulo... " );
        {
            const ANSWER = [0xFFFFE950, 0xFFFFFFFF];
            const TEST	 = MIN_INT64.modulo(10000);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }

        process.stdout.write( "    Testing Int64.modulo... " );
        {
            const ANSWER = [0xFFFFE950, 0xFFFFFFFF];
            const TEST	 = MIN_INT64.modulo(-10000);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "\nTesting arithmetic operations...\n" );
        process.stdout.write( "    Testing Int64.and... " );
        {
            const ANSWER = [0x00000000, 0x80000000];
            const TEST	 = MIN_INT64.and(MIN);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.or... " );
        {
            const ANSWER = [0x00000001, 0xFFE00000];
            const TEST	 = MIN.or(Int64.ZERO);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.not... " );
        {
            const ANSWER = [0xFFFFFFFE, 0x001FFFFF];
            const TEST	 = MIN.not();
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.xor... " );
        {
            const ANSWER = [0x00000000, 0x00000000];
            const TEST	 = MIN.xor(MIN);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.rshift (8 bits)... " );
        {
            const ANSWER = [0x00000000, 0xFFFFE000];
            const TEST	 = MIN.rshift(8);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.rshift (40 bits)... " );
        {
            const ANSWER = [0xFFFFE000, 0xFFFFFFFF];
            const TEST	 = MIN.rshift(40);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.lshift (8 bits)... " );
        {
            const ANSWER = [0x00000100, 0xE0000000];
            const TEST	 = MIN.lshift(8);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "    Testing Int64.lshift (40 bits)... " );
        {
            const ANSWER = [0x00000000, 0x00000100];
            const TEST	 = MIN.lshift(40);
            if ( TEST.lo !== ANSWER[0] || TEST.hi !== ANSWER[1] ) {
                process.stdout.write( "failed!\n" );
            }
            else {
                process.stdout.write( "passed!\n" );
            }
        }
    
        process.stdout.write( "\nTesting rendering operations...\n" );
        process.stdout.write( "    Testing Int64.toString()... " );
        {
            const ANSWER = "34567890000123456";
            const TEST = Int64.from(34567890000123456).toString();
            process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
        }
    
        process.stdout.write( "    Testing Int64.toString(2)... " );
        {
            const ANSWER = "0000000000011111111111110000000000000000000000001111111111111111";
            const TEST = Int64.from(0x1FFF000000FFFF).toString(2);
            process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
        }
    
        process.stdout.write( "    Testing Int64.toString(16)... " );
        {
            const ANSWER = "1fff000000ffff";
            const TEST = Int64.from(0x1FFF000000FFFF).toString(16);
            process.stdout.write( (ANSWER !== TEST) ? "failed!\n" : "passed!\n" );
        }
    
        process.stdout.write( "\nTesting serialization... " );
        {
            const INPUT = JSON.stringify(MIN.serialize());
            const TEST	= Int64.deserialize(JSON.parse(INPUT));
            process.stdout.write( (MIN.compare(TEST) !== 0) ? "failed!\n" : "passed!\n" );
        }
    }
})();
