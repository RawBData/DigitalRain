/*
This is a simple matrix lettering program written in P5 Javascript
View this online @    https://rawbdata.github.io/DigitalRain/
Started On: 4/4/18
Finished On: Pending
*/
var streams;
var symbolSize = 20;
var charCodeStart;
var charCodeEnd;
var reset = false;
var charactersToUse;

var regularColor;
var differentColor;
var RRC;
var GRC;
var BRC;
var ColorSelect;
var specialBackgroundColor;

var imgBasketball;

function setup(){
	//color setup for regular and different (special random letters)
	ColorSelect = 'Hong Kong Neon';
	//only passing two variable because using Blue number as random
	RRC = 255;
	GRC = 66;
	BRC = round(random(0,255));
	differentColor = color(0,250,255);

	charactersToUse = createSelect();
	charactersToUse.option('Kata');
	charactersToUse.option('English');
	charactersToUse.option('IPA');
	charactersToUse.option('Devanagari');
	charactersToUse.option('Cyrillic');
	charactersToUse.option('Hebrew');
	charactersToUse.option('Arabic');
	charactersToUse.option('Bengali');
	charactersToUse.option('Tibetan');
	charactersToUse.option('Hangul');
	charactersToUse.option('Chinese');
	charactersToUse.option('Ethiopic');
	charactersToUse.option('Ben');
  	charactersToUse.changed(setDisplayCharacters);

  	charactersColor = createSelect();
  	charactersColor.option('Hong Kong Neon');
	charactersColor.option('Matrix');
	charactersColor.option("Warriors");
	charactersColor.option('USA');
	charactersColor.option('Noir');
	charactersColor.option('Rainbow');
	charactersColor.changed(setCharactersColor);


	//Load Image For Warriors
	//imgBasketball = loadImage("BBALL.png");

	createCanvas(
		window.innerWidth,
		window.innerHeight	
	);

	backgroundColor = 0;
	background(backgroundColor);
	setDisplayCharacters();

	textSize(symbolSize);

}

function setDisplayCharacters(){
	console.log(charactersToUse.value())
	var displayCharacters = charactersToUse.value();

	switch(displayCharacters) {
	    case "Kata":
	        charCodeStart = 0x30A0;
	        charCodeEnd = 0x30FF;
	        break;
	    case "English":
	    	charCodeStart = 0x0021;
	        charCodeEnd = 0x007E;
	        break;
	    case "IPA":
	    	charCodeStart = 0x0250;
	        charCodeEnd = 0x02AF;
	        break;
	    case "Devanagari":
	    	charCodeStart = 0x0900;
	        charCodeEnd = 0x097F;
	        break;
	    case "Cyrillic":
	    	charCodeStart = 0x0400;
	        charCodeEnd = 0x04F9;
	        break;
	    case "Hebrew":
	    	charCodeStart = 0x05D0;
	        charCodeEnd = 0x05F2;
	        break;
	    case "Arabic":
	        charCodeStart = 0x061F;
	        charCodeEnd = 0x06FE;
	        break;
	    case "Bengali":
	    	charCodeStart = 0x0981;
	        charCodeEnd = 0x09FA;
	        break;
	    case "Tibetan":
	    	charCodeStart = 0x0F00;
	        charCodeEnd = 0x0FCF;
	        break;
	    case "Hangul":
	    	charCodeStart = 0x1100;
	        charCodeEnd = 0x11F9;
	        break;
	    case "Chinese":
	    	charCodeStart = 0xF900;
	        charCodeEnd = 0xFA2D;
	        break;
	    case "Ethiopic":
	    	charCodeStart = 0x1200;
	        charCodeEnd = 0x137C;
	        break;
	    case "Ben":
	    	charCodeStart = 0x05D0;
	        charCodeEnd = 0x02AF;
	        break;     
	    default:
	        charCodeStart = 0x30A0;
	        charCodeEnd = 0x30FF;
	}

	//This check is necessary beceause a framecount check is done at 0 Frames
	if (frameCount>0){
		reset = true;
	}

	setStreamWithDisplayCharacters();
	reset = false;
}

function setCharactersColor(){
	console.log(charactersColor.value())
	ColorSelect = charactersColor.value();
	console.log(ColorSelect);
	var rando = round(random(184,255));

	switch(ColorSelect) {
	    case "Matrix":
	        RRC = 0;
			GRC = 255;
			BRC = round(random(0,255));
			differentColor = color(255,255,255);
	        break;
	    case "Hong Kong Neon":
	    	RRC = 255;
			GRC = 66;
			BRC = round(random(0,255));
			differentColor = color(0,250,255);
	        break;
	    case "Warriors":
	    	specialBackgroundColor = color(130, 82, 1);
	    	RRC = 0;
			GRC = 61;
			BRC = 200;
			differentColor = color(255,215,0);
	        break;
	    case "USA":
	    	specialBackgroundColor = color(242, 244, 249);
	    	RRC = 255;
			GRC = 15;
			BRC = 15;
			differentColor = color(20, 52, 135);
	        break;
	    case "Noir":
	    	specialBackgroundColor = color(126, 126, 126);
	    	RRC = GRC = BRC = 206;
			differentColor = color(56,56,56);
	        console.log(RRC,GRC,BRC);
	        break;

	    case "Rainbow":
	    	specialBackgroundColor = color(round(random(0,255)), round(random(0,255)), round(random(0,255)));
	    	RRC = 51;
			GRC = 179;
			BRC = round(random(0,255));
			differentColor = color(240,255,225);
	        break;    
	    default:
	        RRC = 51;
			GRC = 179;
			BRC = round(random(0,255));
			differentColor = color(240,255,225);
	}

}

function setStreamWithDisplayCharacters(){
	streams = [];
	var x = 0;
	for (var i = 0; i <= width/symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(x,random(-1001,height/2));
		streams.push(stream);
		x += symbolSize;
	}
	console.log(streams);
}

function draw(){
	
	if (ColorSelect == "Warriors" || ColorSelect == "Noir" || ColorSelect == "USA" || ColorSelect == "Rainbow"){
		background(specialBackgroundColor, 200);
	}else{
		background(0, 200);
	}


	streams.forEach(function(stream){
		stream.render();
	}); 
}

function Symbol(x,y,speed,different){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.value;
	this.switchInterval = round(random(2,20))
	this.different = different;

	this.setToRandomSymbol = function() {
		if (frameCount % this.switchInterval == 0 || reset == true){
			this.value = String.fromCharCode(round(random(charCodeStart,charCodeEnd)));
		}
	}

	this.rain = function(){
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}
}


function Stream(){
	this.symbols = [];
	this.totalSymbols = round(random(5,30));
	this.speed = random(1, 4);

	this.generateSymbols = function(x,y){
		for (var i =0; i <= this.totalSymbols; i++){
			var different = round(random(0,15)) == 1;
			symbol = new Symbol(x,y,this.speed,different);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			y -= symbolSize;
			different = false;
		}
	}

	this.render = function(){
		//console.log(ColorSelect);
		this.symbols.forEach(function(symbol){
			//console.log(ColorSelect);
			//console.log(ColorSelect);
			if (symbol.different){
				fill(differentColor);
				//fill(0, 250, 255);
			}else{
				//fill(244, 66, 86);
				
				if (ColorSelect == "Noir"){
					fill(round(random(181,255)));
					//fill(RRC, GRC, BRC);
					//console.log("Got Here");
				} else if (ColorSelect == "Warriors"){
					fill(RRC, GRC, round(random(BRC-10, BRC)));
				}else if (ColorSelect == "USA"){
					fill(RRC, GRC, BRC);
				}else if (ColorSelect == "Rainbow"){
					fill(round(random(0,255)), round(random(0,255)), round(random(0,255)));
				}else{
					fill(RRC, GRC, round(random(0,255)));
				}
				
			}			
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		});
	}
}





