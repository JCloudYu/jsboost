/**
 * Author: JCloudYu
 * Create: 2018/09/22
**/
(async()=>{
	"use strict";
	
	const {AsyncInvoke} = require( '../index' );
	const async_provider = new AsyncInvoke();
	
	let result = await async_provider.invoke(()=>{
		console.log( "Loading JSON..." );
		return new Promise((resolve)=>{
			setTimeout(()=>{
				resolve({
					a:1, b:2, c:3, d:{
						aa:1, bb:2, cc:3, dd:{
							aaa:1, bbb:2, ccc:3, ddd:null
						}
					}
				});
			}, 3000);
		});
	});
	console.log(result);
})();
