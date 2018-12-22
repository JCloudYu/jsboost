import process from 'process';

const BaseURL = new URL("file://");
BaseURL.pathname = `${process.cwd()}/`;

export function resolve(specifier, parentModuleURL, defaultResolve) {
	if (specifier.substr(-7) === ".esm.js") {
		return {
			url: new URL(specifier, parentModuleURL||BaseURL).href,
			format: 'esm'
		};
	}
	
	return defaultResolve(specifier, parentModuleURL);
}
