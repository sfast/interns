import States from './states';

export default class App extends Phaser.Game {
    constructor() {
        super(800, 600, Phaser.AUTO, 'content', null);

        this.state.add('GameState', States.Game, false);
        this.state.start('GameState');
    }
}