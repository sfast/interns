import Phaser from 'phaser';

// configs
import { configs } from '../configs';
const balanceN = configs.balanceN;
const jackpotN = configs.jackpotN;
const text = configs.text;
const data = configs.data;

export default class extends Phaser.State {
    preload() {
        this.game.load.image('star1', 'assets/images/star1.png');
        this.game.load.image('star2', 'assets/images/star2.png');
        this.game.load.image('jackpot', 'assets/images/jackpot.png');
        this.game.load.spritesheet('symbol', 'assets/images/spritesheet.png', 100, 100, 6);
        this.game.load.image('start', 'assets/images/start.png');
        this.game.load.image('plus','assets/images/plus.png');
        this.game.load.image('minus','assets/images/minus.png');
    }

    create() {
        this.game.stage.backgroundColor = "#3E2723";
        star1 = this.game.add.sprite(0, 0, 'star1');
        star2 = this.game.add.sprite(0, 0, 'star2');
        star2.x = this.game.width-star2.width;
        jackpot = this.game.add.sprite(0, 10, 'jackpot');
        jackpot.x = this.game.width/2-jackpot.width/2;
        let style = { font: "bold 18px Arial", fill: "#ed2024" };
        let red = 0;
        for (let i = 0; i < 6; i++) {
            prizes[i] = this.game.make.bitmapData(200, 90);
            prizes[i].fill(255,235,59,0.8);
            prizes[i].addToWorld(10,50+i*90);
            let s1 = this.game.add.sprite(20,70+i*90, 'symbol', i);
            s1.scale.x = 0.6;
            s1.scale.y = 0.6;
            let s3 = this.game.add.sprite(130,70+i*90, 'symbol', i);
            s3.scale.x = 0.6;
            s3.scale.y = 0.6;
            let s2 = this.game.add.sprite(65,60+i*90, 'symbol', i);
            s2.scale.x = 0.85;
            s2.scale.y = 0.85;
            let t = [];
            t[i] = this.game.add.text(10, 50+i*90, text[i], style);
            t[i].x = (prizes[i].width - t[i].width)/2+10;
            let r = '0xff0000';
            let w = '0xffffff';
            if (i % 2 === 0) {
                w = '0xff0000';
                r = '0xffffff';
            }
            for (let k = 0; k < 9; k++) {
                circles[red] = this.game.add.graphics(5, 5);
                if (red % 2 === 0) {
                    circles[red].beginFill(r);
                } else {
                    circles[red].beginFill(w);
                }
                circles[red].drawCircle(10, 50+i*90+(10*k), 7);
                circles[red].endFill();
                red++;
            }
            for (let k = 0; k < 9; k++) {
                circles[red] = this.game.add.graphics(5, 5);
                if (red % 2 === 0) {
                    circles[red].beginFill(r);
                } else {
                    circles[red].beginFill(w);
                }
                circles[red].drawCircle(prizes[i].width, 50+i*90+(10*k), 7);
                circles[red].endFill();
                red++;
            }
        }
        signboard = this.game.make.bitmapData(370, 50);
        signboard.fill(254,224,135);
        signboard.addToWorld(235,70);
        jackpotText = this.game.add.text(385, 80, jackpotN, { font: "bold 30px Arial", fill: "#f44336" });
        let slot = [];
        let j = 0;
        for (let i = 0; i < 3; i++) {
            slot[i] = this.game.add.graphics(0,0);
            slot[i].beginFill(0xffffff);
            slot[i].lineStyle(5, 0xfdd603);
            slot[i].drawRoundedRect(220+i*130+10, 130, 120, 330, 5);
            slot[i].endFill();
            for (let k = 0; k < 3; k++) {
                slotSymbol[j] = this.game.add.sprite(220+i*130+10, 130+k*110, 'symbol', k+i);
                slotSymbol[j].width = 110;
                slotSymbol[j].height = 110;
                j++;
            }
        }
        let rect = this.game.add.graphics(0,0);
        rect.lineStyle(5, 0xfd6b03);
        rect.drawRect(235, 240, 370, 110);
        rect.endFill();
        balance = this.game.make.bitmapData(200, 40);
        balance.fill(253,72,3);
        balance.addToWorld(320,480);
        this.game.add.text(325,485, 'ПОПОЛНИТЬ СЧЁТ', { font: "bold 20px Arial", fill: "#ffffff" });
        balanceText = this.game.add.text(400,530, balanceN, { font: "bold 30px Arial", fill: "#ff0000" });
        start = this.game.add.button(630, 400, 'start', gameStart, this);
        stavka = this.game.make.bitmapData(70, 40);
        stavka.fill(0,0,0);
        stavka.addToWorld(670,530);
        this.game.add.text(675,500, 'ставка', { font: "bold 20px Arial", fill: "#ffffff" });
        stavkaText = this.game.add.text(695,532, '1', { font: "bold 30px Arial", fill: "#ff0000" });
        plus = this.game.add.button(750, 530, 'plus', stavkaPlus, this);
        minus = this.game.add.button(620, 530, 'minus', stavkaMinus, this);
    }
}


// variables
let star1, star2, jackpot, prizes =[], circles = [], signboard, jackpotText,
    balance, start, stavkaText, plus, minus, slotSymbol = [], balanceText, stavka;

// functions
let stavkaPlus = () => stavkaText.text++;
let stavkaMinus = () => {
    if (stavkaText.text > 1) {
        stavkaText.text--;
    }
}
let gameStart = () => {
    if(balanceText.text < 1){
        return false
    }
    balanceText.text -=stavkaText.text;
    for (let i=0; i < 9; i++) {
        slotSymbol[i].animations.add('symbol');
        slotSymbol[i].animations.play('symbol', 15+i, true);
    }
    setTimeout(function(){
        for (let i=0; i < 9; i++) {
            slotSymbol[i].animations.stop();
        }
        slotSymbol[1].loadTexture('symbol', data[0]);
        slotSymbol[4].loadTexture('symbol', data[1]);
        slotSymbol[7].loadTexture('symbol', data[2]);
        if(data[0] === data[1] && data[1] === data[2]) {
            switch (data[0]) {
                case 0: balanceText.text = parseInt(jackpotText.text)+parseInt(balanceText.text);
                    break;
                case 1: balanceText.text = 100*parseInt(stavkaText.text)+parseInt(balanceText.text);
                    break;
                case 2: balanceText.text = 10*parseInt(stavkaText.text)+parseInt(balanceText.text);
                    break;
                case 3: balanceText.text = 5*parseInt(stavkaText.text)+parseInt(balanceText.text);
                    break;
                case 4: balanceText.text = 3*parseInt(stavkaText.text)+parseInt(balanceText.text);
                    break;
                case 5: balanceText.text = parseInt(stavkaText.text)+parseInt(balanceText.text);
                    break;
            }
        }
    }, 1000);
}