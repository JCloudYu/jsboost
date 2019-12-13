/**
 *	Author: JCloudYu
 *	Create: 2019/12/13
**/
const TMPL_ITEM_PROXY = {
	get: function(obj, prop) {
		if ( prop === 'element' ) return obj;
		
		
		const element = obj.querySelector(`[elm-export="${prop}"]`);
		return element || obj[prop];
	},
	set: function(obj, prop, value) {
		if ( prop === "element" ) return false;
		
		
		const element = obj.querySelector(`[elm-export="${prop}"]`);
		if ( !element ) {
			obj[prop] = value;
		}
		return true;
	},
	
};
export class HTMLElementTemplate {
	constructor(element) {
		if ( typeof element === "string" ) {
			var tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = element;
			if ( tmp.body.children.length !== 1 ) {
				throw new TypeError( "HTMLTemplate constructor only html string that is resolved as single Element instance!" );
			}
			
			element = tmp.body.children[0];
		}
		else
		if ( element instanceof Element ){
			element = element.cloneNode(true);
		}
		else {
			throw new TypeError( "HTMLTemplate constructor only accepts an Element instance!" );
		}
		
		
		
		Object.defineProperties(this, {
			_tmpl_elm: {
				configurable:false, writable:false, enumerable:false,
				value:element
			}
		});
	}
	produce() {
		return new Proxy(this._tmpl_elm.cloneNode(true), TMPL_ITEM_PROXY);
	}
}
