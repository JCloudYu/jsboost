/**
 *	Author: JCloudYu
 *	Create: 2018/11/16
**/
const DEFAULT_STATE_INFO = [ ___FIN_ERROR, {} ];
export function StateMachineCreate(states={}, initial_state=null) {
	const _state_map = {};
	const _state_names = Object.keys(states);
	if ( _state_names.length <= 0 ) {
		throw new RangeError( "Given state descriptor contains no states!" );
	}
	for( let state_name of _state_names ) {
		let state_callback = states[state_name];
		if ( typeof state_callback !== "function" ) {
			throw new RangeError( "State processor must be a function!" );
		}
		
		_state_map[state_name] = [state_callback, {}];
	}
	
	let _current_state = initial_state || _state_names[0];
	let _current_state_info = _state_map[_current_state];
	const _state_instance = {
		get state() {
			return _current_state;
		},
		set state(state) {
			if ( _current_state === 'fin' ) {
				throw new RangeError( `The machine is finished!!` );
			}
		
			if ( state !== 'fin' ) {
				let info = _state_map[state];
				if ( !info ) {
					throw new RangeError( `Given state ${state} is invalid!` );
				}
				
				_current_state = state;
				_current_state_info = info;
			}
			else {
				_current_state = 'fin';
				_current_state_info = DEFAULT_STATE_INFO;
			}
		}
	};
	
	const _state_exec = function(...args){
		_state_instance.storage = _current_state_info[1];
		return _current_state_info[0].call(_state_instance, ...args);
	};
	Object.defineProperties(_state_exec, {
		reset:{
			value:(state)=>{
				let info = _state_map[state];
				if ( !info ) {
					throw new RangeError( `Cannot reset state to ${state}!` );
				}
				
				for( let state_name in _state_map ) {
					if ( !_state_map.hasOwnProperty(state_name) ) continue;
					_state_map[state_name][1] = {};
				}
				
				_current_state = state;
				_current_state_info = info;
			}, enumerable:true
		},
		state:{
			get:()=>_current_state,
			set:(val)=>{_state_instance.state = val;},
			enumerable:true, configurable:false
		},
		finished: {
			get:()=>_current_state==='fin', enumerable:true, configurable:false
		}
	});
	
	return _state_exec;
}



function ___FIN_ERROR(){ throw new Error( `The machine is finished!` ) }
