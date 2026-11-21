// Adapted from Nollie's Dareu A98 plugin for the A98 Master in USB wired mode.

export function Name() { return "Dareu A98 Master"; }
export function VendorId() { return 0x260d; }
export function ProductId() { return 0x0047; }
export function Publisher() { return "feidiangg"; }
export function Documentation() { return "gettingstarted/srgbmods-net-info"; }
export function DeviceType() { return "keyboard"; }
export function Size() { return [20, 6]; }
export function DefaultPosition() { return [10, 100]; }
export function DefaultScale() { return 8.0; }

const indexes = [
	0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x77, 0x74, 0x76, 0x79,
	0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x67, 0x20, 0x21, 0x22, 0x7a,
	0x25, 0x26, 0x27, 0x28, 0x29, 0x2a, 0x2b, 0x2c, 0x2d, 0x2e, 0x2f, 0x30, 0x31, 0x55, 0x32, 0x33, 0x34, 0x7b,
	0x37, 0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d, 0x3e, 0x3f, 0x40, 0x41, 0x42, 0x43, 0x44, 0x45,
	0x46, 0x49, 0x4a, 0x4b, 0x4c, 0x4d, 0x4e, 0x4f, 0x50, 0x51, 0x52, 0x53, 0x54, 0x65, 0x56, 0x57, 0x58, 0x6a,
	0x5b, 0x5c, 0x5d, 0x5e, 0x60, 0x62, 0x63, 0x64, 0x66, 0x68, 0x69,
];

const vKeyPositions = [
	[0, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [16, 0], [17, 0], [18, 0], [19, 0],
	[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [14, 1], [16, 1], [17, 1], [18, 1], [19, 1],
	[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2], [16, 2], [17, 2], [18, 2], [19, 2],
	[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3], [12, 3], [14, 3], [16, 3], [17, 3],
	[18, 3], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [13, 4], [15, 4], [16, 4], [17, 4], [18, 4], [19, 4],
	[0, 5], [1, 5], [2, 5], [7, 5], [12, 5], [13, 5], [14, 5], [15, 5], [16, 5], [17, 5], [18, 5],
];

const vKeyNames = [
	"ESC", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Delete", "Insert", "PgUp", "PgDn",
	"`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "BACKSPACE", "Num Lock", "KEY_/", "KEY_*", "KEY_-",
	"Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "Enter", "KEY7", "KEY8", "KEY9", "KEY+",
	"CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "|", "KEY4", "KEY5",
	"KEY6", "Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "KEY1", "KEY2", "KEY3", "KEY enter",
	"Left Ctrl", "Left Win", "Left Alt", "Space", "Fn", "Right Ctrl", "Left  Arrow", "Down Arrow", "Right Arrow", "KEY0", "KEY.",
];

const frameIntervalMs = 85;
const reportLength = 65;
const reportPayloadLength = reportLength - 1;
let nextFrameAt = 0;
let framesRendered = 0;

export function Initialize() {
	nextFrameAt = 0;
	framesRendered = 0;
}

export function LedNames() {
	return vKeyNames;
}

export function LedPositions() {
	return vKeyPositions;
}

export function Render() {
	const now = Date.now();
	if (now < nextFrameAt) {
		return;
	}


	const colorData = [];
	for (let index = 0; index < vKeyPositions.length; index++) {
		const position = vKeyPositions[index];
		const color = device.color(position[0], position[1]);
		colorData.push(indexes[index], color[0], color[1], color[2]);
	}
	sendColors(colorData);
	nextFrameAt = Date.now() + frameIntervalMs;

	if (++framesRendered === 25) {
		device.log("A98 Master: rendered 25 live canvas frames");
	}
}

export function Shutdown() {
}

function sendColors(colorData) {
	const startReport = new Array(reportLength).fill(0);
	startReport[1] = 0x04;
	startReport[2] = 0x20;
	startReport[9] = 0x08;
	device.send_report(startReport, reportLength);
	readReply();

	for (let offset = 0; offset < colorData.length; offset += reportPayloadLength) {
		const packet = [0].concat(colorData.slice(offset, offset + reportPayloadLength));
		device.send_report(packet, reportLength);
	}

	device.send_report(new Array(reportLength).fill(0), reportLength);
	const commitReport = new Array(reportLength).fill(0);
	commitReport[1] = 0x04;
	commitReport[2] = 0x02;
	device.send_report(commitReport, reportLength);
	readReply();
}

function readReply() {
	device.get_report(new Array(reportLength).fill(0), reportLength, 200);
}


export function Validate(endpoint) {
	return endpoint.interface === 3 && endpoint.usage === 0x0001 && endpoint.usage_page === 0xff13;
}
