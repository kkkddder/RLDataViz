// **** Global variables **** //
// var MNheader = ["MN01","MN35","MN36","MN03","MN04","MN06","MN09","MN11","MN33","MN34","MN12","MN32","MN31","MN14","MN15","MN17","MN19","MN20","MN13","MN21","MN22","MN23","MN24","MN28","MN27","MN25"];
var MNheader = ["MN01: Marble Hill-Inwood","MN35: Washington Heights North","MN36: Washington Heights South","MN03: Central Harlem North-Polo Grounds","MN04: Hamilton Heights","MN06: Manhattanville","MN09: Morningside Heights","MN11: Central Harlem South","MN33: East Harlem South","MN34: East Harlem North","MN12: Upper West Side","MN32: Yorkville","MN31: Lenox Hill-Roosevelt Island","MN14: Lincoln Square","MN15: Clinton","MN17: Midtown-Midtown South","MN19: Turtle Bay-East Midtown","MN20: Murray Hill-Kips Bay","MN13: Hudson Yards-Chelsea-Flatiron-Union Square","MN21: Gramercy","MN22: East Village","MN23: West Village","MN24: SoHo-TriBeCa-Civic Center-Little Italy","MN28: Lower East Side","MN27: Chinatown","MN25: Battery Park City-Lower Manhattan"];
var MNheader = ["Marble Hill-Inwood","Washington Heights North","Washington Heights South","Central Harlem North-Polo Grounds","Hamilton Heights","Manhattanville","Morningside Heights","Central Harlem South","East Harlem South","East Harlem North","Upper West Side","Yorkville","Lenox Hill-Roosevelt Island","Lincoln Square","Clinton","Midtown-Midtown South","Turtle Bay-East Midtown","Murray Hill-Kips Bay","Hudson Yards-Chelsea-Flatiron-Union Square","Gramercy","East Village","West Village","SoHo-TriBeCa-Civic Center-Little Italy","Lower East Side","Chinatown","Battery Park City-Lower Manhattan"];
var MNyear = ["1900", "1910","1920", "1930","1940", "1950","1960", "1970","1980", "1990","2000", "2010"]; 
// var scores = [6, 9, 8.5, 10, 3];
// var lengthMultiplier = 50;


function preload() { // load data first
	MNTable = loadTable('../../../assignment/assignment5/data/part1.csv', 'csv', 'header'); // tell it read the first row as header
	console.log('Table has been loaded...'); // console.log for js in general, print for p5 library
	print(MNTable.getRowCount());
}

function setup() {
	var cnv = createCanvas(1450,1450); // always create canvas first
	textFont("Nunito");
	cnv.class('grid');
	// print(movieTable.getRowCount());
	// print(movieTable.getColumnCount());
	// textAlign(RIGHT, TOP); // arrange the text horizontally or vertically
	// background(100);
	// background(220);
	noLoop(); // noLoop() to prevent the draw() function drawing once and once again
}

// function draw(){
// 	fill(0);
// 	for (var i = 0; i < scores.length; i++) {
// 		rect(120, 50 + 20 * i, scores[i] * lengthMultiplier, 10);
// 	}
// 	for (var i = 0; i < movieTiltes.length; i++) {
// 		text(movieTiltes[i], 110, 45 + 20 * i);
// 		text(scores[i], 150 + scores[i] * lengthMultiplier, 45 + 20 * i);
// 	}
// }

function draw() {
	// colorMode(HSB, 100);
	for (var j =1; j <= 26; j++) {
		// MNTable = loadTable('../data/try1.csv', 'csv', 'header');
		print(MNTable.getRowCount());
		var to = color(60, 10, 230);
		// var to = color(250, 250, 250);
		var from = color(255, 255, 255);
		// var to = color(255, 255, 255);
		for (var i = 0; i < MNTable.getRowCount(); i++) {
			var year = MNTable.getNum(i, 'Year');
			var number = MNTable.getNum (i, j);
			var r = number * 10 / 1090;
			var colorBox = lerpColor(from, to, r);
			// print(r);
			fill(colorBox);
			stroke(255);
			rect(i * 10 + 20, (j-1)*10, 10, 10);
		}
		fill(to);
		print(MNheader[j-1]);
		text(MNheader[j-1], 1200, (j-1)*10+10);
	}
	for (var k = 0; k < 12; k++) {
		text(MNyear[k], 20 + k * 100, 280);
	}
	// noFill();
	// stroke(0);
	// // curve(0, 0, 800, 500, 200, 1400, 0, 0);
	// beginShape();
	// curveVertex(-10, -10);
	// curveVertex(10, 30);
	// curveVertex(10, 400);
	// curveVertex(10, 600);
	// // curveVertex(40, 500);
	// // curveVertex(32, 100);
	// endShape();
		
}