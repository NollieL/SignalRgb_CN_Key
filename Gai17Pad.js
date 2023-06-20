export function Name() { return "Gai17Pad"; } //名称
export function VendorId() { return 0x3061; }
export function ProductId() { return 0x4770; }
export function Publisher() { return "Nollie"; } //发布者
export function Size() { return [5, 5]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 12.0}

export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}
const indexes = [0x10,0x11];
//高端的代码往往只需要最朴素的方式
const vKeys = 
[
    0,  1,  2,  3, 4,  5,  6,  7,  8,  9, 10,11, 12, 13, 14,15, 16,17,18,19
];

const vKeyPositions =[
[3, 4], [2, 4], [0, 4], [2, 3], [1, 3], [0, 3], [2, 2], [1, 2], [0, 2], [3, 1], [2, 1], [1, 1], [0, 1], [3, 0], [2, 0], [1, 0], [0, 0], [4, 1], [4, 2], [4, 3]
];
// const vKeyNames = 
// [   "NumLock","Num /","Num *", "Num -", 
//     "Num 7", "Num 8", "Num 9",  
//     "Num 4", "Num 5", "Num 6", "Num +",    
//     "Num 1", "Num 2", "Num 3", "Num Enter",  
//     "Num 0", "Num ." 
//  ];

const vKeyNames = 
[  
	"Num Enter","Num ." ,"Num 0", "Num 3","Num 2", "Num 1","Num 6", "Num 5","Num 4",
	"Num +","Num 9","Num 8","Num 7","Num -","Num *","Num /","NumLock","Null1","Null2","Null3"
];
// var vKeyNames = [
//     "Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",         "Print Screen", "Scroll Lock", "Pause Break",   
//     "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-_", "=+", "Backspace",                        "Insert", "Home", "Page Up",       "NumLock", "Num /", "Num *", "Num -",  
//     "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]",                                     "Del", "End", "Page Down",         "Num 7", "Num 8", "Num 9", "Num +",    
//     "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'","#","Enter",                                                              "Num 4", "Num 5", "Num 6",             
//     "Left Shift", "\\", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift",                                  "Up Arrow",               "Num 1", "Num 2", "Num 3", "Num Enter",
//     "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl",  "Left Arrow", "Down Arrow", "Right Arrow", "Num 0", "Num ."                       
// ];



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
	let RGBData = grabColors();
	let packet = [0x00,indexes[0]];
	packet.push(...RGBData.splice(0, 63));
	device.write(packet, 65);
	// device.pause(20);	

	

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
		rgbdata[iLedIdx] = color[1];//R G
		rgbdata[iLedIdx+1] = color[0];//G R
		rgbdata[iLedIdx+2] = color[2];//B B
	}

	let Fill = new Array(24).fill(0);
	rgbdata = rgbdata.concat(Fill);
	return rgbdata;
}
function hexToRgb(hex) 
{
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let colors = [];
	colors[1] = parseInt(result[1], 16);//R G
	colors[0] = parseInt(result[2], 16);//G R
	colors[2] = parseInt(result[3], 16);//B B

	return colors;
}

export function Validate(endpoint) {
	return endpoint.interface === 3 ;
	//return endpoint.interface === -1 && endpoint.usage === 0x0001 && endpoint.usage_page === 0xff00;
}

export function Image() {
	return ""
}