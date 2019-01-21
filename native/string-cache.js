/**
 *	Author: JCloudYu
 *	Create: 2019/01/22
**/
(()=>{
	"use strict";
	const IN_NODEJS = (typeof Buffer !== "undefined");
	module.exports = class StringCache {
		constructor() {
			this._buffer = "";
			this._color	 = null;
		}
		writeLine(string) {
			return this.write(string, true);
		}
		write(string, newline=false) {
			if ( this._color ) {
				string = this._color.begin + string + this._color.end;
			}
		
			this._buffer += string;
			if ( newline ) {
				this._buffer += "\n";
			}
			
			return this;
		}
		flush(output=undefined) {
			if ( !output ) {
				const buff = this._buffer;
				this._buffer = "";
				return buff;
			}
			
			if ( output === console ) {
				console.log(this._buffer);
			}
			else
			if ( Object(output) === output && typeof output.write === "function" ) {
				output.write(this._buffer);
			}
			else
			if ( IN_NODEJS && output instanceof console.Console ) {
				console.log(this._buffer);
			}
			
			this._buffer = "";
			return undefined;
		}
		toString() {
			return this._buffer;
		}
		[Symbol.toPrimitive]() {
			return this._buffer;
		}
		
		get color() {return this._color;}
		set color(value) {
			if ( Object(value) !== value ) { this._color = null; return; }
			if ( typeof value.begin !== "string" || typeof value.end !== "string" ) { this._color = null; return; }
			this._color = value;
		}
		get size() {
			return this._buffer;
		}
		static Cache() {
			return new StringCache();
		}
	}
})();
