var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('CB', 'assets/CB.png');
}
var card = [];
var xx = [];
var yy = [];
var tween = [];
var tween2 = [];
var playersCount = 0; 
function create() {
    var c = +prompt('How many cards?',24);
    var x1 = +prompt('render x',0);
    var y1 = +prompt('render y',0);
    var alpha = +prompt('alpha',0);
    var step = +prompt('step',1);
    var cards = +prompt('How many cards to one player?',8);
    Deck = function(cardsCount){
      this.render = function(x1,y1){
        for(var i=c-1;i>=0;i--){
        card[i] = game.add.sprite(x1+i*2, y1, 'CB');
        card[i].rotation = alpha;
        tween[i] = game.add.tween(card[i]);
        tween2[i] = game.add.tween(card[i]);
        }
    }
    this.addSeats = function (){
        var add = confirm("Add player?");
        if(add==true){
            var x1 = +prompt("Players "+ +(playersCount+1) +" x",0);
            var y1 = +prompt("Players "+ +(playersCount+1) +" y",0);
            xx[playersCount] = x1;
            yy[playersCount] = y1;

            playersCount++;
            this.addSeats();
        }

    }
    this.disribute = function (step,cards){
            playerNumber=0;
            end = 0;
            var kk = cards;
            var enable=true;
            alert("There are "+playersCount+" players!\n Each one must have "+cards+" cards!\n There are "+c+" cards in deck!");
            if(cards*playersCount>c){
                alert(cards+"*"+playersCount+"="+cards*playersCount+">"+c+"\nTry again!")
                enable=false;
            };
            if(enable){
                var timer = setInterval(function(){
                    if(end<playersCount*cards){
                
                for(var i=end;i<end+step;i++){
                tween[i].to({ x: xx[playerNumber] }, 1000, 'Linear', true, 0);
                tween2[i].to({ y: yy[playerNumber] }, 1000, 'Linear', true, 0);
                xx[playerNumber]+=8;
                setTimeout(function(){for(k=0;k<i;k++){card[k].rotation = 0;}},1000); 
                
                }
                end+=step;
                if(playerNumber<playersCount-1)
                {playerNumber++;}
                else
                {playerNumber=0;kk-=step;}
            if(step>kk)
            {
                step=kk;
            }
        }
        
            else
            {
                clearInterval(timer);
            }
        },700) }
    } 
    }
        var d = new Deck(c);
        d.render(x1,y1);
        d.addSeats();
        d.disribute(step,cards);
}