export function Name() { return "新盟M87"; } 
export function VendorId() { return 0x0c45; }
export function ProductId() { return 0x8006; }
export function Publisher() { return "随机复读的复读姬"; }
export function Size() { return [20,6]; }
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
Time:2025/12/9
Author: 
Original: Nollie(Nuonuo)
Modified to support 新盟M87 by @EnderMinecraft (Github)
Version:V0.1a - based on Nollie's VTER Galaxy 100 code
*/
const indexes = [
	0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x70,0x71,0x73,
	0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x67,0x74,0x75,0x76,
	0x25,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x31,0x43,0x77,0x78,0x79,
	0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,0x3e,0x3f,0x40,0x41,0x42,0x55,
	0x49,0x4a,0x4b,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x52,0x53,0x54,0x65,
	0x5b,0x5c,0x5d,0x5e,0x5f,0x60,0x61,0x62,0x63,0x66,0x64,
				]
const vKeys = 
[
    0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 
	16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 
	33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 
	50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 
	63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 
	76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86     
];

const vKeyPositions = 
[   
	[0, 0],         [2, 0], [3, 0], [4, 0], [5, 0],         [7, 0], [8, 0], [9, 0], [10, 0],          [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], 
	[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1],                   [15, 1], [16, 1], [17, 1], [18, 1], 
	[0, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2],                  [15, 2], [16, 2], [17, 2], [18, 2], 
	[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3],                           [15, 3], 
	[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4],                                    [15, 4],          [17, 4],  
	[0, 5], [1, 5], [2, 5], [6, 5], [10, 5], [11, 5], [12, 5],                                                                   [15, 5], [16, 5], [17, 5], [18, 5]
]
; 

const vKeyNames = [
"ESC",     "F1","F2","F3","F4",      "F5","F6","F7","F8",     "F9","F10","F11","F12",         "Prsc","ScrLck","PauBr",
"`","1","2","3","4","5","6","7","8","9","0","_-","+=","B_space",                              "INS" ,"HOME"  ,"PgUP" ,
"Tab","q","w","e","r","t","y","u","i","o","p","[","]","\\",                                   "DEL" ,"End"   ,"PgDN",
"CapsLck","a","s","d","f","g","h","j","k","l",";","'","Enter",     
"Lshift","z","x","c","v","b","n","m",",",".","/","Rshift",                                           "UpAr",
"LCtrl","Win","Lalt",          "Space",                "RAlt","Fn","Menu","RCtrl",            "LeAr","DnAr",  "RiAr"

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
	 for(var index = 0; index < 88; index++) //This will need rounded up to closest value for your board.
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
