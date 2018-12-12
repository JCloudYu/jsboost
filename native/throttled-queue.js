/**
 *	Author: JCloudYu
 *	Create: 2018/12/08
**/
((exports)=>{
	"use strict";
	
	const {SingletonTimeout} = require( './ext-timer' );
	const {PassivePromise}	 = require( './ext-promise' );
	
	const _ThrottledQueue = new WeakMap();
	class ThrottledQueue {
		constructor() {
			_ThrottledQueue.set(this, {
				_timeout: SingletonTimeout(),
				_queue: []
			});
			
			this.consumer = null;
		}
		
		/** @type {Number} */
		get length() {
			return _ThrottledQueue.get(this)._queue.length;
		}
		
		/**
		 * Create
		 * @param {*} info
		 * @return Promise<*>;
		**/
		push(info=null) {
			const {_queue, _timeout} = _ThrottledQueue.get(this);
			const promise = PassivePromise();
			const item = {info, ctrl:promise};
			_queue.push(item);
			
			_timeout(___CONSUME_QUEUE, 0, this);
			return promise.promise;
		}
		
		/**
		 * Create a ThrottledQueue object with default consumer api
		 *
		 * @param {function(*[]):Promise<Boolean>} consumer
		 * @returns {ThrottledQueue}
		**/
		static CreateQueueWithConsumer(consumer) {
			const queue = new ThrottledQueue();
			queue.consumer = consumer;
			return queue;
		}
	}
	exports.ThrottledQueue = ThrottledQueue;
	
	
	
	
	
	
	async function ___CONSUME_QUEUE(inst) {
		if ( typeof inst.consumer !== "function" ) return;
		
		
		
		const {_queue, _timeout} = _ThrottledQueue.get(inst);
		let should_continue = await inst.consumer(_queue);
		if ( should_continue === false ) return;
		if ( _queue.length <= 0 ) return;
	
		_timeout(___CONSUME_QUEUE, 0 , inst);
	}
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));
