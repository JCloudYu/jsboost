/**
 * Author: JCloudYu
 * Create: 2018/09/21
**/
(async()=>{
	"use strict";
	
	const {DOMEventEmitter} = require( '../index' );
	const emitter = new DOMEventEmitter();
	
	
	let prev, diff, event_collector = [];
	
	emitter
	.on( 'a,b,c', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'b', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'c', (e)=>{
		event_collector.push(e.type);
		e.stopPropagation();
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'a,c', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'a,b', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'a', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'a', (e)=>{
		event_collector.push(e.type);
		e.stopPropagation();
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'a', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'b', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'a', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	})
	.on( 'b', (e)=>{
		event_collector.push(e.type);
		return new Promise((resolve)=>{setTimeout(resolve, 1000)});
	});
	
	
	process.stdout.write( "emit... " );
	prev=Date.now(); emitter.emit('b'); diff = Date.now()-prev;
	process.stdout.write( diff < 100 ? "Passed\n" : "Failed\n" );
	
	process.stdout.write( "emitAwait... " );
	prev=Date.now(); await emitter.emitAwait('b'); diff = Date.now()-prev;
	process.stdout.write( (diff >= 5000 && diff < 6000) ? "Passed\n" : "Failed\n" );
	
	
	
	process.stdout.write( "stopPropagation on emit... " );
	event_collector = [];
	emitter.emit('a');
	process.stdout.write( (event_collector.length === 5) ? "Passed\n" : "Failed\n" );
	
	process.stdout.write( "stopPropagation on emitAwait... " );
	event_collector = [];
	await emitter.emitAwait('c');
	process.stdout.write( (event_collector.length === 2) ? "Passed\n" : "Failed\n" );
})();
