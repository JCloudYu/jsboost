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

/**
 *	Parse the input string as a url formatted string
 *
 *	@param {String} url The raw input url formatted string
 *	@returns {{path:String, query:String, fragment:String}}
**/
export function ParseURLPathDescriptor(url) {
	url = (url||'').trim();

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

/**
 *	Parse the input string as a url path string and populate the left most component out
 *
 *	@param {String} path The input raw string to be parsed
 *	@return String[]
**/
export function PopURLPath(path) {
	path = (path||'').trim();

	if ( path === "" ) return [ "", "" ];
	
	let pos = path.indexOf('/', 1);
	if ( pos < 0 ) {
		return [ path, "" ];
	}
	
	return [ path.substring(0, pos), path.substring(pos) ];
}

/**
 *	Parse the input string as a url path string and populate the right most component out
 *
 *	@param {String} path The input raw string to be parsed
 *	@return String[]
**/
export function ShiftURLPath(path) {
	path = (path||'').trim();
	
	if ( path === "" ) return [ "", "" ];
	
	let pos = path.lastIndexOf('/');
	if ( pos <= 0 ) {
		return [ "", path ];
	}
	
	return [ path.substring(0, pos), path.substring(pos) ];
}

/**
 *	Parse the input string as a urlencoded string
 *
 *	@param {String} raw_query The input raw string to be parsed
 *	@return {Object};
**/
const URLQueryWhiteSpaceCharMatcher = /\+/g;
export function ParseURLQuery(raw_query) {
	raw_query = (raw_query||'').trim();
	if ( raw_query[0] === '?' ) {
		raw_query = raw_query.substring(1);
	}
	
	const parsed_queries = {};
	for( let pair of raw_query.split('&') ) {
		pair = pair.trim();
		if ( pair === "" ) continue;
		
		let [key, value] = pair.split('=');
		key = decodeURIComponent(key.replace(URLQueryWhiteSpaceCharMatcher, ' '));
		value = value === undefined ? null : decodeURIComponent(value.replace(URLQueryWhiteSpaceCharMatcher, ' '));
		parsed_queries[key] = value;
	}
	
	return parsed_queries;
}

/**
 *	Parse and normalize given input path into absolute form
 *	@param {String} path_part The path part to be processed
 *	@returns {String}
**/
export function PurgeRelativePath(path_part) {
	if ( path_part[0] !== "/" ) path_part = '/' + path_part;
	
	
	const path_comp = path_part.substring(1).split('/');
	const new_path = [];
	for( const comp of path_comp ) {
		if ( comp === "." ) continue;
		if ( comp === ".." ) {
			new_path.splice(new_path.length-1, 1);
			continue;
		}
		new_path.push(comp);
	}
	
	return `/${new_path.join('/')}`;
}
