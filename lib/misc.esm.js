/**
 *	Author: JCloudYu
 *	Create: 2019/01/06
**/
import {WaitAll} from "./ext-promise.esm.js";


const ID_MAP = "0123456789abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY";
export function RSID(length=25) {
	let id = '';
	while( length-- > 0 ) {
		const selection = Math.floor(Math.random() * ID_MAP.length);
		id += ID_MAP[selection];
	}
	return id;
}



export function LoadResources(...args) {
	if ( Array.isArray(args[0]) ) { args = args[0]; }
	
	
	
	const _promises = [];
	for(const resource of args) {
		const TAG_ID = RSID();
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

	return WaitAll(_promises);
}
