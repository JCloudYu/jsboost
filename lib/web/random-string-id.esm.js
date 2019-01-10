/**
 *	Author: JCloudYu
 *	Create: 2019/01/06
**/
const ID_MAP = "0123456789abcdefghijklmnopqrstuvwxyABCDEFGHIJKLMNOPQRSTUVWXY";
export function RSID(length=25, prefix='') {
	let id = '';
	while( length-- > 0 ) {
		const selection = Math.floor(Math.random() * ID_MAP.length);
		id += ID_MAP[selection];
	}
	return `${prefix}${id}`;
}


export {RSID as RandomStringID};
