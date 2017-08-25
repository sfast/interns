import 'pixi';
import 'p2';
import Phaser from 'phaser';

import { GameState } from './states';

class Game extends Phaser.Game {
  constructor () {
    const width = 800;
    const height = 600;

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Game', GameState, false);

    this.state.start('Game')
  }
}

window.game = new Game();
