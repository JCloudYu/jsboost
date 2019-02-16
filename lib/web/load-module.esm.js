/**
 *	Author: JCloudYu
 *	Create: 2019/02/17
**/
import {RSID} from "./random-string-id.esm.js";



/**
 * Load ES Module from specific address.
 * ( Note that the url will be resolved to the path where the html locates!
 *   It will not behave like what normal es modules do! )
 * @param {String} module_url
 * @return {Promise<*>}
 * @constructor
**/
export function ModuleImport(module_url) {
	return new Promise((resolve, reject)=>{
		const abs_url = TO_ABSOLUTE_URL(module_url);
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
			`import * as m from "${abs_url}"; window.${inject_point} = m;`
		], {type:'application/javascript'}));
		
		document.querySelector( 'body' ).appendChild(element);
	});
}

function TO_ABSOLUTE_URL(url) {
	const a = document.createElement("a");
	a.setAttribute("href", url);    // <a href="hoge.html">
	return a.cloneNode(false).href; // -> "http://example.com/hoge.html"
}

