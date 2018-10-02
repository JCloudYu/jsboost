/**
 * Author: JCloudYu
 * Create: 2018/09/26
**/
(async()=>{
	const JSBoost = await import('../../jsboost.esm.js');
	const {UInt64} = JSBoost;
	
	
	const uint64 = UInt64.MAX;
	console.log(uint64.toString());
	console.log(uint64.toString(2));
	console.log(uint64.toString(16));
})();
