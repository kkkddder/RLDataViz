var p5_colors = new p5(function(sketch){
	sketch.setup = function() {
  		var cnv = sketch.createCanvas(600, 600); 
  		cnv.parent('color');
  		// sketch.colorMode(HSL);
  		sketch.background(255);

	}

// Draw function
	sketch.draw = function() {
	sketch.noStroke();
	var r = 0;
	var g = 0;
	for (var i = 0; i < 100; i++) {
		r = i * 255/ 100;
		b = (100-i) * 255/ 100;
	  for (var j = 0; j < 100; j++) {
	    g = j * 255/ 100;
	    sketch.fill(r, g, b);
	    sketch.rect(j*6, i*6, 6, 6);
	  }
	}

}
});

var p5_bubbles = new p5(function(sketch) {
	sketch.setup = function() {
  		var cnv = sketch.createCanvas(600, 600); 
  		cnv.parent('distance');
  		sketch.background(255, 255, 255);
	}
	var x1 = 0;
	var y1 = 0;
	var dis = sketch.dist(sketch.mouseX, sketch.mouseY, x1, y1);
	// Draw function
	sketch.draw = function() {
		var s = 0;
		for (var i = 0; i < 30; i++) {
			var h = 360;
		  for (var j = 0; j < 30; j++) {
		    x1 = j * 20 + 10;
		    y1 = i * 20 + 10;
		    dis = sketch.abs(sketch.dist(sketch.mouseX, sketch.mouseY, x1, y1));
		    if (dis > 700) {
		    	sketch.fill(255);
		    	dis = 700;
		    }
		    else if (dis < 90){
		    	sketch.fill(dis * 255 / 700);
		    	dis = 90;
		    }
		    else {
		    	sketch.fill(dis * 255 / 700);
		    }
		    
		    sketch.ellipse(x1, y1, dis/30, dis/30);
		    h = h - 3;
		  }
		  s++;
		}
	}
	sketch.mouseMoved = function() {
	  sketch.ellipse(sketch.mouseX, sketch.mouseY, 5, 5);
	  sketch.background(255);
	  sketch.draw();
	  // prevent default
	  return false;
	}
});




// var s = function(sketch){
// 	sketch.setup = function() {
//   		var cnv = sketch.createCanvas(600, 600); 
//   		// cnv.parent('color');
//   		// sketch.colorMode(HSL);
//   		sketch.background(255);

// 	}

// // Draw function
// 	sketch.draw = function() {
// 	sketch.noStroke();
// 	var r = 0;
// 	var g = 0;
// 	for (var i = 0; i < 100; i++) {
// 		r = i * 255/ 100;
// 		b = (100-i) * 255/ 100;
// 	  for (var j = 0; j < 100; j++) {
// 	    g = j * 255/ 100;
// 	    sketch.fill(r, g, b);
// 	    sketch.rect(j*6, i*6, 6, 6);
// 	  }
// 	}
// }
// };
// var myp5 = new p5(s, 'color');


// var t =function(sketch) {
// 	sketch.setup = function() {
//   		var cnv = sketch.createCanvas(600, 600); 
//   		// cnv.parent('distance');
//   		sketch.background(255, 255, 255);
// 	}
// 	var x1 = 0;
// 	var y1 = 0;
// 	var dis = sketch.dist(sketch.mouseX, sketch.mouseY, x1, y1);
// 	// Draw function
// 	sketch.draw = function() {
// 		var s = 0;
// 		for (var i = 0; i < 30; i++) {
// 			var h = 360;
// 		  for (var j = 0; j < 30; j++) {
// 		    x1 = j * 20 + 10;
// 		    y1 = i * 20 + 10;
// 		    dis = sketch.abs(sketch.dist(sketch.mouseX, sketch.mouseY, x1, y1));
// 		    if (dis > 700) {
// 		    	sketch.fill(255);
// 		    	dis = 700;
// 		    }
// 		    else if (dis < 90){
// 		    	sketch.fill(dis * 225 / 700);
// 		    	dis = 90;
// 		    }
// 		    else {
// 		    	sketch.fill(dis * 225 / 700);
// 		    }
		    
// 		    sketch.ellipse(x1, y1, dis/30, dis/30);
// 		    h = h - 3;
// 		  }
// 		  s++;
// 		}
// 	}
// 	sketch.mouseMoved = function() {
// 	  sketch.ellipse(sketch.mouseX, sketch.mouseY, 5, 5);
// 	  sketch.background(255);
// 	  sketch.draw();
// 	  // prevent default
// 	  return false;
// 	}
// };
// var myp5 = new p5(t, 'distance');
