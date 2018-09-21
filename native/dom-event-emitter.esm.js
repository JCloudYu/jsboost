/**
 * Author: JCloudYu
 * Create: 2018/09/20
**/
const VERSION = "1.0.0";
const WEAK_RELATION_MAP = new WeakMap();
export class DOMEventEmitter {
	constructor() {
		const PRIVATES = {};
		WEAK_RELATION_MAP.set(this, PRIVATES);
		PRIVATES._event_queue = [];
	}
	
	// region [ API Methods ]
	/**
	 * Add a listener to a specific event
	 *
	 * @param {string} eventName The event the listener will listen to
	 * @param {function} listener The listener
	 * @returns {DOMEventEmitter} Return the emitter instance for chaining
	**/
	addListener(eventName, listener) {
		if ( typeof listener !== "function" ) {
			throw new TypeError( "Given listener should be a function" );
		}
	
		const {_event_queue} = WEAK_RELATION_MAP.get(this);
		const name = eventName.toString();
		const queue = _event_queue[name] = _event_queue[name]||[];
		queue.push(listener);
		
		return this;
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
				this.addListener(eventName.trim(), listener);
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
	removeListener(eventName, listener) {
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
			this.removeListener(eventName.trim(), listener);
		}
		return this;
	}
	
	/**
	 * Dispatch events without waiting promises.
	 *
	 * @param {string} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {DOMEventEmitter}
	**/
	dispatch(eventName, ...args) {
		const {_event_queue} = WEAK_RELATION_MAP.get(this);
		const name = eventName.toString();
		const eventId = __UNIQUE_ID();
		const queue = _event_queue[name];
		if ( Array.isArray(queue) ) {
			let keepPropagating = true;
			
			const event = {};
			Object.defineProperties(event, {
				_id:{value:eventId, enumerable:true},
				type:{value:name, enumerable:true},
				timestamp:{value:Date.now(), enumerable:true},
				stopPropagation:{value:()=>{keepPropagating = false;}, enumerable:true}
			});
		
			for( let func of queue ) {
				func.call(this, event, ...args);
				if ( !keepPropagating ) { break; }
			}
		}
		
		return this;
	}
	
	/**
	 * Promise aware event dispatching.
	 *
	 * @async
	 * @param {string} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {Promise<DOMEventEmitter>}
	**/
	async dispatchAwait(eventName, ...args) {
		const {_event_queue} = WEAK_RELATION_MAP.get(this);
		const name = eventName.toString();
		const eventId = __UNIQUE_ID();
		const queue = _event_queue[name];
		if ( Array.isArray(queue) ) {
			let keepPropagating = true;
			
			const event ={};
			Object.defineProperties(event, {
				_id:{value:eventId, enumerable:true},
				type:{value:name, enumerable:true},
				timestamp:{value:Date.now(), enumerable:true},
				stopPropagation:{value:()=>{keepPropagating = false;}, enumerable:true}
			});
		
			for( let func of queue ) {
				await func.call(this, event, ...args);
				if ( !keepPropagating ) { break; }
			}
		}
		
		return this;
	}
	
	/**
	 * Dispatch an event. Note that if handlePromise property is set to true, this function will return a promise or undefined otherwise.
	 *
	 * @param {string} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {DOMEventEmitter}
	**/
	emit(eventName, ...args) {
		return this.dispatch(eventName, ...args);
	}
	
	/**
	 * Dispatch an event. Note that if handlePromise property is set to true, this function will return a promise or undefined otherwise.
	 *
	 * @async
	 * @param {string} eventName The name of event to be emitted
	 * @param {...*} args The arguments that are passed to the listeners
	 * @returns {Promise<DOMEventEmitter>}
	**/
	emitAwait(eventName, ...args) {
		return this.dispatchAwait(eventName, ...args);
	}
	// endregion
	
	// region [ Getters and setters ]
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
	
	
	/**
	 * Retrieve the version of DOMEventEmitter
	 *
	 * @property-read {string[]} events
	**/
	static get version() { return VERSION; }
	static set version(val) { throw new TypeError("Cannot assign to read only property 'version' of <DOMEventEmitter>"); }
	// endregion
}



// region [ Helper functions ]
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
// endregion
