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
var players; 
function create() {
    var c = +prompt('How many cards in deck?',52);
    players = +prompt("How many players? (from 2 to 8)",8);
    var x1 = 80;
    var y1 = 80;
    var alpha = 60;
    var cards = +prompt('How many cards to each player?',2);
    var step = +prompt('step',1);   
    Deck = function(cardsCount){};

    Deck.prototype.render = function(x1,y1){
        for(var i=c-1;i>=0;i--){
        card[i] = game.add.sprite(x1+i*0.3, y1, 'CB');
        card[i].angle = alpha;
        tween[i] = game.add.tween(card[i]);
        tween2[i] = game.add.tween(card[i]);
        card[i].anchor.setTo(0.5,0.5);
        }
    }

    Deck.prototype.addSeats = function (){       
        switch(players)
        {
            case 2:
            this.addSeat(400,100);
            this.addSeat(400,500);
            break;
            case 3:
            this.addSeat(250,100);
            this.addSeat(400,500);
            this.addSeat(550,100);
            break;
            case 4:
            this.addSeat(400,100);
            this.addSeat(700,300);
            this.addSeat(400,500);
            this.addSeat(100,300);
            break;
            case 5:
            this.addSeat(550,100);
            this.addSeat(700,300);
            this.addSeat(400,500);
            this.addSeat(100,300);
            this.addSeat(250,100);
            break;
            case 6:
            this.addSeat(550,100);
            this.addSeat(700,300);
            this.addSeat(550,500);
            this.addSeat(250,500);
            this.addSeat(100,300);
            this.addSeat(250,100);
            break;
            case 7:
            this.addSeat(400,500);
            this.addSeat(250,400);
            this.addSeat(120,260);
            this.addSeat(290,110);
            this.addSeat(510,110);
            this.addSeat(680,260);
            this.addSeat(550,400);
            break;
            case 8:
            this.addSeat(400,100);
            this.addSeat(550,150);
            this.addSeat(700,300);
            this.addSeat(550,450);
            this.addSeat(400,500);
            this.addSeat(250,450);
            this.addSeat(100,300);
            this.addSeat(250,150);
            break;
        }
    }

    Deck.prototype.addSeat = function(x1,y1){
        xx[playersCount] = x1-10;
        yy[playersCount] = y1;
        playersCount++;
    }

    Deck.prototype.disribute = function (step,cards){
        playerNumber=0;
        end = 0;
        var kk = cards;
        var enable=true;
        alert("There are "+playersCount+" players!\n Each one must have "+cards+" cards!\n There are "+c+" cards in deck!");
        if(cards*playersCount>c){
            alert(cards+"*"+playersCount+" = "+cards*playersCount+" > "+c+"\nTry again!")
            enable=false;
        };
        if(enable){
            var timer = setInterval(function(){
                if(end<playersCount*cards){
                    if(step>kk){
                       step=kk;}            
                    for(var i=end;i<end+step;i++){
                        tween[i].to({ x: xx[playerNumber], angle: 0 ,y: yy[playerNumber]}, 800, Phaser.Easing.Back.InOut, true, 0);
                        xx[playerNumber]+=7;}                                     
                    end+=step;
                    if(playerNumber<playersCount-1)
                    {playerNumber++;}
                    else{
                       playerNumber=0;kk-=step;}            
                }        
                else{           
                    clearInterval(timer);}            
            },300);
        }
    } 


    var d = new Deck(c);
    d.render(x1,y1);
    d.addSeats();
    d.disribute(step,cards);
}