export function Name() { return "Aula F87"; } //名称
export function VendorId() { return 0x258A; }
export function ProductId() { return 0x010C; }
export function Publisher() { return "Nollie"; } //发布者
export function Size() { return [21, 6]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 12.0}
/* 
Time:2023/5/26
Author: Nollie
Version:V0.1
*/
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}

const vKeys = 
[
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
	35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 
	53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
	70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
	87, 88, 89, 90, 91, 92, 93, 94,95  ,96,97,98,99,100,101
];
const vKeyPositions = 
[[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 0], [2, 1],
 [2, 2], [2, 3], [2, 4], [2, 5], [3, 0], [3, 1], [4, 2], [4, 3], [4, 4], [1, 6], [4, 0], [4, 1], [5, 2], [5, 3],
 [5, 4], [2, 6], [5, 0], [5, 1], [6, 2], [6, 3], [6, 4], [6, 5], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [3, 6],
 [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [4, 6], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [10, 0], [10, 1],
 [10, 2], [10, 3], [10, 4], [10, 5], [12, 0], [11, 1], [12, 2], [12, 3], [13, 4], [13, 5], [13, 0], [12, 1], [13, 2],
 [13, 3], [13, 4], [6, 6], [14, 0], [13, 1], [14, 2], [7, 6], [8, 6], [14, 6], [15, 0], [15, 1], [15, 2], [15, 3],
 [14, 4], [15, 5], [10, 6], [17, 0], [17, 1], [17, 2], [17, 3], [16, 6], [18, 0], [18, 1], [18, 2], [18, 3], [18, 4], [18, 5],
 [19, 0], [19, 1], [19, 2], [19, 3], [19, 4], [19, 5]
 ];


const vKeyNames = 
[
'ESC', '~', 'TAB', 'CAPS LOCK', 'SHIFT', 'CTRL', 'NULL1', '1', 'Q', 'A', 'Z', 
'WIN', 'F1', '2', 'W', 'S', 'X', 'ALT_R', 'F2', '3', 'E',
 'D', 'C', 'NULL2', 'F3', '4', 'R', 'F', 'V', 'NULL3', 'F4', 
 '5', 'T', 'G', 'B', 'SPACE', 'F5', '6', 'Y', 'H', 'N', 'NULL4',
 'F6', '7', 'U', 'J', 'M', 'NULL5', 'F7', '8', 'I', 'K', '<', 
 'ALT_L', 'F8', '9', 'O', 'L', '>', 'FN', 'F9', '0', 'P', ';', '/',
 'CTRL_L', 'F10', '-', '[', '"', 'NULL6', 'NULL8', 'F11', '=', ']', 'NULL9', 'NULL10', 
 'NULL11', 'F12', 'BACK', '|', 'ENTER', 'SHIFT_', 'left', 'PrintScrn', 'Insert', 'Del', 'NULL12', 'NULL13', 'Left  Arrow',
 'ScrollLock', 'HOME', 'END', 'NULL14', 'Up Arrow', 'Down Arrow',
 'Pause Break', 'Page Up','Pgdn', 'NULL15','NULL16', 'Right Arrow'
];

// 	"KEY....",
// 	"Esc",     "F1","F2","F3","F4",   "F5","F6","F7","F8",    "F9", "F10", "F11", "F12",  "PrintScrn", "ScrollLock", "Pause Break",   
// 	"KEY.","KEY..","KEY...",
// 	"`","1","2",  "3", "4", "5", "6",  "7", "8", "9", "0", "-",  "+",   "BACKSPACE",  "Insert","Home","Page Up","Num Lock", "KEY/","KEY*","KEY-",
//   "Tab","Q","W","E",  "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\","Del","End","Pgdn","KEY7","KEY8","KEY9",
//   "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",  "Enter","KEY4", "KEY5","KEY6" , "KEY+" ,                                        
//   "Left Shift","Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift","Up Arrow","KEY1","KEY2","KEY3",                  
//   "Ctrl","Left Win", "Left Alt","Space","Right Alt", "Fn","Menu", "Right Ctrl", "Left  Arrow",  "Down Arrow",  "Right Arrow", "KEY0","KEY.", "KEY Enter"



function initpacket1()
{

  device.log("Nuonuo");



}



export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}

export function Initialize() {
	initpacket1();

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

	let packet = [0x06,0x08,0x00,0x00,0x01,0x00,0x7a,0x01];

	packet = packet.concat(rgbdata);	
	device.send_report(packet, 520)


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
	return endpoint.interface === 1 && endpoint.usage === 0x0001 && endpoint.usage_page === 0xff00;
}

export function Image() {
	return ""
}