/**
 *	Author: JCloudYu
 *	Create: 2019/01/14
**/
(()=>{
	"use strict";
	
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
	const PRESET = Object.create(null);
	for(const [begin, end, color_name] of DEFAULT_COLOR_SET) {
		const preset = {};
		Object.defineProperties(preset, {
			begin:{value:`\u001b[${begin}m`, enumerable:true},
			end:{value:`\u001b[${end}m`, enumerable:true}
		});
		Object.defineProperty(PRESET, color_name, {value:preset, enumerable:true});
	}
	
	
	
	const CONTROL_STACK	= [{ begin:'\u001b[39m', end: '\u001b[39m'}];
	const COLOR_CONTROL	= Object.create(null);
	for( const idx in PRESET ) {
		const color = PRESET[idx];
		Object.defineProperty(COLOR_CONTROL, idx, {get:()=>{ CONTROL_STACK.push(color); return color.begin; }, enumerable:true});
	}
	Object.defineProperty(COLOR_CONTROL, 'clear', {get:()=>{
		if ( CONTROL_STACK.length > 1 ) { CONTROL_STACK.pop(); }
		return CONTROL_STACK[CONTROL_STACK.length-1].begin;
	}, enumerable:true});
	Object.defineProperty(COLOR_CONTROL, 'purge', {get:()=>{
		CONTROL_STACK.splice(1);
		return CONTROL_STACK[0].begin;
	}, enumerable:true});
	
	
	
	const SIMPLE_RENDER = (color, output)=>{
		return `${COLOR_CONTROL[color]}${output}${COLOR_CONTROL.clear}`;
	};
	class Color {
		static reset(output){ return SIMPLE_RENDER('reset', output); }
		
		static bold(output){ return SIMPLE_RENDER('bold', output); }
		static dim(output){ return SIMPLE_RENDER('dim', output); }
		static italic(output){ return SIMPLE_RENDER('italic', output); }
		static underline(output){ return SIMPLE_RENDER('underline', output); }
		static inverse(output){ return SIMPLE_RENDER('inverse', output); }
		static hidden(output){ return SIMPLE_RENDER('hidden', output); }
		static strikethrough(output){ return SIMPLE_RENDER('strikethrough', output); }
		
		static black(output){ return SIMPLE_RENDER('black', output); }
		static red(output){ return SIMPLE_RENDER('red', output); }
		static green(output){ return SIMPLE_RENDER('green', output); }
		static yellow(output){ return SIMPLE_RENDER('yellow', output); }
		static blue(output){ return SIMPLE_RENDER('blue', output); }
		static magenta(output){ return SIMPLE_RENDER('magenta', output); }
		static cyan(output){ return SIMPLE_RENDER('cyan', output); }
		static gray(output){ return SIMPLE_RENDER('gray', output); }
		static darkGray(output){ return SIMPLE_RENDER('darkGray', output); }
		static lightRed(output){ return SIMPLE_RENDER('lightRed', output); }
		static lightGreen(output){ return SIMPLE_RENDER('lightGreen', output); }
		static lightYellow(output){ return SIMPLE_RENDER('lightYellow', output); }
		static lightBlue(output){ return SIMPLE_RENDER('lightBlue', output); }
		static lightMagenta(output){ return SIMPLE_RENDER('lightMagenta', output); }
		static lightCyan(output){ return SIMPLE_RENDER('lightCyan', output); }
		static white(output){ return SIMPLE_RENDER('white', output); }
		
		static bgBlack(output){ return SIMPLE_RENDER('bgBlack', output); }
		static bgRed(output){ return SIMPLE_RENDER('bgRed', output); }
		static bgGreen(output){ return SIMPLE_RENDER('bgGreen', output); }
		static bgYellow(output){ return SIMPLE_RENDER('bgYellow', output); }
		static bgBlue(output){ return SIMPLE_RENDER('bgBlue', output); }
		static bgMagenta(output){ return SIMPLE_RENDER('bgMagenta', output); }
		static bgCyan(output){ return SIMPLE_RENDER('bgCyan', output); }
		static bgGray(output){ return SIMPLE_RENDER('bgGray', output); }
		static bgDarkGray(output){ return SIMPLE_RENDER('bgDarkGray', output); }
		static bgLightRed(output){ return SIMPLE_RENDER('bgLightRed', output); }
		static bgLightGreen(output){ return SIMPLE_RENDER('bgLightGreen', output); }
		static bgLightYellow(output){ return SIMPLE_RENDER('bgLightYellow', output); }
		static bgLightBlue(output){ return SIMPLE_RENDER('bgLightBlue', output); }
		static bgLightMagenta(output){ return SIMPLE_RENDER('bgLightMagenta', output); }
		static bgLightCyan(output){ return SIMPLE_RENDER('bgLightCyan', output); }
		static bgWhite(output){ return SIMPLE_RENDER('bgWhite', output); }
	}
	
	module.exports = { PRESET, CtrlCode:COLOR_CONTROL, Color };
})();
