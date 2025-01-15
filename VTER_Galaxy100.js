export function Name() { return "VTER Galaxy 100"; } //名称
export function VendorId() { return 0x0c45; }
export function ProductId() { return 0x8006; }
export function Publisher() { return "随机复读的复读姬"; } //发布者
export function Size() { return [98, 30]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0}

export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"DelayMs", "label":"DelayMs", "type":"combobox", "values":["0","1", "2","3", "4","5", "6","7", "8","9", "10"], "default":"0"},

	];
}
/* 
Time:2023/12/5
Author: Nollie(Nuonuo)
Version:V0.1
*/
const indexes = [
				 0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x77,0x75,0x78,0x70,0x73,	    //18
				 0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x67,0x74,0x20,0x21,0x22,0x7a,//19
				 0x25,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x31,0x43,0x76,0x32,0x33,0x34,0x7b,//19
				 0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,0x3e,0x3f,0x40,0x41,0x42,0x55,0x79,0x44,0x45,0x46,			//17
				 0x49,0x4a,0x4b,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x52,0x53,0x54,0x65,0x56,0x57,0x58,0x6a,			//17
				 0x5b,0x5c,0x5d,          0x5e,          0x5f,0x60,   0x63, 0x64,0x66,0x68,0x69	//11
				]
//高端的代码往往只需要最朴素的方式
const vKeys = 
[
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17,
	18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 
	37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 
	56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
	73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
	90, 91, 92,         93,         94, 95,         96, 97, 98, 99,100
];

const vKeyPositions =[
	[2, 0],         [12, 0], [17, 0], [22, 0], [27, 0], [34, 0], [39, 0], [44, 0], [49, 0], [56, 0], [61, 0], [66, 0], [71, 0], [76, 0], [81, 0], [86, 0], [91, 0], [96, 0], 
	[2, 7], [7, 7], [12, 7], [17, 7], [22, 7], [27, 7], [32, 7], [37, 7], [42, 7], [47, 7], [52, 7], [57, 7], [62, 7], [69, 7], [76, 7], [81, 7], [86, 7], [91, 7], [96, 7], 
	[3, 12],[9,12], [14,12], [19,12], [24,12], [29,12], [34,12], [39,12], [44,12], [49,12], [54,12], [59,12], [64,12], [70,12], [76,12], [81,12], [86,12], [91,12], [96,15],
	[4, 17],[10,17],[15,17], [20,17], [25,17], [30,17], [35,17], [40,17], [45,17], [50,17], [55,17], [60,17],       [68,17],    [76,17], [81,17], [86,17], [91,17], 
	[5, 22],[13,22],[18,22], [23,22], [28,22], [33,22], [38,22], [43,22], [48,22], [53,22], [58,22],         [64,22],  [70,22],          [81,22], [86,22], [91,22], [96,25], 
	[3, 27],[9, 27],[15, 27], 					[34, 27], 						  [52,27],   [59, 27],       [65,27],  [70,27], [75,27],      [84,27],     [91,27]
];
const vKeyNames = 
[ 	"Esc",         "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",   "F9", "F10", "F11", "F12",    "Delete",		  "Home",  "End",  "Print",  "Pause",     //18

	"`",     "1",  "2",  "3",  "4",  "5",  "6",  "7", "8", "9", "0", "-_", "=+","Backspace",          "Insert",        "NumLock","Num /","Num *", "Num -",   //19

	"Tab",       "Q",  "W",  "E",  "R",  "T", " Y", "U","I", "O", "P",  "[",  "]",   "\\",            "PgUp",         "Num 7", "Num 8", "Num 9", "Num +",   //19

	"CapsLock",       "A",  "S",  "D",  "F", "G", "H", "J", "K",  "L", ";", "'",    "Enter",          "PgDn",        "Num 4", "Num 5", "Num 6",            //17

	"Left Shift",      "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",          "Right Shift",    "Up Arrow",       "Num 1", "Num 2", "Num 3","Num Enter",  //17

	"Left Ctrl","Left Win","Left Alt",      "Space",     "Right Alt","Fn","Left Arrow","Down Arrow","Right Arrow","Num 0","Num ." //11
 ];
 function refresh()
 {
	 let Delay_ms = Number(DelayMs);
	 let packet = new Array(65).fill(0);
	 device.send_report(packet, 65);
	 device.pause(Delay_ms);
	 //-----------------------------
	 //从抓包看 是发了俩个空数据
	 // device.send_report(packet, 65);
	 // device.pause(Delay_ms);
	 //-----------------------------
	 packet[1] = 0x04;
	 packet[2] = 0x02;
	 device.send_report(packet, 65);
	 device.pause(Delay_ms);
	 let data = new Array(65).fill(0);
	 device.get_report(data,65);
	 device.pause(Delay_ms);
 
 }
 function start_refresh()
 {
	 let Delay_ms = Number(DelayMs);
	 let packet = new Array(65).fill(0);
	 packet[1] = 0x04;
	 packet[2] = 0x20;
	 packet[9] = 0x08;
	 device.send_report(packet, 65);
	 device.pause(DelayMs);
	 let data = new Array(65).fill(0);
	 device.get_report(data,65);
	 device.pause(DelayMs);
	 
	 // device.send_report(data,1);
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
	 let Delay_ms = Number(DelayMs);
	 let rgbdata = grabColors();
	 let send_data = [];
 
	 // packet = packet.concat(rgbdata);	
	 for(var index = 0; index < 101; index++) //This will need rounded up to closest value for your board.
	 {
		 send_data.push(indexes[index],rgbdata[index * 3],rgbdata[index* 3 +1],rgbdata[index * 3 + 2])
 
	 }	
	 // device.log(send_data, {toFile: true});
	 start_refresh();
	 for(var index = 0; index <= 6; index++)
	 {
		 let packet = [0x00];
		 packet.push(...send_data.splice(0, 64));
		 // device.log(packet, {toFile: true});
		 device.send_report(packet, 65);
		 device.pause(DelayMs);
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
