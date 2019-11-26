/**
 * Author: JCloudYu
 * Create: 2018/09/20
**/
const WEAK_RELATION_MAP = new WeakMap();
export class DOMEventEmitter {
	constructor() {
		const PRIVATES = {};
		WEAK_RELATION_MAP.set(this, PRIVATES);
		PRIVATES._event_queue = [];
	}
	
	/**
	 * Add a listener to a specific event
	 *
	 * @param {string} eventName The event the listener will listen to
	 * @param {function} listener The listener
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	addEventListener(eventName, listener) {
		if ( typeof listener !== "function" ) {
			throw new TypeError( "Given listener should be a function" );
		}
	
		eventName = ('' + eventName).trim();
		const comment_splitter = eventName.indexOf('#');
		if ( comment_splitter >= 0 ) {
			eventName = eventName.substring(0, comment_splitter);
		}
		
		if ( eventName === '' ) {
			throw new SyntaxError( "Given event name must be a none-empty string!" );
		}
		
		
		
		const {_event_queue} = WEAK_RELATION_MAP.get(this);
		const queue = _event_queue[eventName] = _event_queue[eventName]||[];
		queue.push(listener);
		
		return this;
	}
	
	/**
	 * Add a listener to a specific event
	 *
	 * @param {string} eventName The event the listener will listen to
	 * @param {function} listener The listener
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	addListener(eventName, listener) {
		return this.addEventListener(eventName, listener);
	}
	
	/**
	 * Add a listener to a specific event
	 *
	 * @param {string} events A comma separated event name list the listener will listen on
	 * @param {function} listener The listener to be added
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	on(events, listener) {
		let eventNames = `${events}`.trim();
		if ( eventNames.length > 0 ) {
			eventNames = eventNames.split( ',' );
			for( let eventName of eventNames ) {
				this.addEventListener(eventName.trim(), listener);
			}
		}
		
		return this;
	}
	
	/**
	 * Add a listener that will be invoked only once to a specific event.
	 * Note1: The listener registered with once cannot be removed by off, removeListener or removeAllListeners.
	 * Note1: The listener registered with once cannot be removed by off, removeListener or removeAllListeners.
	 * Note2: Once only accept on event name at a time, only the first event name in a comma separated event list will be registered
	 *
	 * @param {string} eventName The single event name the listener will listen on
	 * @param {function} listener The listener to be added
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	once(eventName, listener) {
		let eventNames = `${eventName}`.trim();
		if ( eventNames.length > 0 ) {
			([eventName] = eventNames.split( ',' ));
		}
	
		return this.addListener(eventName, __ONCE_WRAPPER(this, eventName, listener));
	}
	
	/**
	 * Remove a listener from a specific event
	 *
	 * @param {string} eventName The event where the listener locates
	 * @param {function} listener The target listener to be removed
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	removeEventListener(eventName, listener) {
		const {_event_queue} = WEAK_RELATION_MAP.get(this);
		const name = eventName.toString();
		const queue = _event_queue[name];
		if ( queue ) {
			let index;
			while( (index = queue.indexOf(listener)) >= 0 ) {
				queue.splice(index, 1);
			}
		}
		
		return this;
	}
	
	/**
	 * Remove a listener from a specific event
	 *
	 * @param {string} eventName The event where the listener locates
	 * @param {function} listener The target listener to be removed
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	removeListener(eventName, listener) {
		return this.removeEventListener(eventName, listener);
	}
	
	/**
	 * Remove all the specific event's listeners.
	 *
	 * @param {string} eventName The event to remove
	 * @returns {DOMEventEmitter}
	**/
	removeAllListeners(eventName) {
		const PRIVATES = WEAK_RELATION_MAP.get(this);
		const name = eventName.toString();
		delete PRIVATES._event_queue[name];
		
		return this;
	}
	
	/**
	 * Remove a listener from a specific event
	 *
	 * @param {string} events A comma separated event name list where the listener locates
	 * @param {function} listener The target listener to be removed
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	off(events, listener) {
		let eventNames = `${events}`.trim();
		if ( eventNames.length === 0 ) {
			return this;
		}
		
		eventNames = eventNames.split( ',' );
		if ( arguments.length === 1 ) {
			for( let eventName of eventNames ) {
				this.removeAllListeners(eventName.trim());
			}
			
			return this;
		}
	
		for( let eventName of eventNames ) {
			this.removeEventListener(eventName.trim(), listener);
		}
		return this;
	}
	
	/**
	 * Dispatch events without waiting promises.
	 *
	 * @param {String|Object} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {DOMEventEmitter}
	**/
	dispatchEvent(eventName, ...args) {
		__DISPATCH_EVENT.call(this, eventName, ...args)
		.catch((e)=>{
			if ( e instanceof Error ) {
				e._stack_trace = e.stack.split(/\r\n|\n/).map((item)=>item.trim());
			}
			
			setTimeout(()=>{throw e});
		});
		
		return this;
	}
	
	/**
	 * Promise aware event dispatching.
	 *
	 * @async
	 * @param {String|Object} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {Promise<DOMEventEmitter>}
	**/
	dispatchEventAwait(eventName, ...args) {
		return __DISPATCH_EVENT.call(this, eventName, ...args)
		.then(()=>this);
	}
	
	/**
	 * Dispatch an event. Note that if handlePromise property is set to true, this function will return a promise or undefined otherwise.
	 *
	 * @param {String|Object} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {DOMEventEmitter}
	**/
	emit(eventName, ...args) {
		return this.dispatchEvent(eventName, ...args);
	}
	
	/**
	 * Dispatch an event. Note that if handlePromise property is set to true, this function will return a promise or undefined otherwise.
	 *
	 * @async
	 * @param {String|Object} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {Promise<DOMEventEmitter>}
	**/
	emitAwait(eventName, ...args) {
		return this.dispatchEventAwait(eventName, ...args);
	}
	
	
	
	
	/**
	 * Retrieve a copy of specific event's listener queue
	 *
	 * @param {string} eventName The specific event name
	 * @returns {function[]} The listener queue
	**/
	listeners(eventName) {
		const {_event_queue} = WEAK_RELATION_MAP.get(this);
		const name = eventName.toString();
		return (_event_queue[name]||[]).slice(0);
	}
	
	/**
	 * Retrieve the registered event names
	 *
	 * @property-read {string[]} events
	**/
	get events() {
		const {_event_queue} = WEAK_RELATION_MAP.get(this);
		const _events = [];
		for( let name in _event_queue ) {
			if ( !_event_queue.hasOwnProperty(name) )  continue;
			if ( _event_queue[name].length === 0 ) continue;
			_events.push(name);
		}
		return _events;
	}
	set events(val) { throw new TypeError("Cannot assign to read only property 'events' of <DOMEventEmitter>"); }
}



// region [ Helper functions ]
async function __DISPATCH_EVENT(eventName, ...args) {
	const event = __PREPARE_EVENT(eventName);
	if ( !event ) return;
	
	
	
	const {_event_queue} = WEAK_RELATION_MAP.get(this);
	const name = event.type;
	const queue = _event_queue[name];
	if ( !Array.isArray(queue) ) { return this; }
	
	
	
	for( let func of queue ) {
		await func.call(this, event, ...args);
		if ( !event.propagation ) { break; }
	}
}
function __ONCE_WRAPPER(emitter, eventName, listener) {
	if ( typeof listener !== "function" ) {
		throw new TypeError( "Given listener should be a function" );
	}

	const once = function(...args) {
		const {_event_queue, _handle_promise} = WEAK_RELATION_MAP.get(this);
		const name = eventName.toString();
		const queue = _event_queue[name] = _event_queue[name]||[];
		
		let index = queue.indexOf(once);
		if ( !_handle_promise ) {
			listener.call(emitter, ...args);
			
			if ( index >= 0 ) {
				queue.splice(index, 1);
			}
			
			return;
		}
		
		return Promise.resolve(listener.call(emitter, ...args))
		.then(()=>{
			if ( index >= 0 ) {
				queue.splice(index, 1);
			}
		});
	};
	return once;
}
function __PREPARE_EVENT(eventInfo) {
	let _event, _info;
	if ( Object(eventInfo) === eventInfo ) {
		_event = eventInfo.event;
		_info = Object.assign({}, eventInfo);
		delete _info.event;
	}
	else {
		_event = eventInfo;
		_info = {};
	}
	
	if ( !_event ) { return null; }
	
	
	
	let _KEEP_PROPAGATING = true;
	Object.defineProperties(_info, {
		type:{value:`${_event}`, enumerable:true},
		timestamp:{value:Date.now(), enumerable:true},
		propagation:{
			get:()=>_KEEP_PROPAGATING,
			set:(val)=>{_KEEP_PROPAGATING = !!val;},
			enumerable:true
		}
	});
	return _info;
}
// endregion
