export function Name() { return "Ciy_Gas67"; } //名称
export function VendorId() { return 0x258A; }
export function ProductId() { return 0x010C; }
export function Publisher() { return "随机复读的复读姬"; } //发布者
export function Documentation() { return "gettingstarted/srgbmods-net-info"; }
export function Size() { return [16, 6]; }
export function DefaultPosition(){return [10, 100]; }
export function DefaultScale(){return 12.0}
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0",        "max":"360", "type":"color",   "default":"009bde"},
		{"property":"LightingMode",  "group":"lighting", "label":"Lighting Mode",  "type":"combobox","values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor",   "group":"lighting", "label":"Forced Color",   "min":"0",        "max":"360",  "type":"color",  "default":"009bde"},
	];
}
/* 
Time:2023/2/11
Author: Skikdd And Nollie(Nuonuo)
Version:V0.1
*/
const vKeys = 
[
	1, 7,13,19,25,31,37,43,49,55,61,67,73,79,   91,
	2, 8,14,20,26,32,38,44,50,56,62,68,74,80,   92,
	3, 9,15,21,27,33,39,45,51,57,63,69,   81,   93,
	4,10,16,22,28,34,40,46,52,58,64,      82,88,94,
	5,11,17,      35,      53,59,         83,89,95
];
const vKeyPositions = 
[
 [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0],[11, 0],[12, 0],[13, 0],        [15, 0], 
 [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1],[11, 1],[12, 1],[13, 1],        [15, 1],
 [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],[11, 2],        [13, 2],        [15, 2], 
 [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],                [13, 3],[14, 3],[15, 3],
 [0, 4], [1, 4], [2, 4],                 [5, 4],                 [8, 4], [9, 4],                         [13, 4],[14, 4],[15, 4]
];
const vKeyNames = 
[
'ESC','1', '2', '3','4', '5', '6','7','8', '9', '0',  '-', '=',      'BACK',         'HOME',   //15
'TAB',   'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O','P', '[', ']',    '|',          'END',    //15
'CAPS LOCK', 'A', 'S', 'D','F','G', 'H', 'J',  'K', 'L',  ';', '"',     'ENTER',     'PGUP',   //14
'Left_Shift',  'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>','/', 'Right_Shift',  'Up','PGDN',   //14
'Ctrl_Left','Win','Alt_Left',      'Space',    'ALT_R','FN',   'left', 'DOWN','RIGHT',   //10

];
function initpacket1()
{
	device.log(vKeys.length, {toFile: true});
	//refColor();
	//refresh()
  //let packet = new Array(64).fill(0x06);
  //packet[0] = 0x04;
  //packet[1] = 0x01;
  //packet[2] = 0x00;
  //packet[3] = 0x01;
  //packet[4] = 0x00;
  let packet1 = [0x06,0x08,0x00,0x00,0x01,0x00,0x7a,0x01,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0x00,0x00,0x00,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff];
  device.log(packet1, {toFile: true});
  device.send_report(packet1,520);
  //let packet2 = [];
  //device.log(packet1, {toFile: true})
  //device.write(packet2,520)
}
export function ControllableParameters() {
	return [
		{"property":"shutdownColor", "group":"lighting", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"LightingMode", "group":"lighting", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "group":"lighting", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
	];
}
export function Initialize() {
	//initpacket1();
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
    //refresh1();
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
//&& endpoint.collection === 0x0006
export function Image() {
}