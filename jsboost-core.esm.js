/**
 *	Author: JCloudYu
 *	Create: 2018/12/22
**/
export const ___IS_NODEJS = (typeof Buffer !== "undefined");

import * as ANSIColor from "./lib/ansi-vt100-colors.esm.js";
import * as Base64 from "./lib/base64.esm.js";
import * as Base32Hex from "./lib/base32.esm.js";
import * as Timer from "./lib/ext-timer.esm.js";
import * as Cookie from "./lib/http-cookies.esm.js";

export * from "./lib/versioning.esm.js";
export * from "./lib/throttled-queue.esm.js";
export * from "./lib/event-emitter.esm.js";
export * from "./lib/dom-event-emitter.esm.js";
export * from "./lib/utf8string.esm.js";



export * from "./lib/ext-promise.esm.js";
export * from "./lib/js-assert.esm.js";
export * from "./lib/levelfy-logger.esm.js";
export * from "./lib/state-machine.esm.js";
export * from "./lib/ext-object.esm.js";



// DEPRECATED: The following exports will be removed in jsboost@2.0.0 or upper
export {ThrottledTimer as SingletonInterval, ThrottledTimeout as SingletonTimeout, ThrottledTimer, ThrottledTimeout, Idle} from "./lib/ext-timer.esm.js";
export {Encode as Base32Encode, Decode as Base32Decode} from "./lib/base32.esm.js";
export {Encode as Base64Encode, URLEncode as Base64URLEncode, Decode as Base64Decode} from "./lib/base64.esm.js";

export {
	ANSIColor, Base32Hex, Base64, Timer, Cookie
};

