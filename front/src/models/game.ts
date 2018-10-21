import { Snake } from './snake';
import { RenderGrid } from './render-grid';
import { Food } from './food';
import GameUtils from '@/utils/game-utils';

export class Game {
    public colCount: number;
    public rowCount: number;
    public cellSize: number;
    public fps: number;

    public stage: any;
    public scoreValue = 0;
    public snake: Snake;

    public grid: RenderGrid;
    public intVal: any;

    private food: Food;

    constructor(width: number, height: number, fps: number, stage: any) {
        this.colCount = width;
        this.rowCount = height;

        const sizeToCalc = Number(width) >= Number(height) ? width : height;

        this.cellSize =
            (stage.clientWidth - 50) / (sizeToCalc * getBodyFontSize());
        this.fps = fps;

        stage.style.height = stage.width =
            this.rowCount * this.cellSize + 'rem';
        this.stage = stage;

        this.grid = new RenderGrid(this);
        this.snake = new Snake(this, 0, 0, 3);
        this.food = new Food(this);

        // StartLoop
        this.restartLoop();
    }

    public startLoop() {
        this.intVal = setInterval(() => this.update(), 1000 / this.fps);
        // prop isPlaying = true
        return true;
    }

    public finishLoop() {
        GameUtils.stopSnake();
        // prop isPlaying = false
        return false;
    }

    private restartLoop() {
        this.finishLoop();
        this.startLoop();
    }

    private update() {
        this.food.update();
        this.snake.update();

        if (this.snake.x === this.food.x && this.snake.y === this.food.y) {
            this.food.placeFood();

            this.snake.addPart();
            this.scoreValue++;

            if (this.scoreValue % 2 === 0) {
                this.fps *= 1.02;
                this.restartLoop();
            }

            if (this.snake.parts.length === 25) {
                this.snake.die();
                GameUtils.winGame();
            }
        }

        this.grid.update();
    }
}

function getBodyFontSize(): number {
    const body = window.document.body;
    const fontSizeText = window.getComputedStyle(body).fontSize;
    const bodyFontSize = parseFloat(fontSizeText || '16');
    return bodyFontSize;
}
