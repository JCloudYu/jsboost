/**
 *	Author: JCloudYu
 *	Create: 2019/10/16
**/
import {ObjectAssignProperties} from "../_helper.esm.js";

export async function NodeWebFetch(url, init={}) {
	const {default:{URL}} = await import('url');
	url = new URL(url);
	
	let handler, default_port;
	if ( url.protocol === "http:" ) {
		({default:handler} = await import('http'));
		default_port = 80;
	}
	else
	if ( url.protocol === "https:" ) {
		({default:handler} = await import('https'));
		default_port = 443;
	}
	
	if ( !handler ) {
		throw new Error( "Unsupported url scheme!" );
	}
	
	
	
	const {
		mode='no-cors',
		method='GET',
		headers={},
		timeout=0,
		credentials='omit',
		body=null,
	} = init;
	
	return new Promise((resolve, reject)=>{
		const req = handler.request({
			host: url.host,
			port: url.port || default_port,
			hostname: url.hostname,
			path: `${url.pathname}${url.search}${url.hash}`,
			method,
			headers,
			timeout
		})
		.on( 'error', reject )
		.on( 'abort', reject )
		.on( 'response', (res)=>{
			const response = ObjectAssignProperties(Object.create(null), {
				req,
				ok: (res.statusCode >= 200 && res.statusCode <= 299),
				status: res.statusCode,
				statusText: res.statusMessage,
				url: res.headers['location'] || '',
				headers: res.headers,
				text: function() {
					const chunks = [];
					return new Promise((resolve, reject)=>{
						res
						.on( 'data', (chunk)=>{chunks.push(chunk);})
						.on( 'error', reject )
						.on( 'end', ()=>{
							resolve(Buffer.concat(chunks).toString('utf8'))
						})
					});
				},
				arrayBuffer: async function() {
					const chunks = [];
					return new Promise((resolve, reject)=>{
						res
						.on( 'data', (chunk)=>{chunks.push(chunk);})
						.on( 'error', reject )
						.on( 'end', ()=>{
							const bytes = new Uint8Array(Buffer.concat(chunks));
							resolve(bytes.buffer);
						})
					});
				},
				json: async function(throw_if_error=true) {
					const chunks = [];
					return new Promise((resolve, reject)=>{
						res
						.on( 'data', (chunk)=>{chunks.push(chunk);})
						.on( 'error', reject )
						.on( 'end', ()=>{
							try{
								resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
							}
							catch(e) {
								throw_if_error ? reject(e) : resolve(undefined);
							}
						})
					});
				}
			});
			resolve(response);
		});
		
		req.end(body);
	});
}
