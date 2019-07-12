# JS Boost #
This library is a toolset that contains many different individual tools for developers to handle their project easier!
However, since that the tools within the library are independent to each other, developers must select the tools they need and import them on their own!
Their will be no central export mechanism that will collect everything together.

## Use in native browser environment ##
All the tools can be accessed via [JSDeliver](https://cdn.jsdelivr.net/gh/JCloudYu/jsboost/). Developers can import the library on their own.
Let's take Base64 for example! Base64 lib is locate at **\[root\]/base64.esm.js**. Developers can use following line to import this lib.
```javascript
import * as Base64 from "https://cdn.jsdelivr.net/gh/JCloudYu/jsboost/base64.esm.js";
```

**Note that the whole module registered in npm is browser compatible. So you can use following line if you want to install and control the version via npm.**
```javascript
import * as Base64 from "./node_modules/jsboost/base64.esm.js";
```

## Use in NodeJS environment ##
Since that this library is completely written using es module syntax, using this library in NodeJS environment is a little bit tricky.
Please follow the following steps to install and use this library!

1. Install the package via following line.
	```sh
	npm install jsboost
	```
2. Download the following loader script from [here](https://gist.github.com/JCloudYu/87b4a5caff65320557452167e3466dbb) and name it as **_loader.mjs_**
3. You can use this line 
	```javascript
	import * as Base64 from "//jsboost/base64.esm.js";
	```
	or this line
	```javascript
	import * as Base64 from "/node_modules/jsboost/base64.esm.js";
	```
	in your code to import the tool you want ( Let's still take Base64 for example ).
4. Run the script using following command
	```sh
	node --experimental-modules --loader ./loader.mjs [PATH_TO_YOUR_BOOT_SCRIPT]
	```

The loader script is used to tell the NodeJS environment to load the scripts ended with .esm.js as es modules not CommonJS modules.
The reason why I'm not using .mjs is that I want to make the scripts to be directly identified by web browsers without the need to add 
additional configuration to make the server respond correct content-type header. 'cause it will be difficult to do that if you're not hosting your own web server!


## Tool List ##
- **/version.esm.js**  
	A library that can parse _**[semver](https://semver.org/)**_ compatible strings and compare the priorities among them. 
	
- **/throttled-queue.esm.js**  
	A library that help developers to solve the rancing conditions among the asynchronous operations.

- **/base64.esm.js**  
	The library that can generate and parse strings encoded as _**base64**_ or _**base64url**_ format

- **/base32.esm.js**  
	The library that can generate and parse strings encoded as _**[base32hex](https://en.wikipedia.org/wiki/Base32#base32hex)**_ format

- **/dom-event-emitter.esm.js**  
	An event emitter that provides interface that is similar to _**[DOM Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)**_ object

- **/event-emitter.esm.js**  
	An implementation of NodeJS styled _**[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)**_

- **/http-cookies.esm.js**  
	A library that allows developers to generate and parse raw cookies

- **/utf8string.esm.js**  
	A library that provides conversion between utf16 string (js string) and utf8 string

- **/web/load-module.esm.js**  
	A tiny function that provides a polyfill of _**[Dynamic Import](https://github.com/tc39/proposal-dynamic-import)**_ 

- **/web/load-resource.esm.js**  
	A tiny function that allows developers to load batches of resources asynchronously.
