var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
	game.load.image('wheel', 'assets/wheel.png');
	game.load.image('arrow', 'assets/little-yellow-down-arrow.png');
	game.load.image('spinner', 'assets/spin-now-button.png');
}
function create() {
	var color;
	var time = new Date();
	var wheel = game.add.sprite(400, 300, 'wheel');
	var arrow = game.add.sprite(399, 30, 'arrow');
	var spinner = game.add.sprite(700, 100, 'spinner');
	wheel.angle = 17;
	spinner.anchor.setTo(0.5,0.5);
	wheel.anchor.setTo(0.5,0.5);
	wheel.scale.setTo(0.5,0.5);
	arrow.anchor.setTo(0.5,0.5);
	arrow.scale.setTo(0.2,0.2);
	spinner.inputEnabled = true;
	spinner.events.onInputDown.add(function(){
	spinner.destroy();
	var tween = game.add.tween(wheel);
	var a = 3617 + 360 * Math.random();
	var slot = Math.floor(((a-17)%360)/30);
	tween.to({angle: a}, 7000, Phaser.Easing.Circular.InOut, true, 0);
	switch(slot){
		case 0:
		color = "pink";break;
		case 1:
		color = "blue1";break;
		case 2:
		color = "blue2";break;
		case 3:
		color = "blue3";break;
		case 4:
		color = "blue4";break;
		case 5:
		color = "green1";break;
		case 6:
		color = "green2";break;
		case 7:
		color = "yellow1";break;
		case 8:
		color = "orange1";break;
		case 9:
		color = "orange2";break
		case 10:
		color = "orange3";break;
		case 11:
		color = "red";break;
	}
	setTimeout(function(){alert( color + " wins")},7010);
});
}