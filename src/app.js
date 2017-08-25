import States from './states';

export default class App {
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', this);

        this.game.state.add('GameState', new States.Game(this));
        this.game.state.start('GameState');
    }
}