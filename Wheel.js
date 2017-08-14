var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
var imageId = [];
var prize = [];
var wedgeSprite = [];;
var wedgeGroup;
var startAngle = 0;
var i,c=-1;
var text =[];
var example = 	[{amount:3, type:"yellow"},
				{amount:200, type:"red"},
				{amount:300, type:"red"},
				{amount:5, type:"yellow"},
				{amount:500, type:"red"},
				{amount:600, type:"red"},
				{amount:10, type:"yellow"},
				{amount:800, type:"red"},
				{amount:100, type:"red"},
				{amount:25, type:"yellow"},
				{amount:400, type:"red"},
				{amount:700, type:"red"}];
				
class Wheel{
	constructor(arg){
		imageId[0]="wedge_"+arg[0].type;
		for(var j = 11; j >= 0; j--){
			imageId[12-j]="wedge_"+arg[j].type;
			prize[j]=arg[j].amount;
		}
	}
}

Wheel.prototype.addSegment = function(){
	wedgeGroup.angle = Math.round(startAngle);
    wedgeSprite[i] = game.make.sprite(0, 0, imageId[i]);
    wedgeSprite[i].angle = c-1; 
    wedgeSprite[i].anchor.setTo(-0.1, 0.5);
    wedgeSprite[i].scale.setTo(1, 1);
    wedgeGroup.add(wedgeSprite[i]);
    c+=30;
}

Wheel.prototype.addText = function(){
		var style = { font: "32px Arial", fill: "#ffffff"};
    	text[i] = game.add.text(0, 0, "													"+prize[i], style);
   		text[i].anchor.set(0, 0.5);
   		wedgeGroup.add(text[i]);
   		text[i].angle = Math.round(startAngle);
    	startAngle = Math.round(startAngle+30);
    	c+=30;
	}

function preload() {
	game.load.image('wheel', 'assets/center_circle_360.png');
	game.load.image('arrow', 'assets/little-yellow-down-arrow.png');
	game.load.image('spinner', 'assets/spin-now-button.png');
	game.load.image('wedge_red', 'assets/wedge_red_360.png');
	game.load.image('circle', 'assets/circle-spin.png');
	game.load.image('wedge_yellow', 'assets/wedge_yellow_360.png');
}

var w = new Wheel(example);


function create() {
	
	wedgeGroup = game.make.group();
	var wheel = game.add.sprite(0, 0, 'wheel');	
	var spinner = game.add.sprite(700, 100, 'spinner');
	wedgeGroup.x = 400;
	wedgeGroup.y = 300;
	wedgeGroup.add(wheel);		
	var arrow = game.add.sprite(400, 100, 'arrow');
	spinner.anchor.setTo(0.5,0.5);
	wheel.anchor.setTo(0.5,0.5);
	arrow.anchor.setTo(0.5,0.5);
	arrow.scale.setTo(0.2,0.2);
	for(i = 0;i < 12;i++){
		Wheel.prototype.addSegment(); 	
	}
	startAngle =0;
	for(i = 0;i < 12;i++){
		Wheel.prototype.addText();   	
	}
	var wheel1 = game.add.sprite(0, 0, 'circle');
	wedgeGroup.add(wheel1);
	wheel1.anchor.setTo(0.5,0.5);
	wheel1.scale.setTo(0.09,0.09);
	wedgeGroup.angle = 16.5-90;
	spinner.inputEnabled = true;
	spinner.events.onInputDown.add(function(){
		spinner.inputEnabled = false;
		var tween = game.add.tween(wedgeGroup);
		var random = 360 * Math.random();
		var a = -3616.5-90 + random;
		var slot = Math.floor(((-a+16.5-90)%360)/30);
		tween.to({angle: a}, 5000, Phaser.Easing.Circular.InOut, true, 0);
		setTimeout(function(){
			if(imageId[slot]==="wedge_red"){
			alert( "You win " + prize[slot]+" chips!");
			}
			else{
				alert( "You win " + prize[slot]+" gold chips!");
			}
		},5010);
	});
}