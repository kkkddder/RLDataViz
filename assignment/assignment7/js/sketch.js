var FbaseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
// http might give your warning

// **** Global Variables ***** //
var apiKey = 'f1094c376b88f0d831e9da7a560535c8';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
var weatherData;
var weatherDataForecast;
var button;
var cityInput;
var description = '';
var temperature = 0;
var humidity = 0;
var speed = 0;
var sunrise = 0;
var sunset = 0;
var pressure = 0;
// PShape s;
var imgTemp;
var imgSpeed;
var imgHum;
var imgSunrise;
var imgSunset;
var imgPressure;
var imgWeather;
var FTemp = "";
var FHum = "";
var FPressure = "";
var FSpeed = "";
var FTempL = [];
var FSpeedL = [];
var FPressureL = [];
var FHumL = [];
var minTemp = 0;
var maxTemp = 0;
var minSpeed = 0;
var maxSpeed = 0;
var minPressure = 0;
var maxPressure = 0;
var minHum = 0;
var maxHum = 0;
var len = 0;


// **** Setup Function ****** //
function preload() {
    imgTemp = loadImage('svg/wi-fahrenheit.svg');
    imgSpeed = loadImage('svg/wi-strong-wind.svg');
    imgHum = loadImage('svg/drop.png');
    imgSunrise = loadImage('svg/wi-sunrise.svg');
    imgSunset = loadImage('svg/wi-sunset.svg');
    imgPressure = loadImage('svg/pressure.png');
    imgWeather = loadImage('svg/wi-cloudy.svg');
    
}

function setup(){
  var cnv = createCanvas(800, 800);
  cnv.parent('weather');
  button = select('#submit');
  cityInput = select('#city');
  button.mousePressed(queryAPI);

  noLoop();
}

// **** Query API Function *** //
function queryAPI(){
  FTempL = [];
  FSpeedL = [];
  FPressureL = [];
  FHumL = [];
  
  var request = baseURL + cityInput.value() + '&apikey=' + apiKey;
  loadJSON(request, getWeatherData);

  var Frequest = FbaseURL + cityInput.value() + '&apikey=' + apiKey;
  loadJSON(Frequest, getFData);
  
}



function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = hour + ':' + min + ':' + sec ;
  return time;
}

function getFData(apiData){
  weatherDataForecast = apiData;
  len = weatherDataForecast.list.length;
  print(weatherDataForecast);
  
  for (var i = 0; i < len; i++) {
    FTemp = Math.round(((Number(weatherDataForecast.list[i].main.temp) - 273) * 9/5 + 32) * 100) / 100
    FSpeed = Number(weatherDataForecast.list[i].wind.speed);
    FPressure = Number(weatherDataForecast.list[i].main.pressure);
    FHum = Math.round(Number(weatherDataForecast.list[i].main.humidity) * 10) /10;
    FTempL.push(FTemp);
    FSpeedL.push(FSpeed);
    FPressureL.push(FPressure);
    FHumL.push(FHum);

  }
  minTemp = min(FTempL);
  maxTemp = max(FTempL);
  minSpeed = min(FSpeedL);
  maxSpeed = max(FSpeedL);
  minPressure = min(FPressureL);
  maxPressure = max(FPressureL);
  minHum = min(FHumL);
  maxHum = max(FHumL);

  print(FTempL.length);
  print(FTempL);
  redraw();
}

function getWeatherData(apiData){
  weatherData = apiData;
  description = weatherData.weather[0].main;
  temperature = Math.round(((Number(weatherData.main.temp) - 273) * 9/5 + 32) * 100) / 100;
  humidity = Math.round(Number(weatherData.main.humidity) * 10) /10;
  speed = weatherData.wind.speed;
  pressure = weatherData.main.pressure;
  sunrise = timeConverter(weatherData.sys.sunrise);
  sunset = timeConverter(weatherData.sys.sunset);
  cityName = weatherData.name;

  FTempL.push(temperature);
  FSpeedL.push(speed);
  FPressureL.push(pressure);
  FHumL.push(humidity);

  print(weatherData);
  redraw();
}

function mouseMoved() {
  // textSize(45);
  if (mouseX >= 400 && mouseX <= 600 && mouseY >= 0 && mouseY <= 200) {
    // text(temperature + "F", 450, 90);
    strokeWeight(5);
    stroke(255);
    fill(235);
    rect(400, 0, 200, 200);
    rect(0, 400, 800, 400);
    fill(0);
    noStroke();
    textSize(45);
    text(temperature, 500, 100);
    image(imgTemp, 550, 80, 50, 50);
    

    beginShape();
    noFill();
    stroke(0);
    strokeWeight(5);
    for (var i = 0; i < len + 1; i++) {
      // start = map(minT[i], minTemp-2, maxTemp+2, 750, 420);
      end = map(FTempL[i], minTemp, maxTemp, 750, 450);
      // fill(0);
      if (i == 0 || i == len ) {
        curveVertex(i * 16 + 80, end);
      }
      curveVertex(i * 16 + 80, end);
      ellipse(i * 16 + 80, end, 5, 5);
      if (i == 0 || i == 7 || i == 15 || i == 23 || i == 31 || i == 39) {
        textSize(15);
      // noStroke();
        strokeWeight(0.1);
        fill(0);
        if (i == 0) {
          text("current", i * 16 + 90, end + 30);
        } else if(i == 7) {
          text(((i + 1) / 8).toString() + " day",i * 16 + 80, end + 30);
        } else {
          text(((i + 1) / 8).toString() + " days",i * 16 + 80, end + 30);
        }
        
      }

      stroke(0);
      noFill();
      strokeWeight(5);
    }
    endShape();

    textSize(15);
      // noStroke();
    strokeWeight(0.1);
    fill(0);
    
    var first = map(minTemp, minTemp, maxTemp, 750, 450);
    var fifth = map(maxTemp, minTemp, maxTemp, 750, 450);
    var second = map(minTemp * 3 / 4 + maxTemp / 4 , minTemp, maxTemp, 750, 450);
    var third = map(minTemp / 2 + maxTemp / 2, minTemp, maxTemp, 750, 450);
    var fourth = map(maxTemp * 3 / 4 + minTemp / 4 , minTemp, maxTemp, 750, 450);

    text((Math.round(minTemp * 100)/ 100).toString(), 40, first);
    text((Math.round(maxTemp * 100)/ 100).toString(), 40, fifth);
    text((Math.round((minTemp * 3 / 4 + maxTemp / 4 ) * 100) / 100).toString(), 40, second);
    text((Math.round((minTemp / 2 + maxTemp / 2) * 100) / 100).toString(), 40, third);
    text((Math.round((maxTemp * 3 / 4 + minTemp / 4 ) * 100) / 100).toString(), 40, fourth);



  }
  else if (mouseX >= 600 && mouseX <= 800 && mouseY >= 0 && mouseY <= 200) {
    // text(temperature + "F", 450, 90);
    strokeWeight(5);
    stroke(255);
    fill(235);
    rect(600, 0, 200, 200);
    rect(0, 400, 800, 400);
    fill(0);
    noStroke();
    textSize(45);
    text(speed, 700, 100);
    textSize(20);
    text("m/s", 760, 105);

    beginShape();
    noFill();
    stroke(0);
    strokeWeight(5);
    for (var i = 0; i < len + 1; i++) {
      // start = map(minT[i], minTemp-2, maxTemp+2, 750, 450);
      // end = map(FSpeedL[i], minSpeed, maxSpeed, 750, 450);

      end = map(FSpeedL[i], minSpeed, maxSpeed, 750, 450);
      // fill(0);

      if (i == 0 || i == len ) {
        curveVertex(i * 16 + 80, end);
      }
      curveVertex(i * 16 + 80, end);
      ellipse(i * 16 + 80, end, 5, 5);
      if (i == 0 || i == 7 || i == 15 || i == 23 || i == 31 || i == 39) {
        textSize(15);
      // noStroke();
        strokeWeight(0.1);
        fill(0);
        if (i == 0) {
          text("current", i * 16 + 90, end + 30);
        } else if (i == 7) {
          text(((i + 1) / 8).toString() + " day",i * 16 + 80, end + 30);
        } else {
          text(((i + 1) / 8).toString() + " days",i * 16 + 80, end + 30);
        }
        
      }

      stroke(0);
      noFill();
      strokeWeight(5);
    }
    endShape();

    textSize(15);
      // noStroke();
    strokeWeight(0.1);
    fill(0);


    var first = map(minSpeed , minSpeed, maxSpeed, 750, 450);
    var fifth = map(maxSpeed, minSpeed, maxSpeed, 750, 450);
    var second = map(minSpeed * 3 / 4 + maxSpeed / 4, minSpeed, maxSpeed, 750, 450);
    var third = map(minSpeed / 2 + maxSpeed / 2, minSpeed, maxSpeed, 750, 450);
    var fourth = map(maxSpeed * 3 / 4 + minSpeed / 4 , minSpeed, maxSpeed, 750, 450);

    text((Math.round((minSpeed) * 100)/ 100).toString(), 40, first);
    text((Math.round((maxSpeed ) * 100)/ 100).toString(), 40, fifth);
    text((Math.round((minSpeed * 3 / 4 + maxSpeed / 4 ) * 100) / 100).toString(), 40, second);
    text((Math.round((minSpeed / 2 + maxSpeed / 2) * 100) / 100).toString(), 40, third);
    text((Math.round((maxSpeed * 3 / 4 + minSpeed / 4 ) * 100) / 100).toString(), 40, fourth);
  }
  else if (mouseX >= 400 && mouseX <= 600 && mouseY >= 200 && mouseY <= 400) {
    // text(temperature + "F", 450, 90);
    strokeWeight(5);
    stroke(255);
    fill(235);
    rect(400, 200, 200, 200);
    rect(0, 400, 800, 400);
    fill(0);
    noStroke();
    textSize(45);
    text(humidity, 500, 300);
    textSize(20);
    text('%', 550, 305);


    beginShape();
    noFill();
    stroke(0);
    strokeWeight(5);

    for (var i = 0; i < len + 1; i++) {
      // start = map(minT[i], minTemp-2, maxTemp+2, 780, 450);
      end = map(FHumL[i], minHum, maxHum, 750, 450);
      // fill(0);

      if (i == 0 || i ==  len) {
        curveVertex(i * 16 + 80, end);
      }
      curveVertex(i * 16 + 80, end);
      ellipse(i * 16 + 80, end, 5, 5);

      if (i == 0 || i == 7 || i == 15 || i == 23 || i == 31 || i == 39) {
        textSize(15);
      // noStroke();
        strokeWeight(0.1);
        fill(0);
        if (i == 0) {
          text("current", i * 16 + 90, end + 30);
        } else if (i == 7) {
          text(((i + 1) / 8).toString() + " day",i * 16 + 80, end + 30);
        } else {
          text(((i + 1) / 8).toString() + " days",i * 16 + 80, end + 30);
        }
        
      }

      stroke(0);
      noFill();
      strokeWeight(5);
    }
    endShape();

    textSize(15);
      // noStroke();
    strokeWeight(0.1);
    fill(0);
    // text("Current", 90, 760);
    var first = map(minHum, minHum, maxHum, 750, 450);
    var fifth = map(maxHum, minHum, maxHum, 750, 450);
    var second = map(minHum * 3 / 4 + maxHum / 4 , minHum, maxHum, 750, 450);
    var third = map(minHum / 2 + maxHum / 2, minHum, maxHum, 750, 450);
    var fourth = map(maxHum * 3 / 4 + minHum / 4 , minHum, maxHum, 750, 450);

    text((Math.round(minHum * 100)/ 100).toString(), 40, first);
    text((Math.round(maxHum * 100)/ 100).toString(), 40, fifth);

    text((Math.round((minHum * 3 / 4 + maxHum / 4 ) * 100) / 100).toString(), 40, second);
    text((Math.round((minHum / 2 + maxHum / 2) * 100) / 100).toString(), 40, third);
    text((Math.round((maxHum * 3 / 4 + minHum / 4 ) * 100) / 100).toString(), 40, fourth);
  }
  else if (mouseX >= 600 && mouseX <= 800 && mouseY >= 200 && mouseY <= 400) {
    // text(temperature + "F", 450, 90);
    strokeWeight(5);
    stroke(255);
    fill(235);
    rect(600, 200, 200, 200);
    rect(0, 400, 800, 400);
    fill(0);
    noStroke();
    textSize(45);
    text(pressure, 700, 300);
    textSize(20);
    text("hPa", 775, 305);

    beginShape();
    noFill();
    stroke(0);
    strokeWeight(5);
    for (var i = 0; i < len + 1; i++) {
      // start = map(minT[i], minTemp-2, maxTemp+2, 750, 450);
      end = map(FPressureL[i], minPressure, maxPressure, 750, 450);
      // fill(0);

      if (i == 0 || i == len) {
        curveVertex(i * 16 + 80, end);
      }
      curveVertex(i * 16 + 80, end);
      ellipse(i * 16 + 80, end, 5, 5);

      if (i == 0 || i == 7 || i == 15 || i == 23 || i == 31 || i == 39) {
        textSize(15);
      // noStroke();
        strokeWeight(0.1);
        fill(0);
        if (i == 0) {
          text("current", i * 16 + 90, end + 30);
        } else if (i == 7) {
          text(((i + 1) / 8).toString() + " day",i * 16 + 80, end + 30);
        } else {
          text(((i + 1) / 8).toString() + " days",i * 16 + 80, end + 30);
        }
        
      }

      stroke(0);
      noFill();
      strokeWeight(5);
    }
    endShape();

    textSize(15);
      // noStroke();
    strokeWeight(0.1);
    fill(0);
    // text("Current", 90, 760);
    var first = map(minPressure, minPressure, maxPressure, 750, 450);
    var fifth = map(maxPressure, minPressure, maxPressure, 750, 450);
    var second = map(minPressure * 3 / 4 + maxPressure / 4 , minPressure, maxPressure, 750, 450);
    var third = map(minPressure / 2 + maxPressure / 2, minPressure, maxPressure, 750, 450);
    var fourth = map(maxPressure * 3 / 4 + minPressure / 4 , minPressure, maxPressure, 750, 450);

    text((Math.round(minPressure * 100)/ 100).toString(), 40, first);
    text((Math.round(maxPressure * 100)/ 100).toString(), 40, fifth);
    text((Math.round((minPressure * 3 / 4 + maxPressure / 4 ) * 100) / 100).toString(), 40, second);
    text((Math.round((minPressure / 2 + maxPressure / 2) * 100) / 100).toString(), 40, third);
    text((Math.round((maxPressure * 3 / 4 + minPressure / 4 ) * 100) / 100).toString(), 40, fourth);
    
  }
  else {
    redraw();
  }
}

// **** Draw Function **** //
function draw(){
  textFont('Nunito');
  // background(255);
  stroke(255);
  strokeWeight(5);
  fill(245);
  rect(0, 0, 400, 200);
  fill(235);
  rect(0, 200, 400, 200);
  rect(200, 200, 200, 200);
  fill(225);
  rect(400, 0, 200, 200);
  fill(215);
  rect(600, 0, 200, 200);
  fill(205);
  rect(400, 200, 200, 200);
  fill(195);
  rect(600, 200, 200, 200);
  fill(185);
  rect(0, 400, 800, 400);
  // shape(s, 10, 10, 80, 80);
  text(110, 100);
  image(imgTemp, 420, 30, 160, 160);
  image(imgSpeed, 640, 40, 120, 120);
  image(imgHum, 460, 255, 90, 90);
  image(imgSunrise, 50, 255, 100, 100);
  image(imgSunset, 250, 250, 100, 100);
  image(imgPressure, 650, 250, 100, 100);
  
  noStroke();
  textSize(35);
  fill(0);
  textAlign(CENTER, CENTER);
  image(imgWeather, 130, 30, 140, 140);
  if (weatherData && weatherDataForecast){
    stroke(255);
    strokeWeight(5);
    fill(245);
    rect(0, 0, 400, 200);
    fill(235);
    rect(0, 200, 200, 200);
    rect(200, 200, 200, 200);
    noStroke();
    textSize(30);
    fill(0);
    text(cityName, 200, 50);
    textSize(55);
    text(description, 200, 130);
    textSize(45);
    text(sunrise, 100, 300);
    text(sunset, 300, 300);
  }
}