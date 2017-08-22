var imageId = [];
var prize = [];
var wedgeSprite = [];
var wedgeGroup;
var startAngle = 0;
var i,c=-1;
var text =[];
var example = 	[{amount:3, type:"yellow"},
    {amount:200, type:"red"},
    {amount:300, type:"red"},
    {amount:5, type:"yellow"},
    {amount:500, type:"red"},
    {amount:600, type:"red"},
    {amount:10, type:"yellow"},
    {amount:800, type:"red"},
    {amount:100, type:"red"},
    {amount:25, type:"yellow"},
    {amount:400, type:"red"},
    {amount:700, type:"red"}];
var random = 360 * Math.random();
var a = -3616.5-90 + random;
var slot = Math.floor(((-a+16.5-90)%360)/30);

class Wheel {
		constructor(config,callback) {
			this.game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
				preload: this.preload,
				create: this.create.bind(this)
			});
			
			imageId[0] = "wedge_" + config[0].type;
			for (var j = 11; j >= 0; j--) {
				imageId[12 - j] = "wedge_" + config[j].type;
				prize[j] = config[j].amount;
			}
			callback(slot);
		}

        preload(){
            this.game.load.image('wheel', 'assets/center_circle_360.png');
            this.game.load.image('arrow', 'assets/little-yellow-down-arrow.png');
            this.game.load.image('spinner', 'assets/spin-now-button.png');
            this.game.load.image('wedge_red', 'assets/wedge_red_360.png');
            this.game.load.image('circle', 'assets/circle-spin.png');
            this.game.load.image('wedge_yellow', 'assets/wedge_yellow_360.png');
        }

        create(){
            wedgeGroup = this.game.make.group();
            var wheel = this.game.add.sprite(0, 0, 'wheel');
            var spinner = this.game.add.sprite(700, 100, 'spinner');
            wedgeGroup.x = 400;
            wedgeGroup.y = 300;
            wedgeGroup.add(wheel);
            var arrow = this.game.add.sprite(400, 100, 'arrow');
            spinner.anchor.setTo(0.5,0.5);
            wheel.anchor.setTo(0.5,0.5);
            arrow.anchor.setTo(0.5,0.5);
            arrow.scale.setTo(0.2,0.2);
            for(i = 0;i < 12;i++){
                this.addSegment();
            }
            startAngle =0;
            for(i = 0;i < 12;i++){
                this.addText();
            }
            var wheel1 = this.game.add.sprite(0, 0, 'circle');
            wedgeGroup.add(wheel1);
            wheel1.anchor.setTo(0.5,0.5);
            wheel1.scale.setTo(0.09,0.09);
            wedgeGroup.angle = 16.5-90;
            spinner.inputEnabled = true;
            spinner.events.onInputDown.add(() => {
                spinner.inputEnabled = false;
                var tween = this.game.add.tween(wedgeGroup);
                tween.to({angle: a}, 5000, Phaser.Easing.Circular.InOut, true, 0);
                setTimeout(function(){
                    if(imageId[slot]==="wedge_red"){
                        alert( "You win " + prize[slot]+" chips!");
                    }
                    else{
                        alert( "You win " + prize[slot]+" gold chips!");
                    }
                },5010);
            });
        }

        addSegment(){
            wedgeGroup.angle = Math.round(startAngle);
            wedgeSprite[i] = this.game.make.sprite(0, 0, imageId[i]);
            wedgeSprite[i].angle = c-1;
            wedgeSprite[i].anchor.setTo(-0.1, 0.5);
            wedgeSprite[i].scale.setTo(1, 1);
            wedgeGroup.add(wedgeSprite[i]);
            c+=30;
        }

        addText(){
            var style = { font: "32px Arial", fill: "#ffffff"};
            text[i] = this.game.add.text(0, 0, "													"+prize[i], style);
            text[i].anchor.set(0, 0.5);
            wedgeGroup.add(text[i]);
            text[i].angle = Math.round(startAngle);
            startAngle = Math.round(startAngle+30);
            c+=30;
        }
}

new Wheel(example,function(q){
	console.log(q+" slot!");
	if(imageId[q]==="wedge_red"){
		console.log(prize[q]+" chips!");
	}
	else{
		console.log(prize[q]+" gold chips!");
	}
});