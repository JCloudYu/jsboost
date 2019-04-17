/**
 *	Author: JCloudYu
 *	Create: 2019/03/22
**/
/**
 * Cookie attributes
 * @typedef {Object} CookieAttribute
 * @property {String} [domain=null]
 * @property {String} [path=/]
 * @property {Number} [duration=0]
 * @property {Boolean} [sslOnly=false]
 * @property {Boolean} [httpOnly=true]
 * @property {String} [sameSite=strict]
**/

export const CastHTTPStringSymbol = Symbol( 'Cast-To-Http-SetCookie-Header' );
export class HTTPCookieItem {
	constructor(name, value) {
		this.name		= name;
		this.value		= value;
		this.domain		= null;
		this.path		= '/';
		this.duration	= null;
		this.ssl_only	= false;
		this.http_only	= true;
		this.same_site_policy = 'Strict';
	}
	get [CastHTTPStringSymbol]() {
		const _key = `${this.name}`.trim();
		if ( _key === "" ) {
			throw new TypeError("Cookie name cannot be empty!");
		}
		
		const key = _key;
		const val = `${this.value}`.trim();
		const attr = [ `${key}=${val}` ];
		if ( this.domain !== null ) {
			attr.push( `Domain=${this.domain}` );
		}
		if ( this.path !== null ) {
			attr.push( `Path=${this.path}` );
		}
		if ( this.duration !== null ) {
			if ( typeof this.duration !== "number" || this.duration < 0 ) {
				throw new TypeError( "Cookie duration must be a number greater than zero!" );
			}
		
			const expire = new Date(Date.now() + this.duration * 1000);
			attr.push( `Max-Age=${this.duration}` );
			attr.push( `Expires=${expire.toUTCString()}` );
		}
		if ( this.ssl_only ) {
			attr.push( 'Secure' );
		}
		if ( this.http_only ) {
			attr.push( 'HttpOnly' );
		}
		if ( this.same_site_policy !== null ) {
			attr.push( `SameSite=${this.same_site_policy}` );
		}
		
		return `${attr.join('; ')}`;
	}
	get [Symbol.toStringTag]() {
		return 'HTTPCookie';
	}
}
export class HTTPCookies {
	constructor() {
		this._cookies = Object.create(null);
	}
	
	/**
	 * Add a HTTPCookie info
	 * @param {HTTPCookieItem} cookie
	**/
	add(cookie) {
		if ( !(cookie instanceof HTTPCookieItem) ) {
			throw new TypeError( "Incoming cookie must be an HTTPCookie object!" );
		}
		
		this._cookies[cookie.name] = cookie;
		return cookie;
	}
	
	/**
	 * Creat a cookie
	 * @param {String} name
	 * @param {String} value
	 * @param {CookieAttribute} options
	 * @returns {HTTPCookieItem}
	**/
	set(name, value, options={domain:null, path:'/', duration:null, sslOnly:false, httpOnly:true, sameSite:'strict'}) {
		const cookie = new HTTPCookieItem(name, value);
		cookie.domain = (options.domain === undefined) ? null : options.domain;
		cookie.path = (options.path === undefined) ? null : options.path;
		cookie.duration = (options.duration === undefined) ? null : options.duration;
		cookie.ssl_only = (options.sslOnly === undefined) ? false : !!options.sslOnly;
		cookie.http_only = (options.httpOnly === undefined) ? true : !!options.httpOnly;
		cookie.same_site_policy = (options.sameSite === undefined) ? null : options.sameSite;
		
		this._cookies[cookie.name] = cookie;
		return cookie;
	}
	
	/**
	 * Retrieve a cookie
	 * @param {String} name
	 * @returns {HTTPCookieItem|null}
	**/
	get(name) {
		return this._cookies[name]||null;
	}
	
	/**
	 * Retrieve the array of cookie values that can be used in http header
	 * @return {String[]}
	**/
	getHttpCookies() {
		return this[CastHTTPStringSymbol];
	}
	
	
	
	/**
	 * @private
	**/
	get [CastHTTPStringSymbol]() {
		const Header = [];
	
		for( let _ in this._cookies ) {
			const cookie = this._cookies[_];
			if ( !(cookie instanceof HTTPCookieItem) ) continue;
			
			Header.push(cookie[CastHTTPStringSymbol]);
		}
		
		return Header;
	}
	
	
	
	/**
	 * @param {String} rawCookies
	 * @returns {HTTPCookies}
	**/
	static FromRawCookies(rawCookies) {
		rawCookies = rawCookies.trim();
	
		const CookieList = new HTTPCookies();
		const cookies = rawCookies.split(';');
		for( const raw_cookie of cookies ) {
			let cookie = raw_cookie.trim();
			if ( !cookie ) continue;
			
			const _splitter = cookie.indexOf( '=' );
			if ( _splitter < 0 ) continue;
			
			
			
			const name  = cookie.substring(0, _splitter);
			const value = cookie.substring(_splitter+1);
			CookieList.add(new HTTPCookieItem(name, value));
		}
		
		return CookieList;
	}
}
