/**
 *	Author: JCloudYu
 *	Create: 2018/12/29
**/
const _ObjectDefineProperty = Object.defineProperty;
const _ObjectDefineProperties = Object.defineProperties;

export function ObjectDefineProperty(object, prop_name, prop_attr) {
	_ObjectDefineProperty(object, prop_name, prop_attr);
	return object;
}

_ObjectDefineProperty(ObjectDefineProperty, 'ShadowObject', {
	value:(restore=false)=>{
		_ObjectDefineProperties(Object, {
			defineProperty:{
				value: restore?_ObjectDefineProperty:ObjectDefineProperty,
				enumerable:false, configurable:true, writable:true
			}
		});
	},
	enumerable:false
});



export function ObjectDefineProperties(object, prop_contents) {
	_ObjectDefineProperties(object, prop_contents);
	return object;
}

_ObjectDefineProperty(ObjectDefineProperties, 'ShadowObject', {
	value:(restore=false)=>{
		_ObjectDefineProperties(Object, {
			defineProperty:{
				value: restore?_ObjectDefineProperty:ObjectDefineProperties,
				enumerable:false, configurable:true, writable:true
			}
		});
	},
	enumerable:false
});
