var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
var card = [];
function preload() {
    game.load.image('CB', 'assets/CB.png');
    game.load.image('C00', 'assets/C00.png');
    game.load.image('C01', 'assets/C01.png');
    game.load.image('C02', 'assets/C02.png');
    game.load.image('C03', 'assets/C03.png');
    game.load.image('C04', 'assets/C04.png');
    game.load.image('C05', 'assets/C05.png');
    game.load.image('C06', 'assets/C06.png');
    game.load.image('C07', 'assets/C07.png');
}
function create() {
	for(i=0;i<=7;i++)
	{
		if(i<4)
		{card[i] = game.add.sprite(180*i, 100, 'CB');}
	else
		{card[i] = game.add.sprite(180*(i-4), 300, 'CB');}
	card[i].inputEnabled = true;
		card[i].events.onInputDown.add(listener.bind(card[i], i), this);
	}

}
function listener (i)
{
		if(i<4)
		card[i] = game.add.sprite(180*i, 100, 'C0'+(7-i));
	else
		card[i] = game.add.sprite(180*(i-4), 300, 'C0'+(7-i));
}