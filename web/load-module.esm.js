/**
 *	Author: JCloudYu
 *	Create: 2019/02/17
**/
import {RSID} from "./random-string-id.esm.js";



/**
 * Load ES Module from specific address.
 * ( Note that the url will be resolved to the path where the html locates!
 *   It will not behave like what normal es modules do! )
 *
 * @param {String} module_url The path of the target module
 * @param {String|null|{
 *	  ref_path:String=null,
 *	  cross_origin:boolean=false,
 *	  use_credentials:boolean=false
 * }} options The option the controls over the behaviors when acquiring modules
 * @return {Promise<*>}
 * @constructor
**/
export function ModuleImport(module_url, options={ref_path:null, cross_origin:false, use_credentials:false}) {
	return new Promise((resolve, reject)=>{
		let _ref_path;
		if ( Object(options) === options ) {
			_ref_path = options.ref_path || null;
		}
		else {
			_ref_path = options;
			options = {cross_origin:false, use_credentials:false};
		}
	
	
	
		const ref_path = _ref_path;
		const abs_url = ref_path ? RESOLVE_PARENT_PATH(module_url, ref_path) : TO_ABSOLUTE_URL(module_url);
		const abs_dir = abs_url.substring(0, abs_url.lastIndexOf('/'));
		const inject_point = RSID(10, '_');
		const element = document.createElement( 'script' );
		const destruct=()=>{
			delete window[inject_point];
			element.onerror = null;
			element.onload = null;
			element.remove();
			URL.revokeObjectURL(element.src);
			element.src = "";
		};
		
		
		
		if ( options.cross_origin || options.use_credentials ) {
			element.setAttribute( 'crossorigin', options.use_credentials ? 'use-credentials' : '' );
		}
		
		element.defer = true;
		element.type = "module";
		element.onload=()=>{
			resolve(window[inject_point]);
			destruct();
		};
		element.onerror=(e)=>{
			reject(e);
			destruct();
		};
		element.src = URL.createObjectURL(new Blob([
`import * as m from "${abs_url}";
if ( Object(m) === m && typeof m._meta !== "undefined" ) {
    m._meta.__filename = "${abs_url}";
    m._meta.__dirname  = "${abs_dir}";
}
window.${inject_point} = m;
`
], {type:'application/javascript'}));
		
		document.querySelector( 'body' ).appendChild(element);
	});
}



const A_TAG = document.createElement( "a" );
function TO_ABSOLUTE_URL(url) {
	A_TAG.setAttribute( "href", url );	//	<a href="xxx.html">
	return A_TAG.cloneNode(false).href;	//		-> "http://example.com/xxx.html"
}
function RESOLVE_PARENT_PATH(module_url, ref_path) {
	// NOTE: Detect if module_url is absolute
	try { new URL(module_url); return module_url; } catch(e) {}

	// NOTE: Detect if ref_path is absolute
	try { ref_path = new URL(ref_path); }
	catch(e) { throw new Error( "Given ref_path must be a complete url!" ); }
	
	
	
	// NOTE: If module_url contains a root path
	if ( module_url[0] === "/" ) { // module_path: /a/b/c/d
		return `${ref_path.origin}${module_url}`;
	}
	
	// NOTE: Resolve path
	const pos = ref_path.pathname.lastIndexOf( '/' );
	if ( pos >= 0 ) {
		ref_path.pathname = ref_path.pathname.substring(0, pos+1);
	}
	
	ref_path.pathname = RESOLVE_RELATIVE(`${ref_path.pathname}${module_url}`);
	return ref_path.href;
}
function RESOLVE_RELATIVE(relative) {
	var stack = [], parts = relative.split("/");
				 
	for( var i = 0; i < parts.length; i++ ){
		if( parts[i] === "." )
			continue;
		
		if( parts[i] === ".." )
			stack.pop();
		else
			stack.push(parts[i]);
	}
	
	return stack.join("/");
}
