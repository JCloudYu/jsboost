/**
 *	Author: JCloudYu
 *	Create: 2019/07/02
**/
export function LocateClosestParent(begin_item, selector) {
	if ( !(begin_item instanceof Node) ) {
		throw new TypeError( "The first argument must be an DOM element!" );
	}
	
	let current_item = begin_item;
	while( current_item !== document ) {
		if ( current_item.matches(`${selector}`) ) {
			return current_item;
		}
	
		current_item = current_item.parentNode;
	}
	
	return null;
}
