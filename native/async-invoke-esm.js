/**
 * Author: JCloudYu
 * Create: 2018/09/22
**/

const _WEAK_REL_MAP = new WeakMap();
export class AsyncInvoke {
	constructor() {
		const _PRIVATES = {
			_cb_pool: {}
		};
		_WEAK_REL_MAP.set(this, _PRIVATES);
	}
	invoke(callback=null) {
		const {_cb_pool} = _WEAK_REL_MAP.get(this);
	
		let _uniqueId = __UNIQUE_ID(), _ori_res=null, _ori_rej=null;
		const _promise = new Promise((res, rej)=>{_ori_res=res; _ori_rej=rej;});
		const _resolve = (...args)=>{
			if ( _callback_state.state !== 0 ) return;
			
			_callback_state.state = 1;
			_ori_res(...args);
			delete _cb_pool[_uniqueId];
		};
		const _reject = (...args)=>{
			if ( _callback_state.state !== 0 ) return;
			
			_callback_state.state = -1;
			_ori_rej(...args);
			delete _cb_pool[_uniqueId];
		};
		const _callback_state = _cb_pool[_uniqueId] = {
			state: 0,
			resolve: _resolve,
			reject: _reject,
			timestamp:Date.now()
		};
		
		
		
		
		
		
		
		
		if ( typeof callback !== "function" ) {
			_promise.trigger = {resolve: _resolve, reject: _reject};
		}
		else {
			setTimeout(()=>{
				Promise.resolve(callback()).then(_resolve).catch(_reject);
			}, 0);
		}
		
		return _promise;
	}
	get pool() {
		const {_cb_pool} = _WEAK_REL_MAP.get(this);
		const _pool = [];
		for( let idx in _cb_pool ) {
			if ( !_cb_pool.hasOwnProperty(idx) ) continue;
			_pool.push(_cb_pool[idx]);
		}
		return _pool;
	}
}



const UID_MAP = '0123456789ABCDEFGHIJKLMNOPQRSTUV'.split('');
function __UNIQUE_ID() {
	const inputData = new Uint8Array(16);
	for ( let i=0; i<16; i++ ) {
		inputData[i] = (Math.random() * 256)|0;
	}
	
	// Run complete bundles
	let encoded = '';
	for (let run = 0; run < 3; run++ ) {
		let begin = run * 5;
		encoded += UID_MAP[  inputData[begin]           >> 3];								// 0
		encoded += UID_MAP[ (inputData[begin  ] & 0x07) << 2 | (inputData[begin+1] >> 6)];	// 1
		encoded += UID_MAP[ (inputData[begin+1] & 0x3E) >> 1];								// 2
		encoded += UID_MAP[ (inputData[begin+1] & 0x01) << 4 | (inputData[begin+2] >> 4)];	// 3
		encoded += UID_MAP[ (inputData[begin+2] & 0x0F) << 1 | (inputData[begin+3] >> 7)];	// 4
		encoded += UID_MAP[ (inputData[begin+3] & 0x7C) >> 2];								// 5
		encoded += UID_MAP[ (inputData[begin+3] & 0x03) << 3 | (inputData[begin+4] >> 5)];	// 6
		encoded += UID_MAP[  inputData[begin+4] & 0x1F];									// 7
	}
	encoded += UID_MAP[  inputData[15]           >> 3];
	encoded += UID_MAP[ (inputData[16] & 0x07) << 2];
	
	return encoded;
}
