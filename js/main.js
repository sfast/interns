window.onload = function () {
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

	function preload() {
		game.load.image('background', './assets/images/background.jpg');
		game.load.image('scratch', './assets/images/scratch.jpg');
		game.load.spritesheet('dice', './assets/images/dice.png', 258, 258, 6);
		game.load.image('yellow', './assets/images/yellow.png');
		game.load.image('clear', './assets/images/clear.png');
	};

	var background, scratch, dice1, dice2, dice3, clear;

	function create() {
		background = game.add.tileSprite(0, 0, 2500, 1920, 'background');
		background.scale.x = 800/2500;
		background.scale.y = 600/1920;
		scratch = game.add.sprite(100, 300, 'scratch');
		scratch.height = 600/scratch.width*scratch.height;
		scratch.width = 600;
		var graphics = game.add.graphics(100, 100);
		graphics.beginFill(0x238991);
		graphics.lineStyle(2, 0x238991, 1);
		graphics.drawRoundedRect(217, 291, 365, 128, 9);
		dice1 = game.add.sprite(335, 405, 'dice', Math.floor(Math.random() * 6) + 1);
		dice2 = game.add.sprite(450, 405, 'dice', Math.floor(Math.random() * 6) + 1);
		dice3 = game.add.sprite(565, 405, 'dice', Math.floor(Math.random() * 6) + 1);
		dice1.width = 100;
		dice1.height = 100;
		dice2.width = 100;
		dice2.height = 100;
		dice3.width = 100;
		dice3.height = 100;
		game.land = game.add.bitmapData(367, 130);
		image = new Image();
		image.src = './assets/images/yellow.png';
		clear = new Image();
		clear.src = './assets/images/clear.png';
		game.land.context.drawImage(image, 0, 0, 367, 130);
		game.land.addToWorld(316, 390);
	};

	function update() {
		if (game.input.activePointer.isDown) {
			game.land.blendDestinationOut();
			game.land.context.drawImage(clear, game.input.x-316-40, game.input.y-390-25);
			game.land.blendReset();
			game.land.dirty = true;
		}
	};
}