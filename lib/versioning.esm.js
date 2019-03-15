/**
 *	Author: JCloudYu
 *	Create: 2019/03/15
**/
const ACCEPTED_FORMAT = /^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,2}(-(0|[1-9a-zA-Z][0-9a-zA-Z]*)(\.(0|[1-9a-zA-Z][0-9a-zA-Z]*))*)?$/;
const NUMERIC = /^\d+$/;

export class Version {
	constructor(version="0.0.0") {
		version = version.trim();
		if ( !ACCEPTED_FORMAT.test(version) ) {
			throw new SyntaxError( "Given version string contains invalid format!" );
		}
		
		this._raw	= null;
		this._parts	= [];
		
		this.version = version;
	}
	compare(other) {
		let _parts;
		if ( other instanceof Version ) {
			_parts = other._parts;
		}
		else{
			if ( !ACCEPTED_FORMAT.test(other) ) {
				return false;
			}
			
			_parts = ___PARSE_VERSION(other, false);
		}
		
		
		const PARTS = _parts;
		const LOOPS = PARTS.length > this._parts.length ? PARTS.length : this._parts.length;
		
		// NOTE: Compare normal parts
		for(let i=0; i<3; i++) {
			const a = this._parts[i]; // null or number
			const aType = typeof a; // object or number
			
			const b = PARTS[i]; // null or number
			const bType = typeof b; // object or number
			
			if ( aType === bType ) {
				if ( a > b ) { return 1;  }
				if ( a < b ) { return -1; }
			}
			else {
				// 1 > 1.1, 2.3 > 2.3.4
				return aType === "object" ? 1 : -1;
			}
		}
		
		
		
		// NOTE: Special case 1.1.1 > 1.1.1-b
		if ( LOOPS > 3 && this._parts.length === 3 ) {
			return 1;
		}
		else
		if ( LOOPS > 3 && PARTS.length === 3 ) {
			return -1;
		}
		
		
		// NOTE: Compare prerelease parts
		for(let i=3; i<LOOPS; i++) {
			const a = this._parts[i] || 0;
			const aType = typeof a; // number, string
			
			const b = PARTS[i] || 0;
			const bType = typeof b; // number, string
			
			
			if ( aType === bType ) {
				if ( a > b ) { return 1;  }
				if ( a < b ) { return -1; }
			}
			else {
				// 1-b > 1-b.1, 1-b.a > 1-b.1
				return aType === "string" ? 1 : -1;
			}
		}
		
		return 0;
	}
	
	get version() {
		return this._parts;
	}
	set version(version) {
		version = version.trim();
		if ( !ACCEPTED_FORMAT.test(version) ) {
			throw new SyntaxError( "Given version string contains invalid format!" );
		}
		
		this._raw = version;
		this._parts = ___PARSE_VERSION(version);
	}
	
	get major() {
		return this._parts[0];
	}
	get minor() {
		return this._parts[1];
	}
	get patch() {
		return this._parts[2];
	}
	get prerelease() {
		return this._parts.slice(3);
	}
	
	static From(...args) {
		if ( args.length === 0 ) {
			return null;
		}
	
		try { return new Version(...args); } catch (e) { return null; }
	}
}



function ___PARSE_VERSION(version, normalize=true) {
	const PARTS = [];
	const [ NORMAL, PRERELEASE ]  = version.split( '-' );
	
	const [ MAJOR, MINOR=null, PATCH=null ] = NORMAL.split( '.' );
	const PRE_RELEASE_INFO = PRERELEASE ? PRERELEASE.split( '.' ) : [];
	
	
	
	PARTS.push(MAJOR|0);
	if ( MINOR !== null ) {
		PARTS.push(MINOR|0)
	}
	else {
		PARTS.push(normalize ? 0 : '');
	}
	
	if ( PATCH !== null ) {
		PARTS.push(PATCH|0)
	}
	else {
		PARTS.push(normalize ? 0 : '');
	}
	
	
	
	for(let part of PRE_RELEASE_INFO) {
		if ( NUMERIC.test(part) ) {
			part = part | 0;
		}
		
		PARTS.push(part);
	}
	return PARTS;
}
