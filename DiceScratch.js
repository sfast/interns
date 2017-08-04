var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('Dice1', 'assets/Dice1.png');
    game.load.image('Dice2', 'assets/Dice2.png');
    game.load.image('Dice3', 'assets/Dice3.png');
    game.load.image('Dice4', 'assets/Dice4.png');
    game.load.image('Dice5', 'assets/Dice5.png');
    game.load.image('Dice6', 'assets/Dice6.png');
    game.load.image('rr', 'assets/red-rectangle.png');
    game.load.image('lbr', 'assets/little-black-rectangle.png');
}
var mask;
function create() {
	time = new Date();
	bounds = new Phaser.Rectangle(10, 10, 645, 330);
	var graphics = game.add.graphics(bounds.x, bounds.y);
	var d1 = Math.floor(Math.random()*6+1);
	var d2 = Math.floor(Math.random()*6+1);
	var d3 = Math.floor(Math.random()*6+1);
	firstDice = game.add.sprite(11,50,'Dice'+d1);
	secondDice = game.add.sprite(211,50,'Dice'+d2);
	thirdDice = game.add.sprite(410,50,'Dice'+d3);
	mask = game.add.graphics(0, 0);
    mask.beginFill(0xffffff);
    mask.anchor.setTo(0.5,0.5);
    firstDice.mask = mask;
    secondDice.mask = mask;
    thirdDice.mask = mask;
    console.log(d1,d2,d3,new Date()-time);
    game.input.addMoveCallback(move, this);
}
function move(pointer,x,y) {	
	mask.drawRect(x-15, y-15, 30,30);
}