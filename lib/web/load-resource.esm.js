/**
 *	Author: JCloudYu
 *	Create: 2019/01/06
**/
import {TypeOf} from "../ext-object.esm.js";
import {WaitAll} from "../ext-promise.esm.js";
import {RSID} from "./random-string-id.esm.js";



export async function LoadResources(...args) {
	if ( Array.isArray(args[0]) ) { args = args[0]; }
	
	
	
	const _promises = [];
	for(const resource of args) {
		const TAG_ID = RSID(25, '_');
		let injectBody = true;
		
		let type, path, important;
		if ( typeof resource === 'string' ) {
			([type, path, important] = ['js', resource, true]);
		}
		else {
			({type, path, important} = resource);
		}
		
		
		
		// region [ Prepare basic loading promise ]
		const R_PROMISE = new Promise((resolve, reject)=>{
			let element;
			switch( type ) {
				case "css": {
					injectBody = false;
				
					element = document.createElement( 'link' );
					element.rel	 = "stylesheet";
					element.type = "text/css";
					element.href = path;
					
					element.onload = resolve;
					element.onerror = reject;
					break;
				}
				case "js": {
					element = document.createElement( 'script' );
					element.type = "application/javascript";
					element.src = path;
					
					element.onload = resolve;
					element.onerror = reject;
					break;
				}
				case "html": {
					element = document.createElement( 'script' );
					element.type = "text/html";
					
					fetch( path, {
						method:'get',
						credentials:"same-origin",
						cache:"no-cache"
					}).then((res)=>{
						return res.text().then((ctnt)=>{
							element.innerHTML = ctnt;
							resolve();
						});
					}, reject);
					break;
				}
				case "img": {
					element = new Image();
					element.src = path;
					element.style.display='none';
					
					element.onload = resolve;
					element.onerror = reject;
					break;
				}
				default: {
					return reject(new TypeError( `Given resource type ${type} is not supported!` ));
				}
			}
			
			element.setAttribute( 'data-important', important ? "1" : "0" );
			element.id = TAG_ID;
			document.querySelector(injectBody ? 'body' : 'head').appendChild(element);
		});
		// endregion
	
	
		// region [ Register promise ]
		_promises.push(R_PROMISE.then(
			()=>{ return TAG_ID; },
			(e)=>{
				return (important) ? Promise.reject(e) : null;
			}
		));
		// endregion
	}

	return WaitAll(_promises)
	.then((statuses)=>{
		const results = [];
		for(let status of statuses) {
			results.push({loaded:true, result:status.result});
		}
		
		return results;
	})
	.catch((statuses)=>{
		const results = [];
		for(let status of statuses) {
			results.push(
				status.resolved ?
					{loaded:true, result:status.result} :
					{loaded:false, result:status.result}
			);
		}
		
		return Promise.reject(results);
	});
}
export async function BatchResources(...args) {
	if ( Array.isArray(args[0]) ) { args = args[0]; }
	
	const RESOURCE_BATCH = [];
	const BATCH_RESULTS	 = [];
	let _previous_exec_result = null;
	
	
	
	for ( const arg of args ) {
		const arg_type = TypeOf(arg);
		if ( arg_type === "string" || arg_type === "object" ) {
			RESOURCE_BATCH.push(arg);
			continue;
		}
		
		if ( RESOURCE_BATCH.length > 0 ) {
			_previous_exec_result = null;
			const results = await LoadResources(RESOURCE_BATCH);
			for( let result of results ) {
				BATCH_RESULTS.push(result);
			}
			
			RESOURCE_BATCH.splice(0);
		}
		
		if ( arg_type === "function" ) {
			_previous_exec_result = await arg(_previous_exec_result);
			BATCH_RESULTS.push(arg);
		}
		else {
			BATCH_RESULTS.push(null);
		}
	}
	
	if ( RESOURCE_BATCH.length > 0 ) {
		_previous_exec_result = null;
		try {
			const results = await LoadResources(RESOURCE_BATCH);
			for( let result of results ) {
				BATCH_RESULTS.push(result);
			}
		}
		catch(results) {
			for( let result of results ) {
				BATCH_RESULTS.push(result);
			}
			throw BATCH_RESULTS;
		}
	}
	
	
	
	return BATCH_RESULTS;
}
