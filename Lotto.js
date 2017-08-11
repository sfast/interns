var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('phaser', 'assets/qwerty.png');
    game.load.image('Dice1', 'assets/Dice1.png');
    game.load.image('Dice2', 'assets/Dice2.png');
    game.load.image('Dice3', 'assets/Dice3.png');
    game.load.image('Dice4', 'assets/Dice4.png');
    game.load.image('Dice5', 'assets/Dice5.png');
    game.load.image('Dice6', 'assets/Dice6.png');
}
var cleared = [];
function create() {
    
    phaser = game.make.sprite(0, 0, 'phaser');
    phaser.anchor.set(0.5,0.5)
    var d1 = Math.floor(Math.random()*6+1);
    var d2 = Math.floor(Math.random()*6+1);
    var d3 = Math.floor(Math.random()*6+1); 
    cleared[1]=false;
    cleared[2]=false;
    cleared[3]=false;
    dice1 = game.make.sprite(102, 150, 'Dice'+d1);
    dice2 = game.make.sprite(311, 150, 'Dice'+d2);
    dice3 = game.make.sprite(519, 150, 'Dice'+d3);   
    bmd1 = game.make.bitmapData(dice1.width+dice2.width+dice3.width+160, dice1.height+150);
    game.add.sprite(0,0,bmd1);    
    var graphics = game.add.graphics(0,0);
    graphics.lineStyle(4, 0xffd000, 1);
    graphics.moveTo(99,151);
    graphics.lineTo(99,353);
    graphics.lineTo(723,353);
    graphics.lineTo(723,151);
    graphics.lineTo(99,151);
    graphics.moveTo(308,151);
    graphics.lineTo(308,353);
    graphics.moveTo(516,151);
    graphics.lineTo(516,353);
    game.input.addMoveCallback(move, this);
    var timer = setInterval(function(){
    	if(cleared[1] && cleared[2] && cleared[3]){
    		setTimeout(function(){
    			confirm("Your dices are "+d1+", "+d2+", "+d3+".");
    			if(d1==d2 && d2==d3)
    			{
    				confirm("Congratulations, you have SUPERCOMBO!");
    			}
    			else{
    				if((d1==d2-1 && d1==d3-2) 
    					|| (d1==d3-1 && d1==d2-2) 
    					|| (d2==d1-1 && d2==d3-2) 
    					|| (d2==d3-1 && d2==d1-2) 
    					|| (d3==d2-1 && d3==d1-2) 
    					|| (d3==d1-1 && d3==d2-2)){ 
    					confirm("Congratulations, you have COMBO!");
    				}
    				else{
    					confirm("Don't give up.\nTry again!")
    				}
    			}
    		},2000);
    	clearInterval(timer);
   		}
	},2000)
}

function move(pointer, x, y) {
    phaser.x=x;
    phaser.y=y;
    if(x<300 && x>20 && y>150 && y<350){
    bmd1.alphaMask(dice1, phaser);
    cleared[1]=true;
	}
    if(x<510 && x>320 && y>150 && y<350){
    bmd1.alphaMask(dice2, phaser);
	cleared[2]=true;
	}
    if(x>530 && y>150 && y<350){
    bmd1.alphaMask(dice3, phaser);
	cleared[3]=true;
	}
}