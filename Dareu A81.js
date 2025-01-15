export function Name() { return "Dareu A81 3 Mode"; } //名称
export function VendorId() { return 0x260D; }
export function ProductId() { return 0x0033; }
export function Publisher() { return "随机复读的复读姬"; } //发布者
export function Documentation() { return "gettingstarted/srgbmods-net-info"; }
export function Size() { return [80, 32]; }
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
Time:2024/7/3
Author: Skikdd(随机复读的复读姬)
Version:V0.1
*/
//高端的代码往往只需要最朴素的方式
const indexes = [0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x73,0x77,//15
	             0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x67,0x75,//15
				 0x25,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x31,0x43,0x76,//15
				 0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,0x3e,0x3f,0x40,0x41,0x42,0x55,     0x79,//14
				 0x49,0x4a,0x4b,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x52,0x53,0x54,0x65,     	    //13
				 0x5b,0x5c,0x5d,               0x5e,          0x5f,0x60,0x63,0x64,0x66	    //10
				]
const vKeys = 
[
    0,   1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,  
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,    
	30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 
	45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,  
	59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,   
	72, 73, 74, 			75,			76, 77,     78, 79, 80
];
 const vKeyPositions = 
 [
	[2, 4],  [8, 4],  [13, 4], [18, 4], [23, 4], [29, 4], [34, 4], [39, 4], [44, 4], [50, 4], [55, 4],  [60, 4],  [65, 4],  [71, 4],  [77, 4 ], //16
	[2, 10], [7, 10], [12, 10],[17, 10],[22, 10],[27, 10],[32, 10],[37, 10],[42, 10],[47, 10],[52, 10], [57, 10], [62, 10], [69, 10], [77, 10], //15
	[3, 15], [9, 15], [14, 15],[19, 15],[24, 15],[29, 15],[34, 15],[39, 15],[44, 15],[49, 15],[54, 15], [59, 15], [64, 15], [70, 15], [77, 15], //15
	[4, 20], [10, 20],[15, 20],[20, 20],[25, 20],[30, 20],[35, 20],[40, 20],[45, 20],[50, 20],[55, 20], [60, 20],           [68, 20], [77, 20], //15
	[5, 25],     	  [13, 25],[18, 25],[23, 25],[28, 25],[33, 25],[38, 25],[43, 25],[48, 25],[53, 25], [58, 25], [64, 25], [72, 26],           //15
	[3, 30], [9, 30], [15, 30],							  [33, 30],					 [53, 30],[60, 30],			  [67, 31], [72, 31], [77, 31]  //9
	];
const vKeyNames = 
[  
	'Esc',"F1" ,"F2" , "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",  'Pause','Delete',    //16
	"`",   "1",  "2",  "3",  "4",  "5",  "6",  "7", "8", "9", "0", "-_", "=+","Backspace",        'Home',   //15
	"Tab",   "Q",  "W",  "E",  "R",  "T", "Y", "U","I", "O", "P",  "[",  "]",   "\\",         'End',    //15
	"CapsLock", "A",  "S",  "D",  "F", "G", "H", "J", "K",  "L", ";", "'",    "Enter",      'PgUp',   //14
	"Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",          "Right Shift",    "Up Arrow",    //14
	"Left Ctrl","Left Win","Left Alt",      "Space",     "Right Alt","Fn","Left Arrow","Down Arrow","Right Arrow"  //10
];

function refresh()
{
	let packet = new Array(65).fill(0);
	device.send_report(packet, 65);
	packet[1] = 0x04;
	packet[2] = 0x00;
	device.send_report(packet, 65);
	let data = new Array(65).fill(0);
	device.get_report(data,65);
	

}
function start_refresh()
{
	let packet = new Array(65).fill(0);
	packet[1] = 0x04;
	packet[2] = 0x20;

	packet[9] = 0xff;

	device.send_report(packet, 65);
	let data = new Array(65).fill(0);
	device.get_report(data,65);
	device.send_report(data,1);

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
	for(var index = 0; index <= vKeys.length; index++) //This will need rounded up to closest value for your board.
	{
		send_data.push(indexes[index],rgbdata[index * 3],rgbdata[index* 3 +1],rgbdata[index * 3 + 2])
	}	
	// device.log(send_data, {toFile: true});
	start_refresh();
	for(var index = 0; index <= 6; index++)
	{
		let packet = [0x00];
		packet.push(...send_data.splice(0, 64));
		device.send_report(packet, 65);
		//device.pause(0);
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
	return endpoint.interface === 0 && endpoint.usage === 0x0006 && endpoint.usage_page === 0x0001;
}
export function Name() { return "Dareu A81 3 Mode"; } //名称
export function VendorId() { return 0x260D; }
export function ProductId() { return 0x0033; }
export function Publisher() { return "随机复读的复读姬"; } //发布者
export function Documentation() { return "gettingstarted/srgbmods-net-info"; }
export function Size() { return [80, 32]; }
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
Time:2024/7/3
Author: Skikdd(随机复读的复读姬)
Version:V0.1
*/
//高端的代码往往只需要最朴素的方式
const indexes = [0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x73,0x77,//15
	             0x13,0x14,0x15,0x16,0x17,0x18,0x19,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x67,0x75,//15
				 0x25,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x31,0x43,0x76,//15
				 0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,0x3e,0x3f,0x40,0x41,0x42,0x55,     0x79,//14
				 0x49,0x4a,0x4b,0x4c,0x4d,0x4e,0x4f,0x50,0x51,0x52,0x53,0x54,0x65,     	    //13
				 0x5b,0x5c,0x5d,               0x5e,          0x5f,0x60,0x63,0x64,0x66	    //10
				]
const vKeys = 
[
    0,   1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,  
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,    
	30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 
	45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,  
	59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,   
	72, 73, 74, 			75,			76, 77,     78, 79, 80
];
 const vKeyPositions = 
 [
	[2, 4],  [8, 4],  [13, 4], [18, 4], [23, 4], [29, 4], [34, 4], [39, 4], [44, 4], [50, 4], [55, 4],  [60, 4],  [65, 4],  [71, 4],  [77, 4 ], //16
	[2, 10], [7, 10], [12, 10],[17, 10],[22, 10],[27, 10],[32, 10],[37, 10],[42, 10],[47, 10],[52, 10], [57, 10], [62, 10], [69, 10], [77, 10], //15
	[3, 15], [9, 15], [14, 15],[19, 15],[24, 15],[29, 15],[34, 15],[39, 15],[44, 15],[49, 15],[54, 15], [59, 15], [64, 15], [70, 15], [77, 15], //15
	[4, 20], [10, 20],[15, 20],[20, 20],[25, 20],[30, 20],[35, 20],[40, 20],[45, 20],[50, 20],[55, 20], [60, 20],           [68, 20], [77, 20], //15
	[5, 25],     	  [13, 25],[18, 25],[23, 25],[28, 25],[33, 25],[38, 25],[43, 25],[48, 25],[53, 25], [58, 25], [64, 25], [72, 26],           //15
	[3, 30], [9, 30], [15, 30],							  [33, 30],					 [53, 30],[60, 30],			  [67, 31], [72, 31], [77, 31]  //9
	];
const vKeyNames = 
[  
	'Esc',"F1" ,"F2" , "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",  'Pause','Delete',    //16
	"`",   "1",  "2",  "3",  "4",  "5",  "6",  "7", "8", "9", "0", "-_", "=+","Backspace",        'Home',   //15
	"Tab",   "Q",  "W",  "E",  "R",  "T", "Y", "U","I", "O", "P",  "[",  "]",   "\\",         'End',    //15
	"CapsLock", "A",  "S",  "D",  "F", "G", "H", "J", "K",  "L", ";", "'",    "Enter",      'PgUp',   //14
	"Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",          "Right Shift",    "Up Arrow",    //14
	"Left Ctrl","Left Win","Left Alt",      "Space",     "Right Alt","Fn","Left Arrow","Down Arrow","Right Arrow"  //10
];

function refresh()
{
	let packet = new Array(65).fill(0);
	device.send_report(packet, 65);
	packet[1] = 0x04;
	packet[2] = 0x00;
	device.send_report(packet, 65);
	let data = new Array(65).fill(0);
	device.get_report(data,65);
	

}
function start_refresh()
{
	let packet = new Array(65).fill(0);
	packet[1] = 0x04;
	packet[2] = 0x20;

	packet[9] = 0xff;

	device.send_report(packet, 65);
	let data = new Array(65).fill(0);
	device.get_report(data,65);
	device.send_report(data,1);

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
	for(var index = 0; index <= vKeys.length; index++) //This will need rounded up to closest value for your board.
	{
		send_data.push(indexes[index],rgbdata[index * 3],rgbdata[index* 3 +1],rgbdata[index * 3 + 2])
	}	
	// device.log(send_data, {toFile: true});
	start_refresh();
	for(var index = 0; index <= 6; index++)
	{
		let packet = [0x00];
		packet.push(...send_data.splice(0, 64));
		device.send_report(packet, 65);
		//device.pause(0);
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
	return endpoint.interface === 0 && endpoint.usage === 0x0006 && endpoint.usage_page === 0x0001;
}
