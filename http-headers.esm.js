/**
 *	Author: JCloudYu
 *	Create: 2019/08/30
**/
export function ParseContentTypeHeader(value=null) {
	const {values, attrs} = ParseDefaultHeaderEntryItem(value);
	return {value:`${values[0]}`.toLowerCase(), attributes:attrs};
}
export function ParseContentDispositionHeader(value=null) {
	const {values, attrs} = ParseDefaultHeaderEntryItem(value);
	return {value:`${values[0]}`.toLowerCase(), attributes:attrs};
}



const DO_NOTHING = (val)=>val;

/**
 *	Assumed Syntax
 *		header := header_field_name: entry[, entry]
 *		entry := entry_value[; entry_value[;]]
 *		entry_value := value | attr_key=attr_value
**/
export function ParseDefaultHeaderEntries(value=null, entry_decoder=DO_NOTHING) {
	value = '' + (value||'');
	
	const entries = [];
	for( let entry of value.split(',') ) {
		entry = entry.trim();
		if ( entry === '' ) continue;
		
		entries.push(ParseDefaultHeaderEntryItem(entry, entry_decoder));
	}
	return entries;
}
export function ParseDefaultHeaderEntryItem(value=null, entry_decoder=DO_NOTHING) {
	value = '' + (value||'');
	
	const content = Object.create(null);
	content.values = [];
	content.attrs = Object.create(null);
	
	for ( let attr of value.split(';') ) {
		attr = attr.trim();
		if ( attr === "" ) continue;
		
		let splitter = attr.indexOf('=');
		if ( splitter < 0 ) {
			content.values.push(entry_decoder(attr));
		}
		else {
			content.attrs[entry_decoder(attr.substring(0, splitter))] = entry_decoder(attr.substring(splitter+1));
		}
	}
	
	return content;
}

