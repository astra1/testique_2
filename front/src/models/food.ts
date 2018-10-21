import { Game } from './game';

export class Food {
    public x: number = 0;
    public y: number = 0;

    private game: Game;
    private isFood: boolean;

    constructor(game: Game) {
        this.game = game;
        this.isFood = true;

        this.placeFood();
    }

    public placeFood() {
        if (!this.game.snake) {
            throw new Error('Snake must present');
        }
        let x = Math.floor(Math.random() * this.game.colCount);
        let y = Math.floor(Math.random() * this.game.rowCount);

        const cellCount = this.game.colCount * this.game.rowCount;

        let i = 0;
        while (
            this.game.snake.parts.some((p: any) => p.x === x && p.y === y) &&
            i < cellCount
        ) {
            x = Math.floor(Math.random() * this.game.colCount);
            y = Math.floor(Math.random() * this.game.rowCount);
            i++;
        }

        this.x = x;
        this.y = y;
    }

    public update() {
        this.game.grid.fillGrid(this.x, this.y, this.isFood, false);
    }
}
