/**
 *	Author: JCloudYu
 *	Create: 2019/07/21
**/
import assert from "assert";
import {UniqueId, InitAccordingToEnv} from "../unique-id.esm.js";

test_group( "Test for UniqueId Construction", ()=>{
	let _unique_id, _hex, _ab, _ba;
	unit_test( "Initializing a unique_id", async()=>{
		await InitAccordingToEnv();
	});
	
	unit_test( "Creating an UniqueId instance", ()=>{
		_unique_id = new UniqueId();
		_hex = _unique_id.toString(16);
		_ab = _unique_id.bytes.buffer;
		_ba = _unique_id.bytes;
	});
	
	unit_test( "Creating an UniqueId instance from another UniqueId instance", ()=>{
		const newId = new UniqueId(_unique_id);
		assert( newId.compare(_unique_id) === 0 );
	});
	
	unit_test( "Creating an UniqueId instance from ArrayBuffer instance", ()=>{
		const newId = new UniqueId(_ab);
		assert( newId.compare(_unique_id) === 0 );
	});
	
	unit_test( "Creating an UniqueId instance from Uint8Array instance", ()=>{
		const newId = new UniqueId(_ba);
		assert( newId.compare(_unique_id) === 0 );
	});
	
	unit_test( "Creating an UniqueId instance from hex string", ()=>{
		const newId = new UniqueId(_unique_id.toString());
		assert( newId.compare(_unique_id) === 0 );
	});
});
