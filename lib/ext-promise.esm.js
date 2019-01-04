import {ObjectDefineProperty} from "./ext-object.esm.js";



/**
 *	Author: JCloudYu
 *	Create: 2018/11/29
**/
export function WaitAll(promise_queue=[]) {
	if ( !Array.isArray(promise_queue) ){
		promise_queue = [promise_queue];
	}
	
	if( promise_queue.length === 0 ){
		return Promise.resolve([]);
	}
	
	return new Promise((resolve, reject) =>{
		let result_queue=[], ready_count=0, resolved = true;
		for(let idx=0; idx<promise_queue.length; idx++) {
			let item = {resolved:true, seq:idx, result:null};
			
			result_queue.push(item);
			Promise.resolve(promise_queue[idx]).then(
				(result)=>{
					resolved = (item.resolved = true) && resolved;
					item.result = result;
				},
				(error)=>{
					resolved = (item.resolved = false) && resolved;
					item.result = error;
				}
			).then(()=>{
				ready_count++;
				
				if ( promise_queue.length === ready_count ) {
					(resolved?resolve:reject)(result_queue);
				}
			});
		}
	});
}
Object.defineProperty(WaitAll, 'ShadowPromise', {
	value:(restore=false)=>{
		if (restore) {
			if ( Promise.waitAll ) {
				delete Promise.waitAll;
			}
		}
		else {
			Object.defineProperty(Promise, 'waitAll', {
				value:WaitAll,
				enumerable:false, configurable:true, writable:true
			});
		}
	}, enumerable:false
});



export function PassivePromise() {
	const compact = {};
	compact.promise = new Promise((resolve, reject)=>{
		compact.resolve=resolve;
		compact.reject=reject;
	});
	return compact;
}
Object.defineProperty(PassivePromise, 'ShadowPromise', {
	value:(restore=false)=>{
		if (restore) {
			if ( Promise.passive ) {
				delete Promise.passive;
			}
		}
		else {
			Object.defineProperty(Promise, 'passive', {
				value:PassivePromise,
				enumerable:false, configurable:true, writable:true
			});
		}
	}, enumerable:false
});
