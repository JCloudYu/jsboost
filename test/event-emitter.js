/**
 * Author: JCloudYu
 * Create: 2018/09/21
**/
(async()=>{
	"use strict";
	
	const {EventEmitter} = require( '../index' );
	const emitter = new EventEmitter();
	
	
	let prev, diff;
	
	emitter
	.on( 'a,b,c', ___PROMISE)
	.on( 'b', ___PROMISE)
	.on( 'c', ___PROMISE)
	.on( 'a,c', ___PROMISE)
	.on( 'a,b', ___PROMISE)
	.on( 'a', ___PROMISE)
	.on( 'a', ___PROMISE)
	.on( 'a', ___PROMISE)
	.on( 'b', ___PROMISE)
	.on( 'a', ___PROMISE)
	.on( 'b', ___PROMISE);
	
	
	process.stdout.write( "emit... " );
	prev=Date.now(); emitter.emit('b'); diff = Date.now()-prev;
	process.stdout.write( diff < 100 ? "Passed\n" : "Failed\n" );
	
	process.stdout.write( "emitAwait... " );
	prev=Date.now(); await emitter.emitAwait('b'); diff = Date.now()-prev;
	process.stdout.write( (diff >= 5000 && diff < 6000) ? "Passed\n" : "Failed\n" );
	
	
	function ___PROMISE(){
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	}
})();
