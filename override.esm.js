/**
 *	Author: JCloudYu
 *	Create: 2019/05/26
**/

import {
	ObjectDefineProperties,
	ObjectDefineProperty,
	ObjectMerge,
	PromiseWaitAll,
	FlattenedPromise,
	ThrottledTimeout,
	ThrottledTimer,
	TypeOf
} from "./lib/native-extension.esm.js";



Object.defineProperties = ObjectDefineProperties;
Object.defineProperty = ObjectDefineProperty;
Object.merge = ObjectMerge;
Object.typeOf = TypeOf;

Promise.wait = PromiseWaitAll;
Promise.flat = FlattenedPromise;

setTimeout.throttled = ThrottledTimeout;
setInterval.throttled = ThrottledTimer;
