export function Name() { return "FL-ESPORTS_CMK99"; }
export function VendorId() { return 0x1fc9; }
export function ProductId() { return 0xe8c7; }
export function Publisher() { return "随机复读的复读姬"; }
export function Size() { return [18, 6]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 8.0;}
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}
/* 
Time:2023/11/11
Author: Skikdd(随机复读的复读姬)
Version:V0.1
*/


const vKeyNames = [
	"Esc",         "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",   "F9", "F10", "F11", "F12",  "PS",               "Delete","End",  "PgUp", "PgDn",      //17

    "`",     "1",  "2",  "3",  "4",  "5",  "6",  "7", "8", "9", "0", "-_", "=+","Backspace",                          "NumLock","Num /","Num *", "Num -",   //18

	"Tab",       "Q",  "W",  "E",  "R",  "T", " Y", "U","I", "O", "P",  "[",  "]",   "\\",                            "Num 7", "Num 8", "Num 9", "Num +",   //18

    "CapsLock",       "A",  "S",  "D",  "F", "G", "H", "J", "K",  "L", ";", "'",    "Enter",                          "Num 4", "Num 5", "Num 6",            //16

	"Left Shift",      "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",          "Right Shift",    "Up Arrow",       "Num 1", "Num 2", "Num 3",            //16

	"Left Ctrl","Left Win","Left Alt",      "Space",     "Right Alt","Fn","Right Ctrl","Left Arrow","Down Arrow","Right Arrow","Num 0","Num .","Num Enter"  //13
];

const vKeys = [
	0,    2,3,4,5,    7,8,9,10,    11,12,13,14,                 15, 16, 17,18,19,   //18
	22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,  36,    37, 38, 39,40,      //18
	44,  45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58,    59, 60, 61,62,      //18
	66,   68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,80,        81, 82, 83,         //16
	88,    90, 91, 92, 93, 94, 95, 96, 97, 98, 99,101,     102, 103,104,105,        //16
	110, 111, 112,         116,          120, 121, 122,123,124,125, 126,127,106     //13
];

const  vKeyPositions = [
	[0, 0],[1, 0], [2, 0],[3, 0],[4, 0],[5, 0], [6, 0],[7, 0], [8, 0], [9, 0], [10, 0],[11, 0],[12, 0],[13, 0],     [14, 0],[15, 0],[16, 0],[17, 0], //17
	[0, 1],[1, 1],[2, 1],[3, 1],[4, 1],[5, 1], [6, 1],[7, 1], [8, 1], [9, 1], [10, 1],[11, 1],[12, 1],[13, 1],     [14, 1],[15, 1],[16, 1],[17, 1], //18
	[0, 2],[1, 2],[2, 2],[3, 2],[4, 2],[5, 2], [6, 2],[7, 2], [8, 2], [9, 2], [10, 2],[11, 2],[12, 2],[13, 2],     [14, 2],[15, 2],[16, 2],[17, 2], //18
	[0, 3],       [2, 3],[3, 3],[4, 3],[5, 3], [6, 3],[7, 3], [8, 3], [9, 3], [10, 3],[11, 3],[12, 3],[13, 3],     [14, 3],[15, 3],[16, 3],         //16
	[0, 4],       [2, 4],[3, 4],[4, 4],[5, 4], [6, 4],[7, 4], [8, 4], [9, 4], [10, 4],[11, 4],[12, 4],   [13, 4],  [14, 4],[15, 4],[16, 4],         //16
	[0, 5],[1, 5],[2, 5],              [5, 5],                        [9, 5], [10, 5], [11, 5],   [12, 5],[13, 5], [14, 5], [15, 5],[16, 5],[17, 5] //13
];

export function LedNames() {
	return vKeyNames;
}

export function LedPositions() {
	return vKeyPositions;
}

export function Initialize() {
	device.write([0x01, 0x0D], 64);
	device.write([0x01, 0x15], 64);
	device.write([0x01, 0x0A], 64);
	device.write([0x01, 0x02], 64);
	device.write([0x01, 0x07, 0x00, 0x00, 0x00, 0x0E, 0x00, 0x04, 0x03, 0xFF], 64);
	device.write([0x01, 0x17, 0x00, 0x00, 0x00, 0x01, 0x01], 64);
	device.write([0x01, 0x08, 0x00, 0x00, 0x00, 0x0D, 0x02, 0x03, 0x03, 0xFF, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01], 64);
}

export function Render() {
	sendColors();
}

export function Shutdown() {

}

function sendColors(shutdown = false) {
  	let mxPxColor;
	const RGBData = new Array(432);

	for(let iIdx = 0; iIdx < vKeyPositions.length; iIdx++) {
		const iPxX = vKeyPositions[iIdx][0];
		const iPxY = vKeyPositions[iIdx][1];

		if(shutdown) {
			mxPxColor = hexToRgb(shutdownColor);
		}else if (LightingMode === "Forced") {
			mxPxColor = hexToRgb(forcedColor);
		}else {
			mxPxColor = device.color(iPxX, iPxY);
		}

		RGBData[(vKeys[iIdx]*3)] = mxPxColor[0];
		RGBData[(vKeys[iIdx]*3)+1] = mxPxColor[1];
		RGBData[(vKeys[iIdx]*3)+2] = mxPxColor[2];
	}

	for(let row = 0; row <= 7; row++) {
		let packet = [];
		packet[0] = 0x01;
		packet[1] = 0x0F;
		packet[2] = 0x00;
		packet[3] = 0x00;
		packet[4] = row;
		packet[5] = row === 7 ? 0x12 : 0x36;
		packet = packet.concat(RGBData.splice(0, 54));
		device.write(packet, 64);
	}

	device.write([0x01, 0x0F, 0x01, 0x00, 0x00, 0x36], 64);
	device.write([0x01, 0x0F, 0x01, 0x00, 0x01, 0x2D], 64);
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}

export function Validate(endpoint) {
	return endpoint.interface === 2 && endpoint.usage === 0x0091 && endpoint.usage_page === 0xff1b && endpoint.collection === 0x0000;
}

export function Image() {
}