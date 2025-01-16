export function Name() { return "Aula & Mchose Series"; } 
export function VendorId() { return 0x258a; }
export function ProductId() { return 0x010c; }
export function Publisher() { return "Nollie"; } 
export function DefaultPosition(){return [103, 32];}
export function DefaultScale(){return 5.0;}

export function ControllableParameters() 
{
	return [
		{"property":"shutdownColor", "label":"Shutdown Color", "min":"0", "max":"360", "type":"color", "default":"000000"},
		{"property":"LightingMode", "label":"Lighting Mode", "type":"combobox", "values":["Canvas", "Forced"], "default":"Canvas"},
		{"property":"forcedColor", "label":"Forced Color", "min":"0", "max":"360", "type":"color", "default":"009bde"},
		{"property":"boardModel", "group":"lighting", "label":"Key Type", "type":"combobox", "values":["Aula_F99", "Aula_F87","Aula_F87Pro","Aula_F75","Mchose_X75","Mchose_K99","Mchose_G98"], "default":"Aula_F99"}];
}

/* 
Time:2024/1/12
Author: Nollie(Nuonuo)
Version:V1.0
*/

/* 
Time:2025/1/13
Author: Skikdd(随机复读的复读姬)
Version:V1.1
log:添加Aula F75灯珠名字
log:修复Aula F87&F87_Pro灯珠
log:修复Aula F99灯珠位置错误和不亮
*/

let vKeyNames = [];
let vKeys = [];
let vKeyPositions = [];

/*

*/

const boards =
{
	Aula_F99:{
		name: "Aula_F99",
		vKeyNames:
		["Esc", "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",   "F9", "F10", "F11", "F12",            "Delete",		   "Home",  "End",  "Pgup", "Pgdn",   //18
		 "`",     "1",  "2",  "3",  "4",  "5",  "6",  "7", "8", "9", "0", "-_", "=+","Backspace",                          "Num Lock", "KEY/","KEY*","KEY-",  //19
		 "Tab",       "Q",  "W",  "E",  "R",  "T", "Y", "U","I", "O", "P",  "[",  "]",   "\\",                             "KEY7","KEY8","KEY9", "KEY+" ,     //19
		 "CapsLock",       "A",  "S",  "D",  "F", "G", "H", "J", "K",  "L", ";", "'",    "Enter",                          "KEY4", "KEY5","KEY6" ,            //16
		 "Left Shift",      "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",          "Right Shift",    "Up Arrow",       "KEY1","KEY2","KEY3",              //16
        "Left Ctrl","Left Win", "Left Alt","Space","Right Alt", "Fn",   "Right Ctrl", "Left Arrow",  "Down Arrow",  "Right Arrow", "KEY0","KEY.", "KEY Enter" //13
		],
	  vKeys: 
	    [0, 6, 12,18,24,30,36,42,48,54,60,66,72,78,   90,96, 102,108,
		 1, 7, 13,19,25,31,37,43,49,55,61,67,73,79,   91,97, 103,109,
		 2, 8, 14,20,26,32,38,44,50,56,62,68,74,80,   92,98, 104,110,
		 3, 9, 15,21,27,33,39,45,51,57,63,69,   81,   93,99, 105,
		 4, 10,16,22,28,34,40,46,52,58,64,	    82,88,94,100,106,
		 5, 11,17,      35,      53,59,65,      83,89,95,101,107,112
		],
		vKeyPositions:  
		[	[2, 0], [7, 0], [12, 0], [17, 0], [22, 0], [27, 0], [34, 0], [39, 0], [44, 0], [49, 0], [56, 0], [61, 0], [66, 0], [71, 0],      [85, 0], [90, 0], [95, 0], [100, 0], 
			[2, 7], [7, 7], [12, 7], [17, 7], [22, 7], [27, 7], [32, 7], [37, 7], [42, 7], [47, 7], [52, 7], [57, 7], [62, 7], [69, 7],      [85, 7], [90, 7], [95, 7], [100, 7], 
			[3, 12],[9,12], [14,12], [19,12], [24,12], [29,12], [34,12], [39,12], [44,12], [49,12], [54,12], [59,12], [64,12], [70,12],      [85,12], [90,12], [95,12], [100,15],
			[4, 17],[10,17],[15,17], [20,17], [25,17], [30,17], [35,17], [40,17], [45,17], [50,17], [55,17], [60,17],       [68,17],         [85,17], [90,17], [95,17], 
			[5, 22],[13,22],[18,22], [23,22], [28,22], [33,22], [38,22], [43,22], [48,22], [53,22], [58,22],               [67,22], [79,23], [85,22], [90,22], [95,22], [100,25], 
			[3, 27],[9, 27],[15, 27], 				[34, 27], 						       [52,27], [59, 27], [65, 27],   [72, 28], [79, 28],[84,28], [90,27], [95,27]
		], 
		size: 			[103, 32]
	},
	Aula_F87:{
		name: "Aula F87",
		vKeyNames:      
		[
			"Esc",     "F1","F2","F3","F4",   "F5","F6","F7","F8",    "F9", "F10", "F11", "F12",  "Print Screen", "Scroll Lock", "Pause Break",   
			"`", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",   "-_", "=+",  "Backspace",        "Insert",       "Home",    "Page Up", 
		   "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]",     "\\",                 "Del",         "End",     "Page Down",   
		   "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",        "Enter",                                                     
		   "Left Shift","Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",         "Right Shift",                     "Up Arrow",                   
		   "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl",  "Left Arrow",   "Down Arrow", "Right Arrow"
		],
		vKeys: 
		[	0,   12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,   
			1, 7,13,19,25,31,37,43,49,55,61,67,73,79,85,91,97,
			2, 8,14,20,26,32,38,44,50,56,62,68,74,80,86,92,98,
			3, 9,15,21,27,33,39,45,51,57,63,69,   81,	
			4,10,16,22,28,34,40,46,52,58,64,      82,   94,
			5,11,17,      35,      53,59,65,      83,89,95,101
		],
		vKeyPositions:  
		[
			[0, 0],       [2, 0],[3, 0],[4, 0],[5, 0], [6, 0],[7, 0], [8, 0], [9, 0], [10, 0],[11, 0],[12, 0],[13, 0],[14, 0],[15, 0],[16, 0],  //16
			[0, 1],[1, 1],[2, 1],[3, 1],[4, 1],[5, 1], [6, 1],[7, 1], [8, 1], [9, 1], [10, 1],[11, 1],[12, 1],[13, 1],[14, 1],[15, 1],[16, 1],  //17
			[0, 2],[1, 2],[2, 2],[3, 2],[4, 2],[5, 2], [6, 2],[7, 2], [8, 2], [9, 2], [10, 2],[11, 2],[12, 2],[13, 2],[14, 2],[15, 2],[16, 2],  //17
			[0, 3],[1, 3],[2, 3],[3, 3],[4, 3],[5, 3], [6, 3],[7, 3], [8, 3], [9, 3], [10, 3],[11, 3],        [13, 3],                          //13
			[0, 4],       [2, 4],[3, 4],[4, 4],[5, 4], [6, 4],[7, 4], [8, 4], [9, 4], [10, 4],[11, 4],    [13, 4],            [15, 4],          //13
			[0, 5],[1, 5],[2, 5],                      [6, 5],                        [10, 5],[11, 5],[12, 5],[13, 5],[14, 5],[15, 5],[16, 5]   //11
		],
		size: 			[17, 6]
	},
	Aula_F87Pro:{
		name: "Aula F87Pro",
		vKeyNames:      
		[
			"Esc",     "F1","F2","F3","F4",   "F5","F6","F7","F8",    "F9", "F10", "F11", "F12",  "Print Screen", "Scroll Lock", "Pause Break",   
			"`", "1",  "2", "3", "4", "5",  "6", "7", "8", "9", "0",   "-_", "=+",  "Backspace",        "Insert",       "Home",    "Page Up", 
		   "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]",     "\\",                 "Del",         "End",     "Page Down",   
		   "CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",        "Enter",                                                     
		   "Left Shift","Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",         "Right Shift",                     "Up Arrow",                   
		   "Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Menu", "Right Ctrl",  "Left Arrow",   "Down Arrow", "Right Arrow"
		],
		vKeys: 
		[	0,   12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,   
			1, 7,13,19,25,31,37,43,49,55,61,67,73,79,85,91,97,
			2, 8,14,20,26,32,38,44,50,56,62,68,74,80,86,92,98,
			3, 9,15,21,27,33,39,45,51,57,63,69,   81,	
			4,10,16,22,28,34,40,46,52,58,64,      82,   94,
			5,11,17,      35,      53,59,65,      83,89,95,101
		],
		vKeyPositions:  
		[
			[0, 0],       [2, 0],[3, 0],[4, 0],[5, 0], [6, 0],[7, 0], [8, 0], [9, 0], [10, 0],[11, 0],[12, 0],[13, 0],[14, 0],[15, 0],[16, 0],  //16
			[0, 1],[1, 1],[2, 1],[3, 1],[4, 1],[5, 1], [6, 1],[7, 1], [8, 1], [9, 1], [10, 1],[11, 1],[12, 1],[13, 1],[14, 1],[15, 1],[16, 1],  //17
			[0, 2],[1, 2],[2, 2],[3, 2],[4, 2],[5, 2], [6, 2],[7, 2], [8, 2], [9, 2], [10, 2],[11, 2],[12, 2],[13, 2],[14, 2],[15, 2],[16, 2],  //17
			[0, 3],[1, 3],[2, 3],[3, 3],[4, 3],[5, 3], [6, 3],[7, 3], [8, 3], [9, 3], [10, 3],[11, 3],        [13, 3],                          //13
			[0, 4],       [2, 4],[3, 4],[4, 4],[5, 4], [6, 4],[7, 4], [8, 4], [9, 4], [10, 4],[11, 4],    [13, 4],            [15, 4],          //13
			[0, 5],[1, 5],[2, 5],                      [6, 5],                        [10, 5],[11, 5],[12, 5],[13, 5],[14, 5],[15, 5],[16, 5]   //11
		],
		size: 			[17, 6]
	},
	Aula_F75:{
		name: "Aula F75",
		vKeyNames:      
		[	
			"Esc",    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12",
			"`",   "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","-_", "=+", "Backspace",  "Del",
			"Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]",   "\\",         "Page Up",
			"CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'",   "Enter",      "Page Down", 
			"Left Shift",  "Z", "X", "C", "V", "B", "N", "M",",", ".", "/","Right Shift","Up Arrow","End",
			"Left Ctrl","Left Win","Left Alt","Space","Fn","Right Ctrl",   "Left Arrow","Down Arrow","Right Arrow" 
		],
		vKeys: 		    
		[	0,   12,18,24,30,36,42,48,54,60,66,72,78,   //Esc      F1  F2  F3  F4  F5  F6  F7  F8  F9  F10  F11  F12
			1, 7,13,19,25,31,37,43,49,55,61,67,73,79,85,//`        1   2   3   4   5   6   7   8   9   0    -    +   Backspace Del
			2, 8,14,20,26,32,38,44,50,56,62,68,74,80,86,//Tab      Q   W   E   R   T   Y   U   I   O   P    [    ]   \         Page Up
			3, 9,15,21,27,33,39,45,51,57,63,69,   81,87,//CapsLock A   S   D   F   G   H   J   K   L   ;   '         Enter     Page Down	
			4,10,16,22,28,34,40,46,52,58,64,70,   82,88,//Shift    Z   X   C   V   B   N   M   ,   .   /   RShift    Up        End
			5,11,17,      35,      53,59,      77,83,89 //Ctrl    Win  Alt         Space       Fn  RCtrl   Left      Down      Right
		],
		vKeyPositions: 	
		[
			[0, 0],       [2, 0],[3, 0],[4, 0],[5, 0], [6, 0],[7, 0], [8, 0], [9, 0], [10, 0],[11, 0],[12, 0],[13, 0],
			[0, 1],[1, 1],[2, 1],[3, 1],[4, 1],[5, 1], [6, 1],[7, 1], [8, 1], [9, 1], [10, 1],[11, 1],[12, 1],[13, 1],[14, 1],  
			[0, 2],[1, 2],[2, 2],[3, 2],[4, 2],[5, 2], [6, 2],[7, 2], [8, 2], [9, 2], [10, 2],[11, 2],[12, 2],[13, 2],[14, 2],  
			[0, 3],[1, 3],[2, 3],[3, 3],[4, 3],[5, 3], [6, 3],[7, 3], [8, 3], [9, 3], [10, 3],[11, 3],        [13, 3],[14, 3],
			[0, 4],       [2, 4],[3, 4],[4, 4],[5, 4], [6, 4],[7, 4], [8, 4], [9, 4], [10, 4],[11, 4],[12, 4],[13, 4],[14, 4],  
			[0, 5],[1, 5],[2, 5],                      [6, 5],                [9, 5], [10, 5],        [12, 5],[13, 5],[14, 5]
		],
		size: 			[15, 6]
	},
	Mchose_X75:{
		name: "Mchose X75",
		vKeyNames:      ['ESC', '~', 'TAB', 'CAPS LOCK', 'SHIFT', 'CTRL', 'NULL1', '1', 'Q', 'A', 'Z', 
		'WIN', 'F1', '2', 'W', 'S', 'X', 'ALT_R', 'F2', '3', 'E',
		 'D', 'C', 'NULL2', 'F3', '4', 'R', 'F', 'V', 'NULL3', 'F4', 
		 '5', 'T', 'G', 'B', 'SPACE', 'F5', '6', 'Y', 'H', 'N', 'NULL4',
		 'F6', '7', 'U', 'J', 'M', 'NULL5', 'F7', '8', 'I', 'K', '<', 
		 'ALT_L', 'F8', '9', 'O', 'L', '>', 'FN', 'F9', '0', 'P', ';', '/',
		 'CTRL_L', 'F10', '-', '[', '"', 'NULL6', 'NULL8', 'F11', '=', ']', 'NULL9', 'NULL10', 
		 'NULL11', 'F12', 'BACK', '|', 'ENTER', 'SHIFT_', 'left', 'NULL12', 'NULL13', 'NULL14', 'NULL15', 'ON', 'DOWN',
		 'DEL', 'HOME', 'END', 'PGUP', 'PGDN', 'RIGHT'],
		vKeys: 		    [0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 
			17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
			35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 
			53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
			70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
			87, 88, 89, 90, 91, 92, 93, 94,95],
		vKeyPositions: 	[[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 0], [3, 1], [4, 2], [4, 3], [4, 4], [1, 6], [4, 0], [4, 1], [5, 2], [5, 3], [5, 4], [2, 6], [5, 0], [5, 1], [6, 2], [6, 3], [6, 4], [6, 5], [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [3, 6], [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [4, 6], [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [10, 0], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [12, 0], [11, 1], [12, 2], [12, 3], [13, 4], [13, 5], [13, 0], [12, 1], [13, 2], [13, 3], [5, 6], [6, 6], [14, 0], [13, 1], [14, 2], [7, 6], [8, 6], [9, 6], [15, 0], [15, 1], [15, 2], [15, 3], [14, 4], [15, 5], [10, 6], [11, 6], [12, 6], [13, 6], [16, 5], [16, 6], [17, 0], [17, 1], [17, 2], [17, 3], [17, 4], [17, 5]],
		size: 			[18, 7]
	},
	Mchose_K99:{
		name: "Mchose K99",
		vKeyNames:      [
		"Esc",         "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",   "F9", "F10", "F11", "F12",    "Delete",		  "NULL",  "Home",  "End",  "Pgup", "Pgdn",    //18

		"`",     "1",  "2",  "3",  "4",  "5",  "6",  "7", "8", "9", "0", "-_", "=+","Backspace",          "PgUp",         "NumLock","Num /","Num *", "Num -",   //19
	
		"Tab",       "Q",  "W",  "E",  "R",  "T", " Y", "U","I", "O", "P",  "[",  "]",   "\\",            "PgDn",         "Num 7", "Num 8", "Num 9", "Num +",   //19
	
		"CapsLock",       "A",  "S",  "D",  "F", "G", "H", "J", "K",  "L", ";", "'",    "Enter",                          "Num 4", "Num 5", "Num 6",            //16
	
		"Left Shift",      "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",          "Right Shift",    "Up Arrow",       "Num 1", "Num 2", "Num 3",            //16
	
		"Left Ctrl","Left Win","Left Alt",      "Space",     "Right Alt","Fn","Right Ctrl","Left Arrow","Down Arrow","Right Arrow","Num 0","Num .","Num Enter"  //13
	],
		vKeys: 		    [ 
			0, 6, 12,18,24,30,36,42,48,54,60,66,72,78,84,90,96, 102,108,
			1, 7, 13,19,25,31,37,43,49,55,61,67,73,79,85,91,97, 103,109,
			2, 8, 14,20,26,32,38,44,50,56,62,68,74,80,86,92,98, 104,110,
			3, 9, 15,21,27,33,39,45,51,57,63,69,   81,   93,99, 105,
			4, 10,16,22,28,34,40,46,52,58,64,	   82,88,94,100,106,112,
			5, 11,17,      35,      53,59,      77,83,89,95,101,107,],
		vKeyPositions: 	[[2, 0], [7, 0], [12, 0], [17, 0], [22, 0], [27, 0], [34, 0], [39, 0], [44, 0], [49, 0], [56, 0], [61, 0], [66, 0], [71, 0], [79, 0], [85, 0], [90, 0], [95, 0], [100, 0], 
		[2, 7], [7, 7], [12, 7], [17, 7], [22, 7], [27, 7], [32, 7], [37, 7], [42, 7], [47, 7], [52, 7], [57, 7], [62, 7], [69, 7], [79, 7], [85, 7], [90, 7], [95, 7], [100, 7], 
		[3, 12],[9,12], [14,12], [19,12], [24,12], [29,12], [34,12], [39,12], [44,12], [49,12], [54,12], [59,12], [64,12], [70,12], [79,12], [85,12], [90,12], [95,12], [100,15],
		[4, 17],[10,17],[15,17], [20,17], [25,17], [30,17], [35,17], [40,17], [45,17], [50,17], [55,17], [60,17],       [68,17],             [85,17], [90,17], [95,17], 
		[5, 22],[13,22],[18,22], [23,22], [28,22], [33,22], [38,22], [43,22], [48,22], [53,22], [58,22],               [67,22],     [79,23], [85,22], [90,22], [95,22], [100,25], 
		[3, 27],[9, 27],[15, 27], 					[34, 27], 						  [52,27],   [59, 27],    [65, 27],   [72, 28], [79, 28],[84,28], [90,27], [95,27]],
		size: 			[103, 32]
	},
	Mchose_G98:{
		name: "Mchose G98",
		vKeyNames:      [
			"Esc",         "F1", "F2", "F3", "F4",   "F5", "F6", "F7", "F8",   "F9", "F10", "F11", "F12",    "Delete",		  "NULL",  "Home",  "End",  "Pgup", "Pgdn",    //18

	"`",     "1",  "2",  "3",  "4",  "5",  "6",  "7", "8", "9", "0", "-_", "=+","Backspace",          "PgUp",         "NumLock","Num /","Num *", "Num -",   //19

	"Tab",       "Q",  "W",  "E",  "R",  "T", " Y", "U","I", "O", "P",  "[",  "]",   "\\",            "PgDn",         "Num 7", "Num 8", "Num 9", "Num +",   //19

	"CapsLock",       "A",  "S",  "D",  "F", "G", "H", "J", "K",  "L", ";", "'",    "Enter",                          "Num 4", "Num 5", "Num 6",            //16

	"Left Shift",      "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/",          "Right Shift",    "Up Arrow",       "Num 1", "Num 2", "Num 3",            //16

	"Left Ctrl","Left Win","Left Alt",      "Space",     "Right Alt","Fn","Right Ctrl","Left Arrow","Down Arrow","Right Arrow","Num 0","Num .","Num Enter"  //13
	],
		vKeys: 		    [ 
			0, 6, 12,18,24,30,36,42,48,54,60,66,72,78,84,90,96, 102,108,
			1, 7, 13,19,25,31,37,43,49,55,61,67,73,79,85,91,97, 103,109,
			2, 8, 14,20,26,32,38,44,50,56,62,68,74,80,86,92,98, 104,110,
			3, 9, 15,21,27,33,39,45,51,57,63,69,   81,   93,99, 105,
			4, 10,16,22,28,34,40,46,52,58,64,	   82,88,94,100,106,112,
			5, 11,17,      35,      53,59,65,      77,83,89,95,101,107,],
		vKeyPositions: 	[
			[2, 0], [7, 0], [12, 0], [17, 0], [22, 0], [27, 0], [34, 0], [39, 0], [44, 0], [49, 0], [56, 0], [61, 0], [66, 0], [71, 0], [79, 0], [85, 0], [90, 0], [95, 0], [100, 0], 
			[2, 7], [7, 7], [12, 7], [17, 7], [22, 7], [27, 7], [32, 7], [37, 7], [42, 7], [47, 7], [52, 7], [57, 7], [62, 7], [69, 7], [79, 7], [85, 7], [90, 7], [95, 7], [100, 7], 
			[3, 12],[9,12], [14,12], [19,12], [24,12], [29,12], [34,12], [39,12], [44,12], [49,12], [54,12], [59,12], [64,12], [70,12], [79,12], [85,12], [90,12], [95,12], [100,15],
			[4, 17],[10,17],[15,17], [20,17], [25,17], [30,17], [35,17], [40,17], [45,17], [50,17], [55,17], [60,17],       [68,17],             [85,17], [90,17], [95,17], 
			[5, 22],[13,22],[18,22], [23,22], [28,22], [33,22], [38,22], [43,22], [48,22], [53,22], [58,22],               [67,22],     [79,23], [85,22], [90,22], [95,22], [100,25], 
			[3, 27],[9, 27],[15, 27], 					[34, 27], 				  [48,27],	  [52,27],   [59, 27],    [65, 27],   [72, 28], [79, 28],[84,28], [90,27], [95,27]
		],
		size: 			[103, 32]
	},
};



/*
Public function
Operation
*/

function hexToRgb(hex) 
{
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let colors = [];
	colors[0] = parseInt(result[1], 16);
	colors[1] = parseInt(result[2], 16);
	colors[2] = parseInt(result[3], 16);

	return colors;
}

function sumArray(array) 
{
	const sum = array.filter(Number.isFinite) 
				   .reduce((acc, num) => acc + num, 0); 
	return sum;
}

function getHighLow(num) 
{
	const high = (num >>> 8) & 0xFF; 
	const low = num & 0xFF; 
	return { high, low }; 
}

/*
Public function
key
*/

/*init key*/
export function Size() 
{
	device.log('@Size');
	// device.log( boards[boardModel]);
	// return boards[boardModel].size;
}

export function LedNames() 
{
	vKeyNames = boards[boardModel].vKeyNames;

	return vKeyNames;
}

export function LedPositions() 
{
	vKeyPositions = boards[boardModel].vKeyPositions;

	return vKeyPositions;
}

export function onboardModelChanged () 
{
	vKeyNames = boards[boardModel].vKeyNames;
	vKeyPositions = boards[boardModel].vKeyPositions;
	vKeys = boards[boardModel].vKeys;

	device.setName(boards[boardModel].name);
	device.setControllableLeds(vKeyNames, vKeyPositions);
	device.setSize(boards[boardModel].size);
	device.log(`Model set to: ` + boards[boardModel].name);
	device.log('@Nuonuo');
}


export function Initialize() 
{
	vKeyNames = boards[boardModel].vKeyNames;
	vKeyPositions = boards[boardModel].vKeyPositions;
	vKeys = boards[boardModel].vKeys;

	device.setControllableLeds(vKeyNames, vKeyPositions);
	device.setName(boards[boardModel].name);
	device.setSize(boards[boardModel].size);
	device.log(`Model set to: ` + boards[boardModel].name);
	device.log('@Nuonuo V1.0');

}


export function Render() 
{
	sendColors();
	device.pause(1);
}



/*
Get RGB
*/
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

export function Shutdown() 
{

}

export function Validate(endpoint) 
{
	return endpoint.interface === 1 && endpoint.usage === 0x0001 && endpoint.usage_page === 0xff00;
}