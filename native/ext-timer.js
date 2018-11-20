/**
 *	Author: JCloudYu
 *	Create: 2018/11/19
**/
((exports)=>{
	"use strict";
	
	exports.SingletonTimeout=()=>{
		let hTimeout = null;
		const timeout_cb = (cb, delay=0, ...args)=>{
			if ( hTimeout ) { clearTimeout(hTimeout); }
			hTimeout = setTimeout(()=>{
				cb(...args); hTimeout=null;
			}, delay);
		};
		timeout_cb.clear=()=>{
			if ( hTimeout ) {
				clearTimeout(hTimeout);
				hTimeout = null;
			}
		};
		
		return timeout_cb;
	};
	exports.SingletonInterval=()=>{
		let hTimeout = null;
		const timeout_cb = (cb, interval=0, ...args)=>{
			if ( hTimeout ) { clearTimeout(hTimeout); }
			
			hTimeout = setTimeout(___DO_TIMEOUT, interval);
			async function ___DO_TIMEOUT() {
				await cb(...args);
				hTimeout = setTimeout(___DO_TIMEOUT, interval);
			}
		};
		
		timeout_cb.clear=()=>{
			if ( hTimeout ) {
				clearTimeout(hTimeout);
				hTimeout = null;
			}
		};
		return timeout_cb;
	};
	
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));
