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

function create() {
    time =new Date();
    phaser = game.make.sprite(0, 0, 'phaser');
    phaser.anchor.set(0.5,0.5)
    var d1 = Math.floor(Math.random()*6+1);
    var d2 = Math.floor(Math.random()*6+1);
    var d3 = Math.floor(Math.random()*6+1);
    chaos1 = game.make.sprite(11, 50, 'Dice'+d1);
    chaos2 = game.make.sprite(211, 50, 'Dice'+d2);
    chaos3 = game.make.sprite(410, 50, 'Dice'+d3);
    
    bmd1 = game.make.bitmapData(chaos1.width+chaos2.width+chaos3.width, chaos1.height+chaos2.height+chaos3.height);
    bmd2 = game.make.bitmapData(chaos1.width+chaos2.width+chaos3.width, chaos1.height+chaos2.height+chaos3.height);
    bmd3 = game.make.bitmapData(chaos1.width+chaos2.width+chaos3.width, chaos1.height+chaos2.height+chaos3.height);
    
    game.add.sprite(0,0,bmd1);
    game.add.sprite(0,0,bmd2);
    game.add.sprite(0,0,bmd3);
    console.log(d1,d2,d3,new Date()-time);
    game.input.addMoveCallback(move, this);
}

function move(pointer, x, y) {
    phaser.x=x;
    phaser.y=y;
    if(x<400 && x>40){
    bmd1.alphaMask(chaos1, phaser);}
    if(x<600 && x>245){
    bmd2.alphaMask(chaos2, phaser);}
    if(x>442){
    bmd3.alphaMask(chaos3, phaser);}
}