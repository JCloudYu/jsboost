/**
 *    Author: JCloudYu
 *    Create: 2018/12/22
**/
const DEFAULT_COLOR_SET = [
	[ 0,  0, "reset"],
	
	[ 1, 22, "bold"],
	[ 2, 22, "dim"],
	[ 3, 23, "italic"],
	[ 4, 24, "underline"],
	[ 5, 25, "blink"],
	[ 7, 27, "inverse"],
	[ 8, 28, "hidden"],
	[ 9, 29, "strikethrough"],
	
	
	
	[30, 39, "black"],
	[31, 39, "red"],
	[32, 39, "green"],
	[33, 39, "yellow"],
	[34, 39, "blue"],
	[35, 39, "magenta"],
	[36, 39, "cyan"],
	[37, 39, "white"],
	[38, 39, "gray"],
	
	[90, 39, "darkGray"],
	[91, 39, "lightRed"],
	[92, 39, "lightGreen"],
	[93, 39, "lightYellow"],
	[94, 39, "lightBlue"],
	[95, 39, "lightMagenta"],
	[96, 39, "lightCyan"],
	[97, 39, "lightWhite"],
	
	
	
	[40, 49, "bgBlack"],
	[41, 49, "bgRed"],
	[42, 49, "bgGreen"],
	[43, 49, "bgYellow"],
	[44, 49, "bgBlue"],
	[45, 49, "bgMagenta"],
	[46, 49, "bgCyan"],
	[47, 49, "bgGray"],
	
	[100, 49, "bgDarkGray"],
	[101, 49, "bgLightRed"],
	[102, 49, "bgLightGreen"],
	[103, 49, "bgLightYellow"],
	[104, 49, "bgLightBlue"],
	[105, 49, "bgLightMagenta"],
	[106, 49, "bgLightCyan"],
	[107, 49, "bgWhite"]
];
export const PRESET = {};
for(const [begin, end, color_name] of DEFAULT_COLOR_SET) {
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
		_Renderer.set(this, { _queue: [] });
	}
	reset(scope=null) {
		this._session(PRESET.reset, scope);
	}
	bold(scope=null) {
		this._session(PRESET.bold, scope);
	}
	dim(scope=null) {
		this._session(PRESET.dim, scope);
	}
	italic(scope=null) {
		this._session(PRESET.italic, scope);
	}
	underline(scope=null) {
		this._session(PRESET.underline, scope);
	}
	inverse(scope=null) {
		this._session(PRESET.inverse, scope);
	}
	hidden(scope=null) {
		this._session(PRESET.hidden, scope);
	}
	strikethrough(scope=null) {
		this._session(PRESET.strikethrough, scope);
	}
	
	black(scope=null) {
		this._session(PRESET.black, scope);
	}
	red(scope=null) {
		this._session(PRESET.red, scope);
	}
	green(scope=null) {
		this._session(PRESET.green, scope);
	}
	yellow(scope=null) {
		this._session(PRESET.yellow, scope);
	}
	blue(scope=null) {
		this._session(PRESET.blue, scope);
	}
	magenta(scope=null) {
		this._session(PRESET.magenta, scope);
	}
	cyan(scope=null) {
		this._session(PRESET.cyan, scope);
	}
	gray(scope=null) {
		this._session(PRESET.gray, scope);
	}
	darkGray(scope=null) {
		this._session(PRESET.darkGray, scope);
	}
	lightRed(scope=null) {
		this._session(PRESET.lightRed, scope);
	}
	lightGreen(scope=null) {
		this._session(PRESET.lightGreen, scope);
	}
	lightYellow(scope=null) {
		this._session(PRESET.lightYellow, scope);
	}
	lightBlue(scope=null) {
		this._session(PRESET.lightBlue, scope);
	}
	lightMagenta(scope=null) {
		this._session(PRESET.lightMagenta, scope);
	}
	lightCyan(scope=null) {
		this._session(PRESET.lightCyan, scope);
	}
	white(scope=null) {
		this._session(PRESET.white, scope);
	}
	
	bgBlack(scope=null) {
		this._session(PRESET.bgBlack, scope);
	}
	bgRed(scope=null) {
		this._session(PRESET.bgRed, scope);
	}
	bgGreen(scope=null) {
		this._session(PRESET.bgGreen, scope);
	}
	bgYellow(scope=null) {
		this._session(PRESET.bgYellow, scope);
	}
	bgBlue(scope=null) {
		this._session(PRESET.bgBlue, scope);
	}
	bgMagenta(scope=null) {
		this._session(PRESET.bgMagenta, scope);
	}
	bgCyan(scope=null) {
		this._session(PRESET.bgCyan, scope);
	}
	bgGray(scope=null) {
		this._session(PRESET.bgGray, scope);
	}
	bgDarkGray(scope=null) {
		this._session(PRESET.bgDarkGray, scope);
	}
	bgLightRed(scope=null) {
		this._session(PRESET.bgLightRed, scope);
	}
	bgLightGreen(scope=null) {
		this._session(PRESET.bgLightGreen, scope);
	}
	bgLightYellow(scope=null) {
		this._session(PRESET.bgLightYellow, scope);
	}
	bgLightBlue(scope=null) {
		this._session(PRESET.bgLightBlue, scope);
	}
	bgLightMagenta(scope=null) {
		this._session(PRESET.bgLightMagenta, scope);
	}
	bgLightCyan(scope=null) {
		this._session(PRESET.bgLightCyan, scope);
	}
	bgWhite(scope=null) {
		this._session(PRESET.bgWhite, scope);
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
	static reset(scope) {
		Renderer.Session(scope, PRESET.reset);
	}
	static bold(scope) {
		Renderer.Session(scope, PRESET.bold);
	}
	static dim(scope) {
		Renderer.Session(scope, PRESET.dim);
	}
	static italic(scope) {
		Renderer.Session(scope, PRESET.italic);
	}
	static underline(scope) {
		Renderer.Session(scope, PRESET.underline);
	}
	static inverse(scope) {
		Renderer.Session(scope, PRESET.inverse);
	}
	static hidden(scope) {
		Renderer.Session(scope, PRESET.hidden);
	}
	static strikethrough(scope) {
		Renderer.Session(scope, PRESET.strikethrough);
	}
	
	static black(scope) {
		Renderer.Session(scope, PRESET.black);
	}
	static red(scope) {
		Renderer.Session(scope, PRESET.red);
	}
	static green(scope) {
		Renderer.Session(scope, PRESET.green);
	}
	static yellow(scope) {
		Renderer.Session(scope, PRESET.yellow);
	}
	static blue(scope) {
		Renderer.Session(scope, PRESET.blue);
	}
	static magenta(scope) {
		Renderer.Session(scope, PRESET.magenta);
	}
	static cyan(scope) {
		Renderer.Session(scope, PRESET.cyan);
	}
	static gray(scope) {
		Renderer.Session(scope, PRESET.gray);
	}
	static darkGray(scope) {
		Renderer.Session(scope, PRESET.darkGray);
	}
	static lightRed(scope) {
		Renderer.Session(scope, PRESET.lightRed);
	}
	static lightGreen(scope) {
		Renderer.Session(scope, PRESET.lightGreen);
	}
	static lightYellow(scope) {
		Renderer.Session(scope, PRESET.lightYellow);
	}
	static lightBlue(scope) {
		Renderer.Session(scope, PRESET.lightBlue);
	}
	static lightMagenta(scope) {
		Renderer.Session(scope, PRESET.lightMagenta);
	}
	static lightCyan(scope) {
		Renderer.Session(scope, PRESET.lightCyan);
	}
	static white(scope) {
		Renderer.Session(scope, PRESET.white);
	}
	
	static bgBlack(scope) {
		Renderer.Session(scope, PRESET.bgBlack);
	}
	static bgRed(scope) {
		Renderer.Session(scope, PRESET.bgRed);
	}
	static bgGreen(scope) {
		Renderer.Session(scope, PRESET.bgGreen);
	}
	static bgYellow(scope) {
		Renderer.Session(scope, PRESET.bgYellow);
	}
	static bgBlue(scope) {
		Renderer.Session(scope, PRESET.bgBlue);
	}
	static bgMagenta(scope) {
		Renderer.Session(scope, PRESET.bgMagenta);
	}
	static bgCyan(scope) {
		Renderer.Session(scope, PRESET.bgCyan);
	}
	static bgGray(scope) {
		Renderer.Session(scope, PRESET.bgGray);
	}
	static bgDarkGray(scope) {
		Renderer.Session(scope, PRESET.bgDarkGray);
	}
	static bgLightRed(scope) {
		Renderer.Session(scope, PRESET.bgLightRed);
	}
	static bgLightGreen(scope) {
		Renderer.Session(scope, PRESET.bgLightGreen);
	}
	static bgLightYellow(scope) {
		Renderer.Session(scope, PRESET.bgLightYellow);
	}
	static bgLightBlue(scope) {
		Renderer.Session(scope, PRESET.bgLightBlue);
	}
	static bgLightMagenta(scope) {
		Renderer.Session(scope, PRESET.bgLightMagenta);
	}
	static bgLightCyan(scope) {
		Renderer.Session(scope, PRESET.bgLightCyan);
	}
	static bgWhite(scope) {
		Renderer.Session(scope, PRESET.bgWhite);
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
	static gray(output){ return SIMPLE_RENDER(PRESET.gray, output); }
	static darkGray(output){ return SIMPLE_RENDER(PRESET.darkGray, output); }
	static lightRed(output){ return SIMPLE_RENDER(PRESET.lightRed, output); }
	static lightGreen(output){ return SIMPLE_RENDER(PRESET.lightGreen, output); }
	static lightYellow(output){ return SIMPLE_RENDER(PRESET.lightYellow, output); }
	static lightBlue(output){ return SIMPLE_RENDER(PRESET.lightBlue, output); }
	static lightMagenta(output){ return SIMPLE_RENDER(PRESET.lightMagenta, output); }
	static lightCyan(output){ return SIMPLE_RENDER(PRESET.lightCyan, output); }
	static white(output){ return SIMPLE_RENDER(PRESET.white, output); }
	
	static bgBlack(output){ return SIMPLE_RENDER(PRESET.bgBlack, output); }
	static bgRed(output){ return SIMPLE_RENDER(PRESET.bgRed, output); }
	static bgGreen(output){ return SIMPLE_RENDER(PRESET.bgGreen, output); }
	static bgYellow(output){ return SIMPLE_RENDER(PRESET.bgYellow, output); }
	static bgBlue(output){ return SIMPLE_RENDER(PRESET.bgBlue, output); }
	static bgMagenta(output){ return SIMPLE_RENDER(PRESET.bgMagenta, output); }
	static bgCyan(output){ return SIMPLE_RENDER(PRESET.bgCyan, output); }
	static bgGray(output){ return SIMPLE_RENDER(PRESET.bgGray, output); }
	static bgDarkGray(output){ return SIMPLE_RENDER(PRESET.bgDarkGray, output); }
	static bgLightRed(output){ return SIMPLE_RENDER(PRESET.bgLightRed, output); }
	static bgLightGreen(output){ return SIMPLE_RENDER(PRESET.bgLightGreen, output); }
	static bgLightYellow(output){ return SIMPLE_RENDER(PRESET.bgLightYellow, output); }
	static bgLightBlue(output){ return SIMPLE_RENDER(PRESET.bgLightBlue, output); }
	static bgLightMagenta(output){ return SIMPLE_RENDER(PRESET.bgLightMagenta, output); }
	static bgLightCyan(output){ return SIMPLE_RENDER(PRESET.bgLightCyan, output); }
	static bgWhite(output){ return SIMPLE_RENDER(PRESET.bgWhite, output); }
	
	static color(color, output) {
		return SIMPLE_RENDER(color, output);
	}
}
