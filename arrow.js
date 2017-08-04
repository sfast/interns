var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create});

function preload() {
}

function create() {
	var g3 = 0;
	var g1 = 0;
	var g2 = 0;
	var g = 0;
	var graphics = game.add.graphics(0,0);
	var graphics1 = game.add.graphics(0,0);
	var graphics2 = game.add.graphics(0,0);
	var graphics3 = game.add.graphics(0,0);
function start(){
	g = 0xffd000;
	graphics.lineStyle(4, g, 1);
	graphics.moveTo(150,200);
  	graphics.lineTo(150,300);
 	graphics.lineTo(300,300);
 	graphics.lineTo(300,350);
 	graphics.lineTo(400,250);
 	graphics.lineTo(300,150); 
 	graphics.lineTo(300,200);
 	graphics.lineTo(150,200);
	setTimeout(function(){
		g1=0x00ff00;
		graphics1.lineStyle(4, g1, 1);
		graphics1.moveTo(130,180);
  		graphics1.lineTo(130,320);
 		graphics1.lineTo(280,320);
 		graphics1.lineTo(280,390);
 		graphics1.lineTo(420,250);
 		graphics1.lineTo(280,110); 
 		graphics1.lineTo(280,180);
 		graphics1.lineTo(130,180);
	},200);
	setTimeout(function(){
		g2=0xff0000;
		graphics2.lineStyle(4, g2, 1);
		graphics2.moveTo(110,160);
  		graphics2.lineTo(110,340);
 		graphics2.lineTo(260,340);
 		graphics2.lineTo(260,430);
 		graphics2.lineTo(440,250);
 		graphics2.lineTo(260,70); 
 		graphics2.lineTo(260,160);
 		graphics2.lineTo(110,160);
	},400);
	setTimeout(function(){
		g3=0x0000ff;
		graphics3.lineStyle(4, g3, 1);
		graphics3.moveTo(90,140);
  		graphics3.lineTo(90,360);
 		graphics3.lineTo(240,360);
 		graphics3.lineTo(240,470);
 		graphics3.lineTo(460,250);
 		graphics3.lineTo(240,30); 
 		graphics3.lineTo(240,140);
 		graphics3.lineTo(90,140);
	},600);
	setTimeout(function(){console.log('=>');reverse();},1200);
}



function reverse(){
	g3=0;
	graphics3.lineStyle(6, g3, 1);
	graphics3.moveTo(90,140);
  	graphics3.lineTo(90,360);
 	graphics3.lineTo(240,360);
 	graphics3.lineTo(240,470);
 	graphics3.lineTo(460,250);
 	graphics3.lineTo(240,30); 
 	graphics3.lineTo(240,140);
 	graphics3.lineTo(90,140);
 	setTimeout(function(){
 		g2=0;
		graphics2.lineStyle(6, g2, 1);
		graphics2.moveTo(110,160);
  		graphics2.lineTo(110,340);
 		graphics2.lineTo(260,340);
 		graphics2.lineTo(260,430);
 		graphics2.lineTo(440,250);
 		graphics2.lineTo(260,70); 
 		graphics2.lineTo(260,160);
 		graphics2.lineTo(110,160);
 	},200);
 	setTimeout(function(){
		g1=0;
		graphics1.lineStyle(6, g1, 1);
		graphics1.moveTo(130,180);
  		graphics1.lineTo(130,320);
 		graphics1.lineTo(280,320);
 		graphics1.lineTo(280,390);
 		graphics1.lineTo(420,250);
 		graphics1.lineTo(280,110); 
 		graphics1.lineTo(280,180);
 		graphics1.lineTo(130,180);
	},400);
	setTimeout(function(){
		g = 0;
		graphics.lineStyle(6, g, 1);
		graphics.moveTo(150,200);
  		graphics.lineTo(150,300);
 		graphics.lineTo(300,300);
 		graphics.lineTo(300,350);
 		graphics.lineTo(400,250);
 		graphics.lineTo(300,150); 
 		graphics.lineTo(300,200);
 		graphics.lineTo(150,200);
	},600)
	setTimeout(function(){start();},800);
}

start();
}