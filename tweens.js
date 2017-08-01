var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('CB', 'assets/CB.png');
}
var card = [];
var parallelTweens = [];
var parallelTweensY = [];
var parallelTweensX = [];
var sequenceTweens = [];
var sequenceTweensY = [];
var sequenceTweensX = [];
var tweenS = [];
var tweenP = [];
function create() {
	for(var i=51;i>=0;i--){
		numberP = 0;
		numberS = 0;
        card[i] = game.add.sprite(400+i*0.3, 300, 'CB');
        card[i].anchor.setTo(0.5,0.5);
    }



    ParallelTween = function(){}
   	ParallelTween.prototype.add = function(target,x,y){
    	parallelTweens[numberP]=target;
    	parallelTweensX[numberP]=x;
    	parallelTweensY[numberP]=y;
    	tweenP[numberP] = game.add.tween(parallelTweens[numberP]);
    	numberP++;
    }
   	ParallelTween.prototype.play = function(){
    	for(var i=0;i<numberP;i++){   	
    		tweenP[i].to({ x: parallelTweensX[i], y: parallelTweensY[i]}, 800, Phaser.Easing.Linear.None, true, 0);
    	}
    }



    SequenceTween = function(){}
   	SequenceTween.prototype.add = function(target,x,y){
    	sequenceTweens[numberS]=target;
    	sequenceTweensX[numberS]=x;
    	sequenceTweensY[numberS]=y;
    	tweenS[numberS] = game.add.tween(sequenceTweens[numberS]);
    	numberS++;
    }
   	SequenceTween.prototype.play = function(){
    i=0;
    start = function(){
    	tweenS[i].to({ x: sequenceTweensX[i], y: sequenceTweensY[i]}, 400, Phaser.Easing.Linear.None, true, 0);
    	setTimeout(function(){if(i!=numberS-1){i++;;start();}},tweenS[i].totalDuration);
    }
    start();
    }



    DelayTween = function(){}
    DelayTween.prototype.add =function(target,x,y,delay)
    {
    	var DelayTweens = target;
    	var DelayTweensX = x;
    	var DelayTweensY = y;
    	tweenD = game.add.tween(DelayTweens);
    	tweenD.to({ x: DelayTweensX, y: DelayTweensY}, 400, Phaser.Easing.Linear.None, true, delay); 
    }

    pT = new ParallelTween;
    pT.add(card[0],700,150);
    pT.add(card[1],700,250);
    pT.add(card[2],700,350);
    pT.add(card[3],700,450);
    pT.play();


    sT = new SequenceTween;
    sT.add(card[5],100,450);
    sT.add(card[6],200,450);
    sT.add(card[7],300,450);
    sT.add(card[8],400,450);
    sT.play();


    dT = new DelayTween;
    dT.add(card[10],150,150,1000);
    dT.add(card[11],250,150,2000);
    dT.add(card[12],350,150,3000);
    dT.add(card[13],450,150,4000);
    
}