/**
 *	Author: JCloudYu
 *	Create: 2019/07/14
**/
import {NodeWebFetch} from "./web-fetch/node-web-fetch.esm.js";
import {BrowserWebFetch} from "./web-fetch/browser-web-fetch.esm.js";



const nodejs_env = (typeof Buffer !== "undefined");
export function WebFetch(url, init={}) {
	if ( nodejs_env ) {
		return NodeWebFetch(url, init);
	}
	else {
		return BrowserWebFetch(url, init);
	}
}
