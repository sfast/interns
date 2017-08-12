var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
	game.load.image('wheel', 'assets/center_circle_360.png');
	game.load.image('arrow', 'assets/little-yellow-down-arrow.png');
	game.load.image('spinner', 'assets/spin-now-button.png');
	game.load.image('wedge_red', 'assets/wedge_red_360.png');
	game.load.image('circle', 'assets/circle-spin.png');
	game.load.image('wedge_yellow', 'assets/wedge_yellow_360.png');
}
var prize;
var imageId = [];
var wedgeSprite = [];
var firstNumber = [];
var secondNumber = [];
var time = new Date();
var wedgeGroup;
var startAngle = 0;
var i,c=-1;
var text =[];
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
		addSegment();   	
	}
	startAngle =0;
	for(i = 0;i < 12;i++){
		addText();   	
	}
	var wheel1 = game.add.sprite(0, 0, 'circle');
	wedgeGroup.add(wheel1);
	wheel1.anchor.setTo(0.5,0.5);
	wheel1.scale.setTo(0.09,0.09);
	wedgeGroup.angle = 16.5-90;
	spinner.inputEnabled = true;
	spinner.events.onInputDown.add(function(){
	spinner.destroy();
	var tween = game.add.tween(wedgeGroup);
	var random = 360 * Math.random();
	var a = -3616.5-90 + random;
	var slot = Math.floor(((-a+16.5-90)%360)/30);
	tween.to({angle: a}, 7000, Phaser.Easing.Circular.InOut, true, 0);
	setTimeout(function(){alert( "You win " + (firstNumber[slot]*100+secondNumber[slot]*10)+" chips!")},7010);
});
}
function addSegment(){
	wedgeGroup.angle = Math.round(startAngle);

		if(Math.random()>0.5){
        	imageId[i] = "wedge_red";
   		}
    	else{
       		imageId[i] = "wedge_yellow";
    	}
    	wedgeSprite[i] = game.make.sprite(0, 0, imageId[i]);
    	wedgeSprite[i].angle = c-1; 
    	wedgeSprite[i].anchor.setTo(-0.1, 0.5);
    	wedgeSprite[i].scale.setTo(1, 1);
    	wedgeGroup.add(wedgeSprite[i]);
    	c-=30;
}

function addText(){
	var style = { font: "32px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: 10000};
	firstNumber[i]=Math.floor(Math.random()*9+1);
	secondNumber[i]=Math.floor(Math.random()*10);
    	text[i] = game.add.text(0, 0, "													"+firstNumber[i]+secondNumber[i]+0, style);
   		text[i].anchor.set(0, 0.5);
   		wedgeGroup.add(text[i]);
   		text[i].angle = Math.round(startAngle);
    	startAngle = Math.round(startAngle+30);
    	c-=30;
}