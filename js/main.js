window.onload = function () {
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload:preload, create:create });

	function preload() {
		game.load.image('background', 'assets/images/background.png');
	};

	var background;
	var poly;
	var graphics;
	var points = [
		{ x: 300, y: 250 },
		{ x: 400, y: 250 },
		{ x: 400, y: 200 },
		{ x: 500, y: 275 },
		{ x: 400, y: 350 },
		{ x: 400, y: 300 },
		{ x: 300, y: 300 },
		{ x: 300, y: 250 }
	];
	var g = [];
	var p = [];
	var step = 1;
	dMax = 25;
	dMin = 10;
	var speed = 100;
	

	function create() {
		background = game.add.tileSprite(0, 0, 800, 600, 'background');

		poly = new Phaser.Polygon( points );
		graphics = game.add.graphics(0, 0);
		graphics.beginFill(0xffffff);
		graphics.lineStyle(3, 0xffffff);
		graphics.drawPolygon(poly);
		graphics.endFill();
		g[0] = graphics;
		p[0] = poly;

		for (var i = 1; i <= 4; i++) {
			if (i%2 === 0) {
				var d = dMin;
			} else {
				var d = dMax;
			}
			points[0].x -= d;
			points[0].y -= d;
			points[1].x -= d;
			points[1].y -= d;
			points[7].x -= d;
			points[7].y -= d;
			points[2].x -= d;
			points[2].y -= d*2;
			points[3].x += d+(d/4);
			points[4].x -= d;
			points[4].y += d*2;
			points[5].x -= d;
			points[5].y += d;
			points[6].x -= d;
			points[6].y += d;
			poly = new Phaser.Polygon( points );
			graphics = game.add.graphics(0, 0);
			if (i === 2) {
				graphics.lineStyle(3, 0x4CAF50);
			} else {
				graphics.lineStyle(3, 0xe91e63);
			}
			graphics.drawPolygon(poly);
			graphics.endFill();
			g[i] = graphics;
			p[i] = poly;
		}
		console.log(g);
		console.log(p);
		g[0].clear();
		setInterval(draw, speed);
	};

	function draw() {
		if (step === 1) {
			g[4].clear();
			step = 2;
		} else if (step === 2) {
			g[3].clear();
			step = 3;
		} else if (step === 3) {
			g[2].clear();
			step = 4;
		} else if (step === 4) {
			g[1].clear();
			step = 5;
			g[0].beginFill(0xffffff);
			g[0].lineStyle(3, 0xffffff);
			g[0].drawPolygon(p[0]);
			g[0].endFill();
		} else if (step === 5) {
			g[0].clear();
			d(p[1], g[1], 1);
			step = 6;
		} else if (step === 6) {
			d(p[2], g[2], 2);
			step = 7;
		} else if (step === 7) {
			d(p[3], g[3], 3);
			step = 8;
		} else if (step === 8) {
			d(p[4], g[4], 4);
			step = 1;
		}
	};

	function d(pp, gg, k) {
		gg = game.add.graphics(0, 0);
		if (step == 6) {
			gg.lineStyle(3, 0x4CAF50);
		} else {
			gg.lineStyle(3, 0xe91e63);
		}
		gg.drawPolygon(pp);
		gg.endFill();
		g[k] = gg;
		p[k] = pp;
	}
}