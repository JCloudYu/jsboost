/**
 *	Author: JCloudYu
 *	Create: 2018/11/29
**/
(async()=>{
	"use strict";
	
	let ground_truth_resolved = 0, ground_truth_rejected = 0;
	const {ExtPromise} = require( '../jsboost' );
	
	const promises = [];
	for( let i=0; i<100; i++ ) {
		promises.push(___GEN_PROMISE(i+1, 0));
	}
	
	let results;
	try {
		results = await ExtPromise.WaitAll(promises);
		console.log('FINISHED');
	}
	catch(e) {
		results = e;
		console.log('REJECTED');
	}
	
	
	let resolve_count = 0, rejected_count = 0, correct_count = 0;
	for( let res of results ) {
		if ( res.result === (res.seq+1) ) {
			correct_count++;
		}
		if ( res.resolved ) {
			resolve_count++;
		}
		else {
			rejected_count++;
		}
	}
	
	console.log(ground_truth_resolved, ground_truth_rejected);
	console.log(resolve_count, rejected_count);
	console.log(correct_count);
	
	
	
	
	function ___GEN_PROMISE(INPUT, MAX=10) {
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				if ( Math.random() >=0.7 ) {
					ground_truth_resolved++;
					resolve(INPUT);
				}
				else {
					ground_truth_rejected++;
					reject(INPUT);
				}
			}, (((MAX * Math.random())|0)+1) * 1000);
		});
	}
})();
