/*
This is a simple matrix lettering program written in P5 Javascript
Started On: 4/4/18
Finished On: Pending
*/
var streams = [];
var symbolSize = 20;

function setup(){
	createCanvas(
		window.innerWidth,
		window.innerHeight	
	);
	background(0);
	var x = 0;
	for (var i = 0; i <= width/symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(x,random(-1001,height/2));
		streams.push(stream);
		x += symbolSize;
	}

	textSize(symbolSize);

}

function draw(){
	background(0, 200);
	streams.forEach(function(stream){
		stream.render();
	}); 
}

function Symbol(x,y,speed,first){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.value;
	this.switchInterval = round(random(2,20))
	this.first = first;

	this.setToRandomSymbol = function() {
		if (frameCount % this.switchInterval == 0 ){
			this.value = String.fromCharCode(
			0x30A0 + round(random(0,96))
			);
		}
	}

	this.rain = function(){
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}
}


function Stream(){
	this.symbols = [];
	this.totalSymbols = round(random(5,30));
	this.speed = random(5, 10);

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
		this.symbols.forEach(function(symbol){
			if (symbol.first){
				fill(0, 250, 255);
			}else{
				//fill(244, 66, 86);
				fill(255, 66, round(random(0,255)));
			}			
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		});
	}
}





