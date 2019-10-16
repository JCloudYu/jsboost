/**
 *	Author: JCloudYu
 *	Create: 2019/10/16
**/
import {UTF8String} from "./utf8string.esm.js";
import {ObjectAssignProperties} from "./_helper.esm.js";


const CAMEL_CASE_PATTERN = /(\w)(\w*)(\W*)/g;
const CAMEL_REPLACER = (match, $1, $2, $3, index, input )=>{
	return `${$1.toUpperCase()}${$2.toLowerCase()}${$3}`;
};
const READY_STATE = Object.assign(Object.create(null), {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
});

export function BrowserWebFetch(url, init={}) {
	let resolve=DO_NOTHING, reject=DO_NOTHING;
	const promise = new Promise((_res, _rej)=>{resolve=_res; reject=_rej;});
	
	
	
	const {
		mode='no-cors',
		method='GET',
		headers={},
		timeout=0,
		credentials='omit',
		body=null,
	} = init;
	const request = new XMLHttpRequest();
	promise.request = request;
	promise.promise = promise;
	
	
	
	
	request.addEventListener('readystatechange', (e)=>{
		switch( request.readyState ) {
			case READY_STATE.UNSENT:
				break;
				
			case READY_STATE.OPENED:
				request.withCredentials = (mode === 'cors') && (credentials === 'include' || credentials === 'same-origin' );
				request.timeout = timeout;
				request.responseType = 'arraybuffer';
				
				// NOTE: Set request headers
				for (const header_name in headers) {
					const normalize_header = header_name.replace(CAMEL_CASE_PATTERN, CAMEL_REPLACER);
					const value = headers[header_name];
					request.setRequestHeader( normalize_header, value );
				}
				break;
				
			case READY_STATE.HEADERS_RECEIVED:
				break;
				
			case READY_STATE.LOADING:
				break;
				
			case READY_STATE.DONE:
				break;
		}
	});
	request.addEventListener('timeout', ON_ERROR.bind(request, reject));
	request.addEventListener('abort', ON_ERROR.bind(request, reject));
	request.addEventListener('error', ON_ERROR.bind(request, reject));
	request.addEventListener('load', function(e) {
		const response_bytes = new Uint8Array(request.response);
		const response = ObjectAssignProperties(Object.create(null), {
			request,
			ok: (request.status >= 200 && request.status <= 299),
			status: request.status,
			statusText: request.statusText,
			url: request.responseURL,
			headers: request.getAllResponseHeaders(),
			text: async function(){
				return UTF8String.Decode(response_bytes);
			},
			blob: async function(){
				return new Blob([response_bytes]);
			},
			arrayBuffer: async function() {
				return response_bytes;
			},
			json: async function(throw_if_error=true) {
				try {
					return JSON.parse(UTF8String.Decode(response_bytes));
				}
				catch(e) {
					return throw_if_error ? Promise.reject(e) : undefined;
				}
			}
		});
		resolve(response);
	});
	request.addEventListener('progress', PROGRESS.bind(request, false));
	request.upload.addEventListener('progress', PROGRESS.bind(request, true));
	
	
	
	request.open( method, url, true );
	request.send( body );
	return promise;
}



function DO_NOTHING(){}
function PROGRESS(upload, e) {
	const event = new Event( upload ? 'progress-up' : 'progress-down');
	ObjectAssignProperties(event, {
		lengthComputable:e.lengthComputable,
		loaded:e.loaded,
		total:e.total
	});
	
	this.dispatchEvent(event);
}
function ON_ERROR(reject, e) {
	const response = ObjectAssignProperties(Object.create(null), {
		request:this,
		error: e,
		ok: false
	});
	reject(response);
}
