/**
 *	Author: JCloudYu
 *	Create: 2018/11/19
**/
((exports)=>{
	"use strict";
	
	exports.SingletonTimeout  = SingletonTimeout;
	exports.SingletonInterval = SingletonInterval;
	
	function SingletonTimeout() {
		let _scheduled	= null;
		let _executing	= false;
		let _hTimeout	= null;
		const timeout_cb = (cb, delay=0, ...args)=>{
			_scheduled = {cb, delay, args};
			
			if ( _executing ) return;
			
			
			if ( _hTimeout ) {
				clearTimeout(_hTimeout);
				_hTimeout = null;
			}
			__DO_TIMEOUT();
		};
		timeout_cb.clear=()=>{
			_scheduled = null;
			if ( _hTimeout ) {
				clearTimeout(_hTimeout);
				_hTimeout = null;
			}
		};
		return timeout_cb;
		
		
		
		function __DO_TIMEOUT() {
			if ( !_scheduled ) return;
		
			let {cb, delay, args} = _scheduled;
			_hTimeout = setTimeout(()=>{
				_executing = true;
				
				Promise.resolve(cb(...args))
				.then(
					()=>{
						_executing = false;
						_hTimeout = null;
						
						__DO_TIMEOUT();
					},
					(e)=>{
						_executing	= false;
						_hTimeout	= null;
						_scheduled	= null;
						
						throw e;
					}
				);
			}, delay);
			_scheduled = null;
		}
	}
	function SingletonInterval() {
		const _timeout = SingletonTimeout();
		const timeout_cb = (cb, interval=0, ...args)=>{
			const ___DO_TIMEOUT=()=>{
				_timeout(___DO_TIMEOUT, interval);
				
				Promise.resolve(cb(...args))
				.catch((e)=>{
					_timeout.clear();
					throw e;
				});
			};
			_timeout(___DO_TIMEOUT, interval, ...args);
		};
		timeout_cb.clear=()=>{
			_timeout.clear();
		};
		return timeout_cb;
	}
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));
