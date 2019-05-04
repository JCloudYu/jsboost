/**
*	Author: JCloudYu
*	Create: 2018/12/08
**/
import {FlattenedPromise as PassivePromise, ThrottledTimeout} from "./native-extension.esm.js";



const _ThrottledQueue = new WeakMap();
export class ThrottledQueue {
	constructor() {
		_ThrottledQueue.set(this, {
			_timeout: ThrottledTimeout(),
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
	 * @param {boolean} [awaitable=true]
	 * @return {Promise<*>|null};
	**/
	push(info=null, awaitable=true) {
		const {_queue, _timeout} = _ThrottledQueue.get(this);
		const item = {info, ctrl:false};
		
		_queue.push(item);
		_timeout(___CONSUME_QUEUE, 0, this);
		
		if ( awaitable ) {
			item.ctrl = PassivePromise();
			return item.ctrl.promise;
		}
		
		return null;
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
async function ___CONSUME_QUEUE(inst) {
	if ( typeof inst.consumer !== "function" ) return;
	
	
	
	const {_queue, _timeout} = _ThrottledQueue.get(inst);
	let should_continue = await inst.consumer(_queue);
	if ( should_continue === false ) return;
	if ( _queue.length <= 0 ) return;

	_timeout(___CONSUME_QUEUE, 0 , inst);
}
