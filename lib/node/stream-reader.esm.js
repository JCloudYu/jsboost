/**
 *	Author: JCloudYu
 *	Create: 2018/12/30
**/
import buffer from "buffer";
import process from "process";
import {EventEmitter} from "../event-emitter.esm.js";

const {Buffer} = buffer;



export class StreamReader extends EventEmitter {
	constructor(stream=null) {
		// ISSUE: Build a custom warning system to write warnings and record warning position
		process.stderr.write( "(jsboost) ExperimentalWarning: StreamReader module is experimental!\n" );
	
		super();
		
		this._stream	= null;
		this._cache		= Buffer.alloc(0);
		this._decoder	= StreamReader.___DEFAULT_DATA_DECODER;
		
		
		if ( stream ) {
			this.stream = stream;
		}
	}
	async awaitData() {
		return new Promise((resolve)=>{
			setTimeout(CHECK_DATA, 0, this, resolve);
			
			function CHECK_DATA(inst, resolve) {
				let data = inst.readData();
				if ( data === undefined ) {
					setTimeout(CHECK_DATA, 0, inst, resolve);
				}
				else {
					resolve(data);
				}
			}
		});
	}
	readData() {
		const EXTRACTED = this._decoder(this._cache);
		if ( !EXTRACTED ) {
			return undefined;
		}
		
		const {data, remain} = EXTRACTED;
		this._cache = remain;
		return data;
	}
	get stream() {
		return this._stream;
	}
	set stream(val) {
		if ( this._stream ) {
			this._stream.off('data');
		}
	
		this._stream = val;
		this._stream.on( 'data', (chunk)=>{
			this._cache = Buffer.concat([this._cache, chunk]);
		});
	}
	
	static ___DEFAULT_DATA_DECODER(input) {
		if ( input.length <= 0 ) {
			return null;
		}
		
		const data	 = input.slice(0, input.length);
		const remain = input.slice(input.length);
		return {data, remain}
	}
}
