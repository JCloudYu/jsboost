/**
 *	Author: JCloudYu
 *	Create: 2019/07/21
**/
import assert from "assert";
import {UniqueId, InitAccordingToEnv} from "../unique-id.esm.js";

init_context('unique-id', ()=>{
	test_group( "Test for UniqueId Construction", ()=>{
		let _unique_id, _hex, _bits, _b16, _b2, _b64, _b64url, _b32, _ab, _ba, _past = new UniqueId("0000016c22d732fc0ac7dc6a8b8c8b8d008f960c");
		unit_test( "Initializing a unique_id", async()=>{
			await InitAccordingToEnv();
		});
		
		unit_test( "Creating an UniqueId instance", ()=>{
			_unique_id	= new UniqueId();
			_hex		= _unique_id.toString('hex');
			_bits		= _unique_id.toString('bits');
			_b16		= _unique_id.toString(16);
			_b2			= _unique_id.toString(2);
			_b64		= _unique_id.toString('base64');
			_b32		= _unique_id.toString('base32');
			_b64url		= _unique_id.toString('base64url');
			_ab			= _unique_id.bytes.buffer;
			_ba			= _unique_id.bytes;
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
			const newId = new UniqueId(_hex, 'hex');
			assert( newId.compare(_unique_id) === 0 );
		});
		
		unit_test( "Creating an UniqueId instance from hex string alt", ()=>{
			const newId = new UniqueId(_b16, 16);
			assert( newId.compare(_unique_id) === 0 );
		});
		
		unit_test( "Creating an UniqueId instance from bit string", ()=>{
			const newId = new UniqueId(_bits, 'bits');
			assert( newId.compare(_unique_id) === 0 );
		});
		
		unit_test( "Creating an UniqueId instance from bit string alt", ()=>{
			const newId = new UniqueId(_b2, 2);
			assert( newId.compare(_unique_id) === 0 );
		});
		
		unit_test( "Creating an UniqueId instance from base64 string", ()=>{
			const newId = new UniqueId(_b64, "base64");
			assert( newId.compare(_unique_id) === 0 );
		});
		
		unit_test( "Creating an UniqueId instance from base64url string", ()=>{
			const newId = new UniqueId(_b64url, "base64url");
			assert( newId.compare(_unique_id) === 0 );
		});
		
		unit_test( "Creating an UniqueId instance from base32 string", ()=>{
			const newId = new UniqueId(_b32, "base32");
			assert( newId.compare(_unique_id) === 0 );
		});
		
		unit_test( "Comparing UniqueId one generated from the past", ()=>{
			const newId = new UniqueId(_unique_id);
			assert( newId.compare(_past) > 0 );
		});
	});
});
