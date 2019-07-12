/**
 *	Author: JCloudYu
 *	Create: 2019/01/06
**/
import {PromiseWaitAll as WaitAll, TypeOf} from "../_helper.esm.js";
import {RSID} from "./random-string-id.esm.js";
import {ModuleImport} from "./load-module.esm.js"



export async function LoadResources(...args) {
	if ( Array.isArray(args[0]) ) { args = args[0]; }
	
	
	
	const _promises = [];
	for(const resource of args) {
		const TAG_ID = RSID(25, '_');
		let injectBody = true;
		
		let type, path, important, shadow, reference;
		if ( typeof resource === 'string' ) {
			([type, path, important, shadow, reference] = ['js', resource, true, {}, null]);
		}
		else {
			({type, path, important, shadow={}, ref:reference=null} = resource);
		}
		
		
		type = type.trim().split(' ');
		
		// region [ Prepare basic loading promise ]
		const R_PROMISE = new Promise((resolve, reject)=>{
			let element = null;
			switch( type[0] ) {
				case "css": {
					injectBody = false;
				
					element = document.createElement( 'link' );
					element.rel	 = "stylesheet";
					element.type = "text/css";
					element.href = path;
					
					element.onload  = ()=>{resolve();};
					element.onerror = reject;
					break;
				}
				case "module": {
					ModuleImport(path, reference).then(resolve).catch(reject);
					break;
				}
				case "js": {
					if ( type[1] !== "shadow" ) {
						element = document.createElement( 'script' );
						element.type = "application/javascript";
						element.src = path;
						
						element.onload = ()=>{resolve();};
						element.onerror = reject;
					}
					else {
						fetch( path, {
							method:'get',
							credentials:"same-origin",
							cache:"no-cache"
						}).then((res)=>{
							return res.text().then((ctnt)=>{
								const arg_names = [];
								const invoke_args = [];
								for(const var_name in shadow) {
									if ( !shadow.hasOwnProperty(var_name) ) continue;
									arg_names.push(var_name);
									invoke_args.push(shadow[var_name]);
								}
								arg_names.push(ctnt);
								
								const func = new Function(...arg_names);
								resolve(func(...invoke_args));
							});
						}, reject);
					}
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
							if ( type[1] === "exp-template" ) {
								const arg_names = [];
								arg_names.push('data');
								arg_names.push(`return \`${ctnt}\``);

								const func = new Function(...arg_names);
								resolve(func);
							}
							else {
								element.innerHTML = ctnt;
								resolve();
							}
						});
					}, reject);
					break;
				}
				case "img": {
					element = new Image();
					element.src = path;
					element.style.display='none';
					
					element.onload	= ()=>{resolve();};
					element.onerror = reject;
					break;
				}
				default: {
					return reject(new TypeError( `Given resource type ${type[0]} is not supported!` ));
				}
			}
			
			if ( element ) {
				element.setAttribute( 'data-important', important ? "1" : "0" );
				element.id = TAG_ID;
				document.querySelector(injectBody ? 'body' : 'head').appendChild(element);
			}
		});
		// endregion
	
	
		// region [ Register promise ]
		_promises.push(R_PROMISE.then(
			(result)=>{ return {loaded:true, result:result||TAG_ID} },
			(e)=>{
				const result = {loaded:false, result:e};
				return (important) ? Promise.reject(result) : result;
			}
		));
		// endregion
	}

	return WaitAll(_promises)
	.then((statuses)=>{
		const results = [];
		for(let status of statuses) {
			results.push(status.result);
		}
		
		return results;
	})
	.catch((statuses)=>{
		const results = [];
		for(let status of statuses) {
			results.push(status.result);
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
