/**
 *	Author: JCloudYu
 *	Create: 2019/07/19
**/
import {BuildArrayBuffer, CastArrayBufferToString, ExtractArrayBuffer} from "./_helper.esm.js";

// See http://www.isthe.com/chongo/tech/comp/fnv/#FNV-param for the definition of these parameters;
const FNV_PRIME_HIGH = 0x0100, FNV_PRIME_LOW = 0x0193;	// 16777619 0x01000193
const OFFSET_BASIS = Buffer.from([0xC5, 0x9D, 0x1C, 0x81]);	// 2166136261 [0x81, 0x1C, 0x9D, 0xC5]
const HOSTNAME_CANDIDATES = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYZ_-";

export function fnv1a32(input){
	let octets = new Uint8Array(BuildArrayBuffer(input));
	
	const HASH_RESULT = new Uint32Array(BuildArrayBuffer(OFFSET_BASIS));
	const RESULT_PROC = new Uint16Array(HASH_RESULT.buffer);
	for( let i = 0; i < octets.length; i += 1 ) {
		HASH_RESULT[0] = HASH_RESULT[0] ^ octets[i];
		
		let hash_low = RESULT_PROC[0], hash_high = RESULT_PROC[1];
		
		RESULT_PROC[0] = hash_low * FNV_PRIME_LOW;
		RESULT_PROC[1] = hash_low * FNV_PRIME_HIGH + hash_high * FNV_PRIME_LOW + (RESULT_PROC[0]>>>16);
	}
	return BuildArrayBuffer(HASH_RESULT[0]);
}



let PID = (Math.random() * 65535)|0;
let PPID = (Math.random() * 65535)|0;
let MACHINE_ID = fnv1a32((()=>{
	let count = 30, str = '';
	while(count-- > 0) {
		str += HOSTNAME_CANDIDATES[(Math.random() * HOSTNAME_CANDIDATES.length)|0]
	}
	return str;
})());

let SEQ_NUMBER = (Math.random() * Number.MAX_SAFE_INTEGER)|0;
export class UniqueId {
	constructor(id=null) {
		if ( typeof id === "string" ) {
			if ( id.length !== 48 ) {
				throw new RangeError( "Given id string must be a 24bytes data encoded with hex representation!" );
			}
			
			id = BuildArrayBuffer( id, "hex" );
		}
		else
		if ( id instanceof ArrayBuffer ) {
			id = id.slice(0);
		}
		else
		if ( id instanceof UniqueId ) {
			id = id.bytes.buffer.slice(0);
		}
		else
		if ( id instanceof Uint8Array ) {
			id = id.buffer;
		}
		else {
			const time	= BuildArrayBuffer(Date.now(), 'uint64');
			const pid	= BuildArrayBuffer(PID, 'uint16');
			const ppid	= BuildArrayBuffer(PPID, 'uint16');
			const inc	= BuildArrayBuffer((SEQ_NUMBER=(SEQ_NUMBER+1) % 0xffffff), 'uint32');
			const buff	= new Uint8Array(24);
			
			buff.set(new Uint8Array(time),		 0);	// [0-7] epoch time
			buff.set(new Uint8Array(MACHINE_ID), 8);	// [8-11] machine id
			buff.set(new Uint8Array(ppid),		 12);	// [12-15] ppid
			buff.set(new Uint8Array(pid),		 16);	// [16-19] pid
			buff.set(new Uint8Array(inc),		 20);	// [20-23] seq
			
			id = buff.buffer;
		}
		
		if ( !(id instanceof ArrayBuffer) || id.byteLength !== 24 ) {
			throw new TypeError( "Given input argument is invalid! Only ArrayBuffer, hex string or Uint8Array are accepted!" );
		}
		
		Object.defineProperty(this, 'bytes', {value:new Uint8Array(id), enumerable:true});
	}
	toString() {
		return CastArrayBufferToString(this.bytes.buffer, 16, true);
	}
	compare(other) {
		if ( other instanceof UniqueId ) {
			other = other.bytes.buffer;
		}
		
		const self = this.bytes;
		other = new Uint8Array(ExtractArrayBuffer(other));
		if ( other.length !== 24 ) { return 1; }
		for  ( let i=0; i<24; i++ ) {
			if ( self[i] < other[i] ) {
				return -1;
			}
			else
			if ( self[i] > other[i] ) {
				return 1;
			}
		}
		
		return 0;
	}
	toJSON() {
		return this.toString();
	}
	static from(input=null) {
		try { return new UniqueId(input); } catch(e) { return null; }
	}
}



export async function InitAccordingToEnv() {
	if ( typeof Buffer !== "undefined" ) {
		const {default:os} = await import('os');
		
		MACHINE_ID = fnv1a32(os.hostname());
		PID = process.pid;
		PPID = process.ppid;
	}
	else
	if ( typeof window !== "undefined" ) {
		MACHINE_ID = window.location.host;
	}
}
