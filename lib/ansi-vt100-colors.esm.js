/**
 *    Author: JCloudYu
 *    Create: 2018/12/22
**/
const DEFAULT_COLOR_SET = [
	["reset", 0,  0],
	
	["bold", 1, 22],
	["dim", 2, 22],
	["italic", 3, 23],
	["underline", 4, 24],
	["inverse", 7, 27],
	["hidden", 8, 28],
	["strikethrough", 9, 29],
	
	["black", 30, 39],
	["red", 31, 39],
	["green", 32, 39],
	["yellow", 33, 39],
	["blue", 34, 39],
	["magenta", 35, 39],
	["cyan", 36, 39],
	["white", 37, 39],
	["gray", 90, 39],
	
	["bgBlack", 40, 49],
	["bgRed", 41, 49],
	["bgGreen", 42, 49],
	["bgYellow", 43, 49],
	["bgBlue", 44, 49],
	["bgMagenta", 45, 49],
	["bgCyan", 46, 49],
	["bgWhite", 47, 49],
	
	["blackBG", 40, 49],
	["redBG", 41, 49],
	["greenBG", 42, 49],
	["yellowBG", 43, 49],
	["blueBG", 44, 49],
	["magentaBG", 45, 49],
	["cyanBG", 46, 49],
	["whiteBG", 47, 49]
];
export const PRESET = {};
for(const [color_name, begin, end] of DEFAULT_COLOR_SET) {
	const preset = {};
	Object.defineProperties(preset, {
		begin:{value:`\u001b[${begin}m`, enumerable:true},
		end:{value:`\u001b[${end}m`, enumerable:true}
	});
	Object.defineProperty(PRESET, color_name, {value:preset, enumerable:true});
}


const _Renderer = new WeakMap();
export class Renderer {
	constructor() {
		_Renderer.set(this, {
			_queue: []
		});
	}
	reset(scope=null){
		this._session(PRESET.reset, scope);
	}
	bold(scope=null){
		this._session(PRESET.bold, scope);
	}
	dim(scope=null){
		this._session(PRESET.dim, scope);
	}
	italic(scope=null){
		this._session(PRESET.italic, scope);
	}
	underline(scope=null){
		this._session(PRESET.underline, scope);
	}
	inverse(scope=null){
		this._session(PRESET.inverse, scope);
	}
	hidden(scope=null){
		this._session(PRESET.hidden, scope);
	}
	strikethrough(scope=null){
		this._session(PRESET.strikethrough, scope);
	}
	
	black(scope=null){
		this._session(PRESET.black, scope);
	}
	red(scope=null){
		this._session(PRESET.red, scope);
	}
	green(scope=null){
		this._session(PRESET.green, scope);
	}
	yellow(scope=null){
		this._session(PRESET.yellow, scope);
	}
	blue(scope=null){
		this._session(PRESET.blue, scope);
	}
	magenta(scope=null){
		this._session(PRESET.magenta, scope);
	}
	cyan(scope=null){
		this._session(PRESET.cyan, scope);
	}
	white(scope=null){
		this._session(PRESET.white, scope);
	}
	gray(scope=null){
		this._session(PRESET.gray, scope);
	}
	
	bgBlack(scope=null){
		this._session(PRESET.bgBlack, scope);
	}
	bgRed(scope=null){
		this._session(PRESET.bgRed, scope);
	}
	bgGreen(scope=null){
		this._session(PRESET.bgGreen, scope);
	}
	bgYellow(scope=null){
		this._session(PRESET.bgYellow, scope);
	}
	bgBlue(scope=null){
		this._session(PRESET.bgBlue, scope);
	}
	bgMagenta(scope=null){
		this._session(PRESET.bgMagenta, scope);
	}
	bgCyan(scope=null){
		this._session(PRESET.bgCyan, scope);
	}
	bgWhite(scope=null){
		this._session(PRESET.bgWhite, scope);
	}
	blackBG(scope=null){
		this._session(PRESET.blackBG, scope);
	}
	redBG(scope=null){
		this._session(PRESET.redBG, scope);
	}
	greenBG(scope=null){
		this._session(PRESET.greenBG, scope);
	}
	yellowBG(scope=null){
		this._session(PRESET.yellowBG, scope);
	}
	blueBG(scope=null){
		this._session(PRESET.blueBG, scope);
	}
	magentaBG(scope=null){
		this._session(PRESET.magentaBG, scope);
	}
	cyanBG(scope=null){
		this._session(PRESET.cyanBG, scope);
	}
	whiteBG(scope=null){
		this._session(PRESET.whiteBG, scope);
	}
	_session(color=null, scope=null) {
		if ( typeof scope !== "function" ) {
			return;
		}
		
		const {_queue} = _Renderer.get(this);
		
		if ( color ) _queue.push(color);
		scope.call(this, this);
		if ( color ) _queue.pop();
	}
	render(output) {
		const {_queue} = _Renderer.get(this);
	
		let _render_begin = '', _render_end = '';
		for(let i=0; i<_queue.length; i++) {
			const color = _queue[i];
			_render_begin += color.begin;
			_render_end = color.end + _render_end;
		}
		
		return `${_render_begin}${output}${_render_end}`;
	}
	
	static Session(scope, color=null) {
		if ( typeof scope !== "function" ) {
			return;
		}
		
		(new Renderer())._session(color, scope);
	}
	static reset(scope){
		Renderer.Session(scope, PRESET.reset);
	}
	static bold(scope){
		Renderer.Session(scope, PRESET.bold);
	}
	static dim(scope){
		Renderer.Session(scope, PRESET.dim);
	}
	static italic(scope){
		Renderer.Session(scope, PRESET.italic);
	}
	static underline(scope){
		Renderer.Session(scope, PRESET.underline);
	}
	static inverse(scope){
		Renderer.Session(scope, PRESET.inverse);
	}
	static hidden(scope){
		Renderer.Session(scope, PRESET.hidden);
	}
	static strikethrough(scope){
		Renderer.Session(scope, PRESET.strikethrough);
	}
	
	static black(scope){
		Renderer.Session(scope, PRESET.black);
	}
	static red(scope){
		Renderer.Session(scope, PRESET.red);
	}
	static green(scope){
		Renderer.Session(scope, PRESET.green);
	}
	static yellow(scope){
		Renderer.Session(scope, PRESET.yellow);
	}
	static blue(scope){
		Renderer.Session(scope, PRESET.blue);
	}
	static magenta(scope){
		Renderer.Session(scope, PRESET.magenta);
	}
	static cyan(scope){
		Renderer.Session(scope, PRESET.cyan);
	}
	static white(scope){
		Renderer.Session(scope, PRESET.white);
	}
	static gray(scope){
		Renderer.Session(scope, PRESET.gray);
	}
	static bgBlack(scope){
		Renderer.Session(scope, PRESET.bgBlack);
	}
	static bgRed(scope){
		Renderer.Session(scope, PRESET.bgRed);
	}
	static bgGreen(scope){
		Renderer.Session(scope, PRESET.bgGreen);
	}
	static bgYellow(scope){
		Renderer.Session(scope, PRESET.bgYellow);
	}
	static bgBlue(scope){
		Renderer.Session(scope, PRESET.bgBlue);
	}
	static bgMagenta(scope){
		Renderer.Session(scope, PRESET.bgMagenta);
	}
	static bgCyan(scope){
		Renderer.Session(scope, PRESET.bgCyan);
	}
	static bgWhite(scope){
		Renderer.Session(scope, PRESET.bgWhite);
	}
	static blackBG(scope){
		Renderer.Session(scope, PRESET.blackBG);
	}
	static redBG(scope){
		Renderer.Session(scope, PRESET.redBG);
	}
	static greenBG(scope){
		Renderer.Session(scope, PRESET.greenBG);
	}
	static yellowBG(scope){
		Renderer.Session(scope, PRESET.yellowBG);
	}
	static blueBG(scope){
		Renderer.Session(scope, PRESET.blueBG);
	}
	static magentaBG(scope){
		Renderer.Session(scope, PRESET.magentaBG);
	}
	static cyanBG(scope){
		Renderer.Session(scope, PRESET.cyanBG);
	}
	static whiteBG(scope){
		Renderer.Session(scope, PRESET.whiteBG);
	}
}



const SIMPLE_RENDER = (color, output)=>{
	return `${color.begin}${output}${color.end}`;
};
export class Color {
	static reset(output){ return SIMPLE_RENDER(PRESET.reset, output); }
	
	static bold(output){ return SIMPLE_RENDER(PRESET.bold, output); }
	static dim(output){ return SIMPLE_RENDER(PRESET.dim, output); }
	static italic(output){ return SIMPLE_RENDER(PRESET.italic, output); }
	static underline(output){ return SIMPLE_RENDER(PRESET.underline, output); }
	static inverse(output){ return SIMPLE_RENDER(PRESET.inverse, output); }
	static hidden(output){ return SIMPLE_RENDER(PRESET.hidden, output); }
	static strikethrough(output){ return SIMPLE_RENDER(PRESET.strikethrough, output); }
	
	static black(output){ return SIMPLE_RENDER(PRESET.black, output); }
	static red(output){ return SIMPLE_RENDER(PRESET.red, output); }
	static green(output){ return SIMPLE_RENDER(PRESET.green, output); }
	static yellow(output){ return SIMPLE_RENDER(PRESET.yellow, output); }
	static blue(output){ return SIMPLE_RENDER(PRESET.blue, output); }
	static magenta(output){ return SIMPLE_RENDER(PRESET.magenta, output); }
	static cyan(output){ return SIMPLE_RENDER(PRESET.cyan, output); }
	static white(output){ return SIMPLE_RENDER(PRESET.white, output); }
	static gray(output){ return SIMPLE_RENDER(PRESET.gray, output); }
	
	static bgBlack(output){ return SIMPLE_RENDER(PRESET.bgBlack, output); }
	static bgRed(output){ return SIMPLE_RENDER(PRESET.bgRed, output); }
	static bgGreen(output){ return SIMPLE_RENDER(PRESET.bgGreen, output); }
	static bgYellow(output){ return SIMPLE_RENDER(PRESET.bgYellow, output); }
	static bgBlue(output){ return SIMPLE_RENDER(PRESET.bgBlue, output); }
	static bgMagenta(output){ return SIMPLE_RENDER(PRESET.bgMagenta, output); }
	static bgCyan(output){ return SIMPLE_RENDER(PRESET.bgCyan, output); }
	static bgWhite(output){ return SIMPLE_RENDER(PRESET.bgWhite, output); }
	
	static blackBG(output){ return SIMPLE_RENDER(PRESET.blackBG, output); }
	static redBG(output){ return SIMPLE_RENDER(PRESET.redBG, output); }
	static greenBG(output){ return SIMPLE_RENDER(PRESET.greenBG, output); }
	static yellowBG(output){ return SIMPLE_RENDER(PRESET.yellowBG, output); }
	static blueBG(output){ return SIMPLE_RENDER(PRESET.blueBG, output); }
	static magentaBG(output){ return SIMPLE_RENDER(PRESET.magentaBG, output); }
	static cyanBG(output){ return SIMPLE_RENDER(PRESET.cyanBG, output); }
	static whiteBG(output){ return SIMPLE_RENDER(PRESET.whiteBG, output); }
	static color(color, output) {
		return SIMPLE_RENDER(color, output);
	}
}
