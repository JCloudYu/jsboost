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