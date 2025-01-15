export function Name() { return "GS 3104T PRO"; } //名称
export function VendorId() { return 0x05AC; }
export function ProductId() { return 0x024F; }
export function Publisher() { return "Nollie & I'm Not MentaL"; } //发布者
export function Size() { return [110, 32]; }
export function Type() { return "Hid"; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0}

export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}
/* 
Time:		28/03/2024
Author: 	I'm Not MentaL & Nollie(Nuonuo)
Version:	V0.1
*/
const indexes = [0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x70,0x71,0x73,0x10,0x0f,0x0e,0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x67,0x74,0x75,0x76,0x20,0x21,0x22,0x7a,0x25,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x31,0x43,0x77,0x78,0x79,0x32,0x33,0x34,0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,0x3e,0x3f,0x40,0x41,0x42,0x55,0x44,0x45,0x46,0x7b,0x49,0x4a,0x4b,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x52,0x53,0x54,0x65,0x56,0x57,0x58,0x5b,0x5c,0x5d,0x5e,0x5f,0x60,0x61,0x62,0x63,0x64,0x66,0x68,0x69,0x6a]
//高端的代码往往只需要最朴素的方式
const vKeys = 
[
    1,      2,  3,  4,  5,    6,  7,  8,  9,  10, 11, 12, 13,   14, 15, 16,                     //16
    20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,   33,   34, 35, 36,   37, 38, 39, 40,   //21
	 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,  54,   55, 56, 57,   58, 59, 60,       //20
	  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,   73,                   74, 75, 76, 77,   //17
	   78,  79, 80, 81, 82, 83, 84, 85, 86,87, 88,       89,         90,      91, 92, 93,       //16
    94, 95, 96,             97,         98,  99,  100,  101,    102,103,104,     105,106,107    //14
];
const vKeyPositions = 
[[2, 0],         [12, 0], [17, 0], [22, 0], [27, 0], [35, 0], [40, 0], [45, 0], [50, 0], [57, 0], [62, 0], [67, 0], [72, 0],   [78, 0], [83, 0], [88, 0],
 [2, 7], [7, 7], [12, 7], [17, 7], [22, 7], [27, 7], [32, 7], [37, 7], [42, 7], [47, 7], [52, 7], [57, 7], [62, 7], [69, 7],   [78, 7], [83, 7], [88, 7],[94, 7], [99, 7], [104,7], [109,7], 
 [4, 12], [10, 12], [15, 12], [20, 12], [25, 12], [30, 12], [35, 12], [40, 12], [45, 12], [50, 12], [55, 12], [60, 12], [65, 12], [71, 12],   [78, 12], [83, 12], [88, 12],[94, 12], [99, 12], [104, 12], 
 [5, 17], [11, 17], [16, 17], [21, 17], [26, 17], [31, 17], [36, 17], [41, 17], [46, 17], [51, 17], [56, 17], [61, 17],          [68, 17],                             [94, 17], [99, 17], [104, 17], [109, 15], 
 [6, 22],         [13, 22], [18, 22], [23, 22], [28, 22], [33, 22], [38, 22], [43, 22], [48, 22], [53, 22], [58, 22],          [68, 22],            [83, 22],         [94, 22], [99, 22], [104, 22],
 [3, 27], [9, 27], [15, 27],                         [34, 27],                         [52, 27], [59, 27], [65, 27], [71, 27],   [78,27], [83, 27], [88, 27],     [97, 27],     [104, 27], [109, 25]];
const vKeyNames = 
[
	"Esc",     "F1","F2","F3","F4",   "F5","F6","F7","F8",    "F9", "F10", "F11", "F12",  "PrintScrn","ScrollLock","Pause Break",   
	"`","1", "2", "3", "4", "5", "6",  "7", "8", "9", "0", "-",  "+",   "BACKSPACE",      "Insert",   "Home",       "Page Up",      "Num Lock","/",    "*",  "-",
    "Tab", "Q", "W","E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\",               "Del",       "End",        "Pgdn",        "KEY7",    "KEY8","KEY9",
    "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",   "Enter",                                                   "KEY4",    "KEY5","KEY6","KEY+" ,                                        
    "Left Shift","Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift",                       "Up Arrow",                 "KEY1",    "KEY2","KEY3",                 
    "Ctrl","Left Win", "Left Alt",    "Space",    "Right Alt", "Fn","Menu", "Right Ctrl", "Left Arrow","Down Arrow","Right Arrow",  "KEY0",      "KEY.", "KEY Enter"
 ];

function refresh()
{
	let packet = new Array(65).fill(0);
	device.send_report(packet, 65);
	device.pause(1);
	packet[1] = 0x04;
	packet[2] = 0x02;
	device.send_report(packet, 65);
	device.pause(1);
	let data = new Array(65).fill(0);
	device.get_report(data,65);
	device.pause(1);

}
function start_refresh()
{
	let packet = new Array(65).fill(0);
	packet[1] = 0x04;
	packet[2] = 0x20;
	packet[9] = 0x08;
	device.send_report(packet, 65);
	device.pause(1);
	let data = new Array(65).fill(0);
	device.get_report(data,65);
	device.pause(1);
	
	// device.send_report(data,1);
}




export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}

export function Initialize() {

}



export function LedNames() {
	return vKeyNames;

}

export function LedPositions() {
	return vKeyPositions;
}

export function Render() {
	sendColors();
}

export function Shutdown() {

}

function sendColors(shutdown = false)
{
	let rgbdata = grabColors();
	let send_data = [];

	// packet = packet.concat(rgbdata);	
	for(var index = 0; index < 109; index++) //This will need rounded up to closest value for your board.
	{
		send_data.push(indexes[index],rgbdata[index * 3],rgbdata[index* 3 +1],rgbdata[index * 3 + 2])

	}	
	start_refresh();
	for(var index = 0; index <= 6; index++)
	{
		let packet = [0x00];
		packet.push(...send_data.splice(0, 64));
		device.send_report(packet, 65);
		device.pause(1);
	}	
	refresh();
	
}
function grabColors(shutdown = false) 
{
	let rgbdata = [];

	for(let iIdx = 0; iIdx < vKeys.length; iIdx++)
	{
		let iPxX = vKeyPositions[iIdx][0];
		let iPxY = vKeyPositions[iIdx][1];
		let color;

		if(shutdown)
		{
			color = hexToRgb(shutdownColor);
		}
		else if (LightingMode === "Forced")
		{
			color = hexToRgb(forcedColor);
		}
		else
		{
			color = device.color(iPxX, iPxY);
		}

		let iLedIdx = vKeys[iIdx] * 3;
		rgbdata[iLedIdx] = color[0];
		rgbdata[iLedIdx+1] = color[1];
		rgbdata[iLedIdx+2] = color[2];
	}

	let Fill = new Array(24).fill(0);
	rgbdata = rgbdata.concat(Fill);
	return rgbdata;
}
function hexToRgb(hex) 
{
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}

export function Validate(endpoint) {
	// return endpoint.interface === 1 && endpoint.usage === 0x0006 && endpoint.usage_page === 0x0001;
	return endpoint.interface === 2 && endpoint.usage === 0x0001 && endpoint.usage_page === 0xff13;
}

export function ImageUrl() {
	return "https://gitee.com/drgb-controller/drgb/raw/master/Image/Universal_keyboard.png"
}