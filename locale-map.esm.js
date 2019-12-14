/**
 *	Author: JCloudYu
 *	Create: 2019/12/14
**/
const _IS_NODE_JS = (typeof Buffer !== "undefined");

class _LocaleMap {
	constructor(parent=null) {
		this._locale_parent = parent;
		this._locale = "_default";
		this._locale_maps = Object.create(null);
		this._locales = Object.create(null);
	}
	register(locale, locale_map={}) {
		if ( Object(locale_map) !== locale_map ) {
			throw new TypeError( "Given locale map must be an object!" );
		}
		
		
		locale = ('' + locale).trim();
		const internal_map = this._locale_maps[locale] || {};
		Object.assign(this._locale_maps[locale]=internal_map, locale_map);
		
		
		
		this._locales[locale] = [];
		for( const locale_text in internal_map ) {
			this._locales[locale].push({
				match: new RegExp(locale_text, "g"),
				replace: internal_map[locale_text]
			});
		}
		
		return this;
	}
	set locale(value) {
		this._locale = ('' + value).trim();
	}
	get locale() {
		return this._locale;
	}
	map(text) {
		if ( typeof text !== "string" ) return text;
		
		
		
		let locale_inst = this, matched = null, replaced = null, matched_length = 0;
		while ( locale_inst !== null) {
			const locale_map = locale_inst._locales[this._locale];
			if ( Array.isArray(locale_map) ) {
				for(const {match, replace} of locale_map) {
					const matches = text.match(match);
					if ( matches ) {
						if ( match.source.length < matched_length ) continue;
						
						matched = match;
						replaced = replace;
						matched_length = match.source.length;
					}
				}
			}
			
			locale_inst = locale_inst._locale_parent;
		}
		
		
		
		return matched ? text.replace(matched, replaced) : text;
	}
	parse(dom_elm) {
		if ( _IS_NODE_JS ) {
			throw new Error( "LocaleMap::parse is not available in NodeJS environment!" );
		}
		
		const elements = dom_elm.querySelectorAll( '[elm-locale-text],[elm-locale-html]' );
		for( const elm of elements ) {
			const target_attribute = elm.getAttribute( 'elm-locale-dest' );
			if ( elements.hasAttribute( 'elm-locale-html' ) ) {
				const mapped_string = this.map( elm.getAttribute( 'elm-locale-html' )||'' );
				if ( target_attribute ) {
					elm.setAttribute(target_attribute, mapped_string);
				}
				else {
					elm.innerHTML = mapped_string;
				}
			}
			else {
				const mapped_string = this.map( elm.getAttribute( 'elm-locale-html' )||'' );
				if ( target_attribute ) {
					elm.setAttribute(target_attribute, mapped_string);
				}
				else {
					elm.textContent = mapped_string;
				}
			}
		}
	}
}

const INST_OP_MAP = new WeakMap();
const INST_PROXY = {
	construct(target) {
		const inst = new _LocaleMap(target);
		return new Proxy(inst, INST_PROXY);
	},
	get: function(target, prop) {
		if ( !INST_OP_MAP.has(target) ) {
			INST_OP_MAP.set(target, {
				register: _LocaleMap.prototype.register.bind(target),
				map: _LocaleMap.prototype.map.bind(target),
				parse: _LocaleMap.prototype.parse.bind(target)
			});
		}
		
		const INST_OP = INST_OP_MAP.get(target);
		switch(prop) {
			case "register":
				return INST_OP.register;
			
			case "locale":
				return target.locale;
			
			case "map":
				return INST_OP.map;
			
			case "parse":
				return INST_OP.parse;
		}
		
		
		return target.map(prop);
	},
	set: function(target, prop, value) {
		if ( prop === "locale" ) {
			target.locale = value;
			return true;
		}
		
		throw new Error( `Setting value to property \`${prop}\` is not allowed` );
	}
};

export const LocaleMap = new Proxy(new _LocaleMap(null), INST_PROXY);
