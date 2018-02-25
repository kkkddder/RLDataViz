var p5_colors = new p5(function(sketch){
	// var MNheader = ["MN01: Marble Hill-Inwood","MN35: Washington Heights North","MN36: Washington Heights South","MN03: Central Harlem North-Polo Grounds","MN04: Hamilton Heights","MN06: Manhattanville","MN09: Morningside Heights","MN11: Central Harlem South","MN33: East Harlem South","MN34: East Harlem North","MN12: Upper West Side","MN32: Yorkville","MN31: Lenox Hill-Roosevelt Island","MN14: Lincoln Square","MN15: Clinton","MN17: Midtown-Midtown South","MN19: Turtle Bay-East Midtown","MN20: Murray Hill-Kips Bay","MN13: Hudson Yards-Chelsea-Flatiron-Union Square","MN21: Gramercy","MN22: East Village","MN23: West Village","MN24: SoHo-TriBeCa-Civic Center-Little Italy","MN28: Lower East Side","MN27: Chinatown","MN25: Battery Park City-Lower Manhattan"];
	var MNheader = ["Marble Hill-Inwood","Washington North","Washington South","Central Harlem North","Hamilton Heights","Manhattanville","Morningside Heights","Central Harlem South","East Harlem South","East Harlem North","Upper West Side","Yorkville","Lenox Hill","Lincoln Square","Clinton","Midtown South","Turtle Bay","Murray Hill","Hudson Yards","Gramercy","East Village","West Village","SoHo-TriBeCa","Lower East Side","Chinatown","Lower Manhattan"];
	var MNyear = ["1900", "1910","1920", "1930","1940", "1950","1960", "1970","1980", "1990","2000", "2010"]; 
	var canvasprop;
	var textColor = sketch.color(120,120,120);
	var textsize = 12;
	sketch.preload = function() {
		MNTable1 = sketch.loadTable('../../assignment/assignment5/data/part1.csv', 'csv', 'header'); // tell it read the first row as header
	}


	sketch.setup = function() {
  		var cnv = sketch.createCanvas(sketch.windowWidth*0.9, sketch.windowWidth*0.9*350/1350); 
  		sketch.print(sketch.windowWidth);
  		// var cnv = sketch.createCanvas(1350, 350); 
  		sketch.textFont("Nunito");
  		cnv.parent('neighborhood');
  		sketch.noLoop();
  		// sketch.background(220);
  		sketch.noLoop();

	}

	sketch.drawGraph = function() {
		sketch.background(255);
		var to = sketch.color(0, 0, 0);
		var from = sketch.color(255, 255, 255);
		canvasprop = sketch.windowWidth / 1350*0.9;
		sketch.print(MNTable1.getRowCount());
		sketch.textSize(textsize * canvasprop);
		// sketch.print(canvasprop);
		for (var j =1; j <= 26; j++) {
			for (var i = 0; i < MNTable1.getRowCount(); i++) {
				var year = MNTable1.getNum(i, 'Year');
				var number = MNTable1.getNum (i, j);
				var r = number * 50 / 1090;
				var colorBox = sketch.lerpColor(from, to, r);
				// print(r);
				sketch.fill(colorBox);
				sketch.stroke(255);
				sketch.rect((i * 10) * canvasprop, ((j-1)*10) * canvasprop, 10*canvasprop, 10*canvasprop);
			}
			sketch.fill(textColor);
			// sketch.print(MNheader[j-1]);
			sketch.text(MNheader[j-1], 1170 * canvasprop, j * 10 * canvasprop);
		}
		for (var k = 0; k < 12; k++) {
			sketch.fill(textColor);
			sketch.text(MNyear[k], (k * 100) * canvasprop, 280 * canvasprop);
		}

		for (var m = 0; m <11; m++) {
			var colorBox = sketch.lerpColor(from, to, (10- m)/10);
					// print(r);
			sketch.fill(colorBox);
			sketch.stroke(220);
			sketch.strokeWeight(1);
					// sketch.noStroke();
			sketch.rect((605 + m*10)*canvasprop, 320*canvasprop, 10*canvasprop, 10*canvasprop);
			if (m == 0) {
				sketch.fill(textColor);
				sketch.text("1090",605 * canvasprop, 350 * canvasprop);
			} 
			else if (m == 10) {
				sketch.fill(textColor);
				sketch.text("0",715* canvasprop, 350* canvasprop);
			}
			
		}
		sketch.fill(textColor);
		sketch.text("Number of Buildings",605* canvasprop, 310* canvasprop);
	}

	sketch.mousePressed = function() {
		if ( sketch.mouseX < (1160 * canvasprop) && sketch.mouseY < (260 * canvasprop)) {
			var i = Math.floor(sketch.mouseX / (10 * canvasprop));
			var j = Math.floor(sketch.mouseY / (10 * canvasprop));
			var leftX = i * 10 * canvasprop;
			var rightX = (i + 1) * 10 * canvasprop;
			var topY = j * 10 * canvasprop;
			var bottomY = (j + 1) * 10 * canvasprop;
			sketch.print(i);
			sketch.print(j);
			if (sketch.mouseX >= leftX && sketch.mouseX < rightX && sketch.mouseY >= topY && sketch.mouseY < bottomY) {
				sketch.fill(230);
				sketch.stroke(255);
				sketch.strokeWeight(2);
				sketch.rect(rightX, bottomY, 160 * canvasprop, 80 * canvasprop, 0.5);
				var year = MNTable1.getNum(i, 'Year');
				var neighborhood = MNheader[j];
				var number = MNTable1.getNum(i, j+1);
				sketch.print(year);
				sketch.print(neighborhood);
				sketch.print(number);
				sketch.fill(textColor);
				sketch.noStroke();
				sketch.textSize(textsize * canvasprop);
				sketch.text("Neighborhood: " + neighborhood + "\n" + "Year: " + year + "\n" + "Number of Buildings: " + number, rightX + 8 * canvasprop, bottomY + 8 * canvasprop, 160 * canvasprop, 80 * canvasprop, 10);
			}
		}
	}

	sketch.mouseMoved = function() {
		if ((sketch.mouseX - sketch.pmouseX) != 0 || (sketch.mouseY - sketch.pmouseY) != 0) {
			sketch.redraw();
		}
		
	}

// Draw function
	sketch.draw = function() {
		sketch.drawGraph();
	}

	sketch.windowResized = function() {
	  sketch.resizeCanvas(sketch.windowWidth*0.9, sketch.windowWidth*0.9*350/1350);
	  sketch.redraw();
	}
});

var p5_bubbles = new p5(function(sketch) {
	var MNyear = ["1900", "1910","1920", "1930","1940", "1950","1960", "1970","1980", "1990","2000", "2010"]; 
	var numLot = [0,10,20,30,40,50,60];
	sketch.preload = function() {
		MNTable2 = sketch.loadTable('../../assignment/assignment5/data/part2.csv', 'csv', 'header'); // tell it read the first row as header
		// console.log('Table has been loaded...'); // console.log for js in general, print for p5 library
		sketch.print(MNTable2.getRowCount());
	}

	sketch.setup = function() {
  		var cnv = sketch.createCanvas(sketch.windowWidth*0.9, sketch.windowWidth*0.9*700/1200); 
  		sketch.textFont("Nunito");
  		cnv.parent('lot');
  		sketch.noLoop();
	}
	
	sketch.draw = function() {
		var currentRow = 0;
		var to = sketch.color(0, 0, 0);
		var from = sketch.color(255, 255, 255);
		var textColor = sketch.color(120,120,120);
		var canvasprop = sketch.windowWidth / 1200 *0.9;
		for (var j =1900; j < 2016; j++) {
			var numEachYear = 0;
			sketch.stroke(to);
			sketch.line(((j-1900) * 10) * canvasprop, 660 * canvasprop, ((j-1900) * 10 + 10)* canvasprop, 660* canvasprop);
			// sketch.print((j-1900) * 10 + 20);
			for (var i = currentRow; i < MNTable2.getRowCount(); i++) {
				var year = MNTable2.getNum(i, 'Year');
				var far = MNTable2.getNum (i, 'BFAR');
				// for (var j = 1900; j < 2016; j++) {
				// print(numEachYear);
				if (year == j) {
					numEachYear++;
					var r = far / 12.5;
					var colorBox = sketch.lerpColor(from, to, r);
					// print(r);
					sketch.fill(colorBox);
					sketch.stroke(220);
					// sketch.noStroke();
					sketch.rect(((j-1900) * 10) * canvasprop, (660 - numEachYear*10) * canvasprop, 10*canvasprop, 10*canvasprop);
				}
				else{
					if (numEachYear >= 3) {
						sketch.fill(to);
						sketch.text(numEachYear, ((j-1900) * 10) * canvasprop, (660 - (numEachYear + 1)*10) * canvasprop);
					};
					break;
				}
				currentRow++;
			}
		}
		for (var k = 0; k < 12; k++) {
			sketch.fill(textColor);
			sketch.text(MNyear[k], (k * 100) * canvasprop, 680 * canvasprop);
		}
		for (var m = 0; m <11; m++) {
			var colorBox = sketch.lerpColor(from, to, (10- m)/10);
					// print(r);
			sketch.fill(colorBox);
			sketch.stroke(220);
					// sketch.noStroke();
			sketch.rect(1060* canvasprop, (140-m*10)*canvasprop, canvasprop*10, 10 * canvasprop);
			if (m == 0) {
				sketch.fill(textColor);
				sketch.text("12.5",1080*canvasprop, (150 - m * 10) * canvasprop);
			} 
			else if (m == 10) {
				sketch.fill(textColor);
				sketch.text("0",1080*canvasprop, (150 - m * 10) * canvasprop);
			}
			
		}
		sketch.fill(textColor);
		sketch.text("Built FAR",1060 * canvasprop, 30 * canvasprop);
	}
	sketch.windowResized = function() {
	  sketch.resizeCanvas(sketch.windowWidth*0.9, sketch.windowWidth*0.9*700/1200);
	}
	
});