/**
 *	Author: JCloudYu
 *	Create: 2019/03/22
**/
import assert from "assert";
import {Cookie} from "../jsboost.mjs"

const {HTTPCookies} = Cookie;

const GROUND_TRUTH = [
	'179=FT_c3xSZyJqWe5eF1y_kNEg5DZgzGTcp4kRTwZeHGy3c7yDuZ-BrxiG1c_7stQLeGi3BcjuLYpa0GTM5NAMGskhuW5a_fe6A024EZw9tcynLLRKw8JYAKiK633JsmDAMIljlwdThDNRoTPxtxxPlbWEWb9PXy0Ceshxboez2gk8',
	'2019-03-22-19'
];
const test = 'NID=179=FT_c3xSZyJqWe5eF1y_kNEg5DZgzGTcp4kRTwZeHGy3c7yDuZ-BrxiG1c_7stQLeGi3BcjuLYpa0GTM5NAMGskhuW5a_fe6A024EZw9tcynLLRKw8JYAKiK633JsmDAMIljlwdThDNRoTPxtxxPlbWEWb9PXy0Ceshxboez2gk8; 1P_JAR=2019-03-22-19';
unit_test( "parse from raw cookie", ()=>{
	const list = HTTPCookies.FromRawCookies(test);
	
	assert( list.get('NID').value === GROUND_TRUTH[0] );
	assert( list.get('1P_JAR').value === GROUND_TRUTH[1] );
});



const GROUND_TRUTH_SET = [
	'NID=179=FT_c3xSZyJqWe5eF1y_kNEg5DZgzGTcp4kRTwZeHGy3c7yDuZ-BrxiG1c_7stQLeGi3BcjuLYpa0GTM5NAMGskhuW5a_fe6A024EZw9tcynLLRKw8JYAKiK633JsmDAMIljlwdThDNRoTPxtxxPlbWEWb9PXy0Ceshxboez2gk8; Domain=.google.com; Path=/; HttpOnly',
	'1P_JAR=2019-03-22-19; Domain=.google.com; Path=/; Secure'
];
unit_test( "cookie generation", ()=>{
	const empty = new HTTPCookies();
	empty.set( 'NID',	 GROUND_TRUTH[0], {sslOnly:false, httpOnly:true, domain:'.google.com', path:'/', sameSite:null} );
	empty.set( '1P_JAR', GROUND_TRUTH[1], {sslOnly:true, httpOnly:false, domain:'.google.com', path:'/', sameSite:null} );
	
	const URL = empty.getHttpCookies();
	assert( URL[0] === GROUND_TRUTH_SET[0] );
	assert( URL[1] === GROUND_TRUTH_SET[1] );
});
