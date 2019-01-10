/**
 * Author: JCloudYu
 * Create: 2018/09/28
**/
(()=>{
	"use strict";
	
	const child_process = require( 'child_process' );
	const fs = require( 'fs' );
	const path = require( 'path' );
	const [node, script] = process.argv;
	
	const NODE_PATH 	= path.resolve(node);
	const WORKING_PATH	= path.dirname(path.resolve(script));
	const {scripts:pkg_scripts} = JSON.parse(fs.readFileSync(`${WORKING_PATH}/package.json`));
	
	for( let idx in pkg_scripts ) {
		if ( !pkg_scripts.hasOwnProperty(idx) ) continue;
		if ( ["test_", "test-"].indexOf( idx.substring(0, 5) ) < 0 ) continue;
		
		let [, ...script_args] = pkg_scripts[idx].trim().split( ' ' );
		script_args.map(item=>item.trim());
		
		console.log( `Running ${idx}...` );
		child_process.execFileSync(NODE_PATH, script_args, { stdio:[0, 1, 2] });
		console.log( "\n\n" );
	}
})();
