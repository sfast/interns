var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('CB', 'assets/CB.png');

}
    var card = [];
    var tween = [];
function create() {
    for(i=1;i<=36;i++)
    {
        if(i%2==1)
        card[i] = game.add.sprite(150+(i-1)*2, 200, 'CB');
        if(i%2==0)
        card[i] = game.add.sprite(530+(i-1)*2, 200, 'CB');
        tween[i] = game.add.tween(card[i]);
    }
    for(i=1;i<=36;i++)
    {
        tween[i].to({ x: 340+(i-1)*2 }, 500, 'Linear', true, 10+20*(i-1));
    }
}