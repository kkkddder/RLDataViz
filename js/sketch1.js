// Setup function


// var cnv;

// function centerCanvas() {
//   var x = (windowWidth - width) / 2;
//   var y = (windowHeight - height) / 2;
//   cnv.position(x, y);
// }

// function setup() {
//   cnv = createCanvas(1000, 1000);
//   cnv.parent('color');
//   centerCanvas();
//   background(255, 0, 200);
// }

// function windowResized() {
//   centerCanvas();
// }


function setup() {
  var canvas = createCanvas(500, 500);
 
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('color');

  background(255, 255, 255);
}


// Draw function
function draw() {
	noStroke();
	// var c = color(255, 204, 0);
	// var k = 0;
	var s = 0;
	var h = 0;
	colorMode(HSB);
	for (var i = 0; i < 100; i++) {
	  for (var j = 0; j < 100; j++) {
	    // stroke(i, j, 100);
	    // point(i, j);
	    // fill(i, j);
	    // fill(color(c));
	    // print(dis);
	    h = j * 360/ 100;
	    fill(h, s, 100);
	    
	    rect(j*5, i*5, 5, 5);
	  }
	  s++;
	  // k = k + 15;
	}

}


 
// save this file as sketch.js
// Sketch One
var s = function( p ) { // p could be any variable name
  p.setup = function() {
    p.createCanvas(800, 400);
  };

  p.draw = function() {
    p.noStroke();
	// var c = color(255, 204, 0);
	// var k = 0;
	var s = 0;
	colorMode(HSB);
	for (var i = 0; i < 100; i++) {
		var h = 360;
	  for (var j = 0; j < 100; j++) {
	    // stroke(i, j, 100);
	    // point(i, j);
	    // fill(i, j);
	    // fill(color(c));
	    p.fill(250, 100, 100);
	    // p.fill(0);
	    p.rect(j*10, i*10, 10, 10);
	    h = h - 3;
	  }
	  s++;
	  // k = k + 15;
	}
  };
 	
// };
// var myp5 = new p5(s, 'color');

// Sketch Two
// var t = function( p ) { 

//   p.setup = function() {
//     p.createCanvas(800, 400);
//   };

//   p.draw = function() {
//     noStroke();
// 	// var c = color(255, 204, 0);
// 	// var k = 0;
// 	var s = 0;
// 	colorMode(HSB);
// 	for (var i = 0; i < 100; i++) {
// 		var h = 360;
// 	  for (var j = 0; j < 100; j++) {
// 	    // stroke(i, j, 100);
// 	    // point(i, j);
// 	    // fill(i, j);
// 	    // fill(color(c));
// 	    fill(h, s, 100);
// 	    rect(j*10, i*10, 10, 10);
// 	    h = h - 3;
// 	  }
// 	  s++;
// 	  // k = k + 15;
// 	}

//   };
// };
// var myp5 = new p5(t, 'distance');

