/**
 *	Author: JCloudYu
 *	Create: 2019/01/06
**/
import {PromiseWaitAll as WaitAll, TypeOf} from "../_helper.esm.js";
import {UniqueId} from "../unique-id.esm.js";
import {ModuleImport} from "./module-import.esm.js";



const RES_TYPE = {
	CSS: 1,
	HTML: 2,
	HTML_TEMPLATE:3,
	JS: 4,
	SHADOWED_JS: 5,
	ES_MODULE: 6,
	IMAGE: 7
};

export async function LoadResource(...args) {
	if ( Array.isArray(args[0]) ) { args = args[0]; }
	
	
	
	const _promises = [];
	for(const resource of args) {
		const RES_ID = '_' + (new UniqueId()).toString('base32');
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
					
					element.onload  = ()=>resolve({type:RES_TYPE.CSS, result:element});
					element.onerror = reject;
					break;
				}
				case "module": {
					ModuleImport(path, reference)
					.then((imported)=>resolve({type:RES_TYPE.ES_MODULE, result:imported}))
					.catch(reject);
					break;
				}
				case "js": {
					if ( type[1] !== "shadow" ) {
						element = document.createElement( 'script' );
						element.type = "application/javascript";
						element.src = path;
						
						element.onload = ()=>resolve({type:RES_TYPE.JS, result:element});
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
								resolve({type:RES_TYPE.SHADOWED_JS, result:func(...invoke_args)});
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
								resolve({type:RES_TYPE.HTML_TEMPLATE, result:func})
							}
							else {
								element.innerHTML = ctnt;
								resolve({type:RES_TYPE.HTML, result:element});
							}
						});
					}, reject);
					break;
				}
				case "img": {
					element = new Image();
					element.src = path;
					element.style.display='none';
					
					element.onload	= ()=>resolve({type:RES_TYPE.IMAGE, result:element});
					element.onerror = reject;
					break;
				}
				default: {
					return reject(new TypeError( `Given resource type ${type[0]} is not supported!` ));
				}
			}
			
			if ( element ) {
				element.setAttribute( 'data-important', important ? "1" : "0" );
				element.id = RES_ID;
				document.querySelector(injectBody ? 'body' : 'head').appendChild(element);
			}
		});
		// endregion
	
	
		// region [ Register promise ]
		_promises.push(R_PROMISE.then(
			({type:res_type, result})=>{
				const ret_val = {
					loaded:true,
					id:RES_ID
				};
			
				switch(res_type) {
					case RES_TYPE.HTML:
					case RES_TYPE.JS:
					case RES_TYPE.IMAGE:
					case RES_TYPE.CSS:
						Object.assign(ret_val, {
							element: result,
							result: RES_ID
						});
						break;
					
					case RES_TYPE.SHADOWED_JS:
						Object.assign(ret_val, {
							result
						});
						break;
					
					case RES_TYPE.ES_MODULE:
						Object.assign(ret_val, {
							exports: result,
							result
						});
						break;
					
					case RES_TYPE.HTML_TEMPLATE:
						Object.assign(ret_val, {
							tmpl: result,
							result
						});
						break;
				}
				
				return ret_val;
			},
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
			const results = await LoadResource(RESOURCE_BATCH);
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
			const results = await LoadResource(RESOURCE_BATCH);
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
