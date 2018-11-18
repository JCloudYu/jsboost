/**
 *	Author: JCloudYu
 *	Create: 2018/11/16
**/
((exports)=>{
	"use strict";
	
	const LOG_LEVEL = {
		SILENT:  1,
		ERROR:	 2,
		WARN:	 3,
		NOTICE:	 4,
		INFO:	 5,
		DEBUG:	 6,
		SILLY:	 7
	};
	const BUILT_IN_CONSOLE_LOG = console.log.bind(console);
	const LOG_LEVEL_RMAP	= ['silent', 'error', 'warn', 'notice', 'info', 'debug', 'silly'];
	const DEFAULT_LOG_LEVEL = LOG_LEVEL.INFO;
	
	
	
	const _WEAK_MAP = new WeakMap();
	class LevelfyLogger {
		constructor() {
			const _PRIVATE = {
				logLevel:DEFAULT_LOG_LEVEL,
				pipes:[]
			};
			_WEAK_MAP.set(this, _PRIVATE);
		}
		log(...data) {
			this._writeLog( LOG_LEVEL.INFO, ...data );
			return this;
		}
		error(...data) {
			this._writeLog( LOG_LEVEL.ERROR, ...data );
			return this;
		}
		warn(...data) {
			this._writeLog( LOG_LEVEL.WARN, ...data );
			return this;
		}
		notice(...data) {
			this._writeLog( LOG_LEVEL.NOTICE, ...data );
			return this;
		}
		info(...data) {
			this._writeLog( LOG_LEVEL.INFO, ...data );
			return this;
		}
		debug(...data) {
			this._writeLog( LOG_LEVEL.DEBUG, ...data );
			return this;
		}
		chainTo(receiver) {
			if ( (Object(receiver) !== receiver) || (typeof receiver._writeLog !== "function") ) {
				throw new TypeError( "The piped target must also be an object that implements _writeLog protocol!" );
			}
			
			const {pipes} = _WEAK_MAP.get(this);
			pipes.push(receiver);
			
			return this;
		}
		_writeLog(level, ...data) {
			const {logLevel, pipes} = _WEAK_MAP.get(this);
			
			if ( logLevel >= level ) {
				switch(level) {
					case LOG_LEVEL.ERROR:
					case LOG_LEVEL.WARN:
					case LOG_LEVEL.NOTICE:
					case LOG_LEVEL.INFO:
					case LOG_LEVEL.DEBUG:
						BUILT_IN_CONSOLE_LOG(...data);
						break;
					default:
						break;
				}
				
				for ( let pipe of pipes ) {
					pipe._writeLog(level, ...data);
				}
			}
		}
		
		get logLevel() {
			let {logLevel} = _WEAK_MAP.get(this);
			return LOG_LEVEL_RMAP[logLevel];
		}
		set logLevel(val) {
			let level, type = typeof val;
			if ( type === "string" ) {
				level = LOG_LEVEL[val.toUpperCase()];
			}
			else
			if ( type === "number" ) {
				level = LOG_LEVEL_RMAP[val] ? val : undefined;
			}
			
			
			
			if ( !level ) {
				throw new RangeError( "Given level is not acceptable" )
			}
			
			_WEAK_MAP.get(this).logLevel = level;
		}
	}
	Object.defineProperty(LevelfyLogger, 'LogLevel', {value:{}, enumerable:true});
	Object.defineProperties(LevelfyLogger.LogLevel, {
		SILENT:{value:1, enumerable:true},
		ERROR:{value:2, enumerable:true},
		WARN:{value:3, enumerable:true},
		NOTICE:{value:4, enumerable:true},
		INFO:{value:5, enumerable:true},
		DEBUG:{value:6, enumerable:true},
		SILLY:{value:7, enumerable:true}
	});
	
	Object.defineProperty(LevelfyLogger, 'ShadowConsole', {
		value:(()=>{
			const ORIGNAL_CONSOLE	= {
				log: console.log,
				error: console.error,
				warn: console.warn,
				info: console.info,
				debug: console.debug
			};
			const DEFAULT_LOGGER	= new LevelfyLogger();
			
			let shadowed = false;
			return (restore=false)=>{
				if (!restore) {
					if (shadowed) return;
					
					Object.defineProperty(console, 'logLevel', {
						get:()=>{ return DEFAULT_LOGGER.logLevel; },
						set:(level)=>{ DEFAULT_LOGGER.logLevel = level; },
						enumerable:true
					});
					
					console.log		= DEFAULT_LOGGER._writeLog.bind(DEFAULT_LOGGER, LOG_LEVEL.INFO);
					console.error	= DEFAULT_LOGGER._writeLog.bind(DEFAULT_LOGGER, LOG_LEVEL.ERROR);
					console.warn	= DEFAULT_LOGGER._writeLog.bind(DEFAULT_LOGGER, LOG_LEVEL.WARN);
					console.notice	= DEFAULT_LOGGER._writeLog.bind(DEFAULT_LOGGER, LOG_LEVEL.NOTICE);
					console.info	= DEFAULT_LOGGER._writeLog.bind(DEFAULT_LOGGER, LOG_LEVEL.INFO);
					console.debug	= DEFAULT_LOGGER._writeLog.bind(DEFAULT_LOGGER, LOG_LEVEL.DEBUG);
				}
				else {
					console.log		= ORIGNAL_CONSOLE.log;
					console.error	= ORIGNAL_CONSOLE.error;
					console.warn	= ORIGNAL_CONSOLE.warn;
					console.notice	= ORIGNAL_CONSOLE.notice;
					console.info	= ORIGNAL_CONSOLE.info;
					console.debug	= ORIGNAL_CONSOLE.debug;
				}
			}
		})(), enumerable:true
	});
	
	
	
	exports.LevelfyLogger = LevelfyLogger;
})((typeof window !== "undefined") ? window : (typeof module !== "undefined" ? module.exports : {}));

