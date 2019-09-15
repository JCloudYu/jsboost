/**
*	Author: JCloudYu
*	Create: 2018/12/08
**/
import {FlattenedPromise, ThrottledTimeout} from "./_helper.esm.js";



const PRIVATE = new WeakMap();
export class ThrottledQueue {
	constructor() {
		PRIVATE.set(this, {
			_timeout: ThrottledTimeout(),
			_queue: []
		});
		
		this.consumer = null;
	}
	get length() {
		return PRIVATE.get(this)._queue.length;
	}
	enqueue(job) {
		___ENQUEUE_JOB.call(this, {job});
		return this;
	}
	enqueueAwait(job) {
		const state_ctrl = FlattenedPromise();
		___ENQUEUE_JOB.call(this, {job, state:state_ctrl});
		
		return state_ctrl.promise;
	}
	push(job=null, awaitable=true) {
		console.error( "ThrottledQueue::push is deprecated!\nPlease use ThrottledQueue::enqueue or ThrottledQueue::enqueueAwait instead!" );
		return awaitable ? this.enqueueAwait(job) : this.enqueue(job);
	}
	static CreateQueueWithConsumer(consumer) {
		console.error( "ThrottledQueue.CreateQueueWithConsumer is deprecated!\nPlease use ThrottledQueue.CreateQueue instead!" );
		return ThrottledQueue.CreateQueue(consumer);
	}
	static CreateQueue(consumer) {
		const queue = new ThrottledQueue();
		queue.consumer = consumer;
		return queue;
	}
}
function ___ENQUEUE_JOB(job_item) {
	const {_queue, _timeout} = PRIVATE.get(this);
	
	_queue.push(job_item);
	_timeout(___CONSUME_QUEUE, 0, this);
}
function ___CONSUME_QUEUE(inst) {
	if ( typeof inst.consumer !== "function" ) return;
	
	
	
	const {_queue, _timeout} = PRIVATE.get(inst);
	return Promise.resolve()
	.then(()=>inst.consumer(_queue))
	.then((should_continue)=>{
		if ( should_continue !== false && _queue.length > 0 ) {
			_timeout(___CONSUME_QUEUE, 0 , inst);
		}
	});
}
