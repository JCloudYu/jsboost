/**
 *	Author: JCloudYu
 *	Create: 2018/11/17
**/
(()=>{
	"use strict";
	
	const StateMachine = require( '../jsboost' );
	
	// ab*c{2}d
	process.stdout.write( "Creating machine that accept ab*c{2}d... " );
	const machine = StateMachine.Construct({
		a: function(input){
			if ( input === 'a' ) {
				this.state = 'b';
				return true;
			}
			
			throw new Error("Invalid input");
		},
		b: function(input){
			if ( input === 'b' ) {
				return true;
			}
			else
			if ( input === 'c' ) {
				this.state = 'c';
				return false;
			}
			
			throw new Error("Invalid input");
		},
		c: function(input){
			this.storage.count = this.storage.count || 1;
			if ( input === 'c' && this.storage.count <= 2 ) {
				this.storage.count++;
				return true;
			}
			else
			if ( input === 'd' && this.storage.count > 2 ) {
				this.state = 'd';
				return false;
			}
			
			throw new Error("Invalid input");
		},
		d: function(input) {
			this.storage.count = this.storage.count || 1;
			if ( input === 'd' && this.storage.count <= 1 ) {
				this.state = 'fin';
				return true;
			}
			
			throw new Error("Invalid input");
		}
	});
	process.stdout.write( "done!\n" );
	
	
	
	let input = [ 'a', 'b', 'b', 'b', 'b', 'c', 'c', 'd' ];
	let input2 = [ 'a', 'c', 'c', 'd' ];
	let errInput = [ 'b', 'b', 'b', 'b', 'c', 'c', 'd' ];
	let errInput2 = [ 'a', 'b', 'b', 'b', 'b', 'c', 'd' ];
	
	
	
	process.stdout.write( "Testing abbbbccd... " );
	let i=0;
	while(i<input.length) {
		const char = input[i];
		let eat = machine(char);
		if ( eat ) i++;
	}
	if ( machine.finished ) {
		process.stdout.write( "passed!\n" );
	}
	else {
		process.stdout.write( "failed!\n" );
	}
	
	
	
	process.stdout.write( "Testing accd...     " );
	machine.reset('a');i=0;
	while(i<input2.length) {
		const char = input2[i];
		let eat = machine(char);
		if ( eat ) i++;
	}
	if ( machine.finished ) {
		process.stdout.write( "passed!\n" );
	}
	else {
		process.stdout.write( "failed!\n" );
	}
	
	
	
	process.stdout.write( "Testing bbbbccd...  " );
	machine.reset('a');i=0;
	try {
		while(i<errInput.length) {
			const char = errInput[i];
			let eat = machine(char);
			if ( eat ) i++;
		}
		
		process.stdout.write( "failed!\n" );
	}
	catch(e) {
		process.stdout.write( machine.finished ? "failed\n" : "passed!\n" );
	}
	
	
	
	process.stdout.write( "Testing abbbbcd...  " );
	machine.reset('a');i=0;
	try {
		while(i<errInput2.length) {
			const char = errInput2[i];
			let eat = machine(char);
			if ( eat ) i++;
		}
		
		process.stdout.write( "failed!\n" );
	}
	catch(e) {
		process.stdout.write( machine.finished ? "failed\n" : "passed!\n" );
	}
})();
