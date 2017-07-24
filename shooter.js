var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
	game.load.image('myplane', 'assets/myplane.jpg');
    game.load.image('enemyplane', 'assets/enemyplane.jpg');
    game.load.image('fire', 'assets/bullet.jpg');
    game.load.image('bullet', 'assets/fire.jpg');
}
	var bulletx;
	var bullety; 
	var i; 
	var wave;
	var side = [];
	var position = [];
	var enemy = [];
	var tween =[];
	var tween2 =[];
	var angle = [];
	var score=0;
function create() {
	var me = game.add.sprite(400, 300, 'myplane');
	me.scale.setTo(0.5,0.5);
	me.anchor.set(0.5,0.5);
	//for(wave=1;wave<=10;wave++)
	//{
		wave=1
		for(i=1;i<=10*wave;i++)
		{
			side[i] = Math.floor(Math.random()*4)
			if(side[i]%2 == 0)
			{
				position[i] = Math.floor(Math.random()*800)
			} 
			if(side[i]%2 == 1)
			{
				position[i] = Math.floor(Math.random()*600)
			} 
			if(side[i]==0)
				enemy[i] = game.add.sprite(0,position[i],'enemyplane');
			if(side[i]==2)
				enemy[i] = game.add.sprite(800,position[i],'enemyplane');
			if(side[i]==1)
				enemy[i] = game.add.sprite(position[i],0,'enemyplane');
			if(side[i]==3)
				enemy[i] = game.add.sprite(position[i],600,'enemyplane');
			enemy[i].scale.setTo(0.3,0.3);
			enemy[i].anchor.set(0.5,0.5);
			tween[i] = game.add.tween(enemy[i]);
			tween2[i] = game.add.tween(enemy[i]);
			tween[i].to({ x: 400 }, 8000, 'Linear', true, 0);
			tween2[i].to({ y: 300 }, 8000, 'Linear', true, 0);
			enemy[i].inputEnabled = true;
			if(enemy[i].x-400>=0 && enemy[i].y-300>=0)
				angle[i] = -1*Math.atan((enemy[i].x-400)/(enemy[i].y-300));			
			if(enemy[i].x-400<=0 && enemy[i].y-300<=0)
				angle[i] = -1*Math.atan((enemy[i].x-400)/(enemy[i].y-300))+Math.PI;
			if(enemy[i].x-400>=0 && enemy[i].y-300<=0)
				angle[i] = -1*Math.atan((enemy[i].x-400)/(enemy[i].y-300))+Math.PI;
			if(enemy[i].x-400<=0 && enemy[i].y-300>=0)
				angle[i] = -1*Math.atan((enemy[i].x-400)/(enemy[i].y-300));
			enemy[i].rotation = angle[i];			
		}
		for(let i=1;i<=10;i++){
            enemy[i].events.onInputUp.add(function(){
            	me.rotation = angle[i]+Math.PI;
            	bullet = game.add.sprite(400, 300, 'bullet');
            	bullet.anchor.set(0.5,0.5);
            	shootx = game.add.tween(bullet);
            	shooty = game.add.tween(bullet);
            	if(enemy[i].x-400>=0 && enemy[i].y-300>=0){
            		bulletx=enemy[i].x-30;
            		bullety=enemy[i].y-30;
            	}
            	if(enemy[i].x-400<=0 && enemy[i].y-300<=0){
            		bulletx=enemy[i].x+30;
            		bullety=enemy[i].y+30;
            	}
            	if(enemy[i].x-400<=0 && enemy[i].y-300>=0){
            		bulletx=enemy[i].x+30;
            		bullety=enemy[i].y-30;
            	}
            	if(enemy[i].x-400>=0 && enemy[i].y-300<=0){
            		bulletx=enemy[i].x-30;
            		bullety=enemy[i].y+30;
            	}
            	console.log(bulletx,bullety);
            	shootx.to({ x: bulletx }, 50, 'Linear', true, 0);
            	shooty.to({ y: bullety }, 50, 'Linear', true, 0);
            	enemy[i].loadTexture('fire');
            	bullet.rotation = angle[i]+Math.PI;
            	bullet.scale.setTo(0.3,0.3);
            	setTimeout(function(){
                bullet.destroy();              
            },50);
            	setTimeout(function(){
                enemy[i].destroy(); 
                score++;            
            },100);
        });	
		var timer = setInterval(function(){
			for(var k=1;k<=10;k++)
			{
				if(Math.abs(enemy[k].x-400)<=50 && Math.abs(enemy[k].y-300)<=50)
				{
					me.destroy();
					for(var j=1;j<=10;j++)
					{
						enemy[j].destroy();
					}
					text = game.add.text(335, 290, '', { fill: '#cc0000' });
					text.text = 'Game Over';
					text1 = game.add.text(312, 330, '', { fill: '#00ff00' });
					text1.text = 'Your score is ' + score + '!';
					clearInterval(timer);
				}
			}
			if(score>10){
				score=10;
				}
				if(score==10)
				{
					me.destroy();
					text2 = game.add.text(335, 290, '', { fill: '#ffff00' });
					text2.text = 'You win!';
					text1 = game.add.text(295, 330, '', { fill: '#00ff00' });
					text1.text = 'Your score is ' + score + '!';
				}
		},10)
	}
//}
}