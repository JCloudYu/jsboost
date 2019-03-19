# JS Boost #
This library is aimed to provide varieties of javascript tools for developers in both native browser and nodejs platform.

## Use in native browser environment ##
Use following line to import the module.
```javascript
import * as JSBoost from "https://cdn.jsdelivr.net/gh/JCloudYu/jsboost/jsboost.esm.js";
```

**Note that the whole module registered in npm is browser compatible. So you can use following line if you want to install and control the version via npm.**
```javascript
import * as JSBoost from "./node_modules/jsboost/jsboost.esm.js";
```

## Use in NodeJS environment ##
Install the package via following line.
```sh
npm install jsboost
```

Use following line to import the module.
```javascript
import * from "jsboost";
```

### Some tiny preparations to use this module ###
#### Distinct ES6 module from extension is SHIT ####
This module is designed to run in browser and nodejs environment. However, the normal web server doesnt recognize _**mjs**_ extension by default, and I don't want to maintain two piles of codes. Plus I don't really like the this _**mjs**_ shit.  So I decide to make this library to natively support the browser environment and have the nodejs users to to some preparation works to use this library. ( After all, nodejs is for backend scripts, you can do whatever you want, including this tiny preparations... )

#### The prepartions ####
You have to use the following lines to execute node js to enable es modules and load the corresponding loader. 

_**The esm-js.loader.mjs is located in this repo at position .\_/esm-js.loader.js**_
```sh
node --experimental-modules --loader esm-js.loader.mjs [YOUR BOOT SCRIPT]
```

## Module & API List ##
- **jsboost**
    - **\_\_\_IS\_WIN** _**( NodeJS only )**_
        This is a boolean value that indicates whether current _**NODEJS**_ instance is executing on Windows platform.
    - **Version**
        A library that can parse _**[semver](https://semver.org/)**_ compatible strings and compare the priorities among them. 
    - **ThrottledQueue**
        A library that provides the throttled consumption mechanism for developers to solve the rancing conditions among the asynchronous operations.
    - **Base32Hex**
        The library that can generate and parse strings encoded as _**[base32hex](https://en.wikipedia.org/wiki/Base32#base32hex)**_ format
    - **Base64**
        The library that can generate and parse strings encoded as _**base64**_ or _**base64url**_ format
    - **DOMEventEmitter**
        Another event emitter that provides interface that is similar to _**[DOM Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)**_ object
    - **EventEmitter**
        Another implementation of NodeJS styled _**[EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)**_
    - **Timer**
        The helper functions that help developers to deal with timers