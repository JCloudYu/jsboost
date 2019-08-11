/**
 *	Author: JCloudYu
 *	Create: 2019/08/11
**/

/**
 *	Term Definitions
 *		The api treats the url as a combination of scheme part, authority part
 *
 *		  http:    //    www.a.b.d.com   [:8080]    /p1/p2/p3/p4    ?a=1&b=2&c=/&d=d    #a#b?cdefg/12345
 *      {scheme}        {   hostname  } {  port }  {    path    }  {      query     }  {    fragment    }
 *                      {          host         }
 *		          {         authority           }  {                  path-descriptor                   }
**/

export function ParseURLPathDescriptor(url) {
	url = url.trim();

	// NOTE: Parse hash
	let query, frag, pos = url.indexOf( '#' );
	if ( pos < 0 ) {
		frag = '';
	}
	else {
		frag = url.substring(pos);
		url = url.substring(0, pos);
	}
	
	// NOTE: Parse query
	pos = url.indexOf( "?" );
	if ( pos < 0 ) {
		query = '';
	}
	else {
		query = url.substring(pos);
		url = url.substring(0, pos);
	}
	
	return {path:url, query, fragment:frag};
}
export function PopURLPath(path) {
	path = path.trim();

	if ( path === "" ) return [ "", "" ];
	
	let pos = path.indexOf('/', 1);
	if ( pos < 0 ) {
		return [ path, "" ];
	}
	
	return [ path.substring(0, pos), path.substring(pos) ];
}
export function ShiftURLPath(url) {
	url = url.trim();
	
	if ( url === "" ) return [ "", "" ];
	
	let pos = url.lastIndexOf('/');
	if ( pos <= 0 ) {
		return [ "", url ];
	}
	
	return [ url.substring(0, pos), url.substring(pos) ];
}
export function ParseURLQuery(raw_query) {
	raw_query = raw_query.trim();
	if ( raw_query[0] === '?' ) {
		raw_query = raw_query.substring(1);
	}
	
	const parsed_queries = {};
	for( let pair of raw_query.split('&') ) {
		pair = pair.trim();
		if ( pair === "" ) continue;
		
		let [key, value] = pair.split('=');
		key = decodeURIComponent(key);
		value = decodeURIComponent(value);
		parsed_queries[key] = value;
	}
	
	return parsed_queries;
}
