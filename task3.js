var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

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
    game.load.image('C10', 'assets/C10.png');
    game.load.image('C11', 'assets/C11.png');
    game.load.image('C12', 'assets/C12.png');
    game.load.image('C13', 'assets/C13.png');
    game.load.image('C14', 'assets/C14.png');
    game.load.image('C15', 'assets/C15.png');
    game.load.image('C16', 'assets/C16.png');
    game.load.image('C17', 'assets/C17.png');
    game.load.image('C20', 'assets/C20.png');
    game.load.image('C21', 'assets/C21.png');
    game.load.image('C22', 'assets/C22.png');
    game.load.image('C23', 'assets/C23.png');
    game.load.image('C24', 'assets/C24.png');
    game.load.image('C25', 'assets/C25.png');
    game.load.image('C26', 'assets/C26.png');
    game.load.image('C27', 'assets/C27.png');
    game.load.image('C30', 'assets/C30.png');
    game.load.image('C31', 'assets/C31.png');
    game.load.image('C32', 'assets/C32.png');
    game.load.image('C33', 'assets/C33.png');
    game.load.image('C34', 'assets/C34.png');
    game.load.image('C35', 'assets/C35.png');
    game.load.image('C36', 'assets/C36.png');
    game.load.image('C37', 'assets/C37.png');
}
    var card = [];
    var tween = [];
    var tween2 = [];
    var a = [];
    var b = [];
function create() {
    for(i=1;i<=32;i++)
    {
        if(i%2==1)
        card[i] = game.add.sprite(150+(i-1)*2, 200, 'CB');
        if(i%2==0)
        card[i] = game.add.sprite(530+(i-1)*2, 200, 'CB');
        tween[i] = game.add.tween(card[i]);
        card[i].inputEnabled = true;
    }
    for(i=1;i<=32;i++)
    {
        tween[i].to({ x: 340+(i-1)*2 }, 500, 'Linear', true, 10+20*(i-1));
    }
    
    setTimeout(function(){
        for(i=1;i<=8;i++){
    a[i] = Math.round(Math.random()*3);
    b[i] = Math.round(Math.random()*7);
    card[i].loadTexture('C'+a[i]+b[i])
    tween[i] = game.add.tween(card[i]);
    tween[i].to({ y: 400 }, 500, 'Linear', true, 0);}},1100);
setTimeout(function(){
    for(i=1;i<=8;i++){
    tween[i] = game.add.tween(card[i]);
        tween[i].to({ x: 130+50*i }, 500, 'Linear', true, 0);       
    }
},1500);
setTimeout(function(){
for(i=9;i<=32;i++){
        card[i].destroy();
        }},1100);
    for(let i=1;i<=8;i++){
            card[i].events.onInputOver.add(function(){
                if(card[i].y == 400){
             tween2[i] = game.add.tween(card[i].position);
             tween2[i].to({ y: 350 }, 150, 'Linear', true, 0);}
        })
            card[i].events.onInputOut.add(function(){
                if(card[i].y == 350){
            tween2[i] = game.add.tween(card[i].position);
            tween2[i].to({ y: 400 }, 150, 'Linear', true, 0);}
        })
            card[i].events.onInputUp.add(function(){
            card[i].scale.setTo(1.2,1.2);
            tween2[i] = game.add.tween(card[i].position);
            setTimeout(function(){
            tween2[i].to({ y: 200 }, 300, 'Linear', true, 0);},100)
            setTimeout(function(){
            card[i].scale.setTo(0.8,0.8);},500)
        })
    }
}