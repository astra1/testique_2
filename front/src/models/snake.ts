import { Part } from './part';
import { Game } from './game';
import GameUtils from '@/utils/game-utils';

export class Snake {
    public x: number;
    public y: number;
    public canChange: boolean;
    public parts: Part[];

    private game: Game;
    private xspeed: number;
    private yspeed: number;

    constructor(game: Game, x: number, y: number, segments: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.xspeed = 1;
        this.yspeed = 0;
        this.canChange = true;
        this.parts = Part.generateParts(segments, x - 1, y);
    }

    public controller(key: number) {
        if (key === 37 && this.yspeed !== 0 && this.canChange) {
            this.canChange = false;
            this.xspeed = -1;
            this.yspeed = 0;
        }

        if (key === 39 && this.yspeed !== 0 && this.canChange) {
            this.canChange = false;
            this.xspeed = 1;
            this.yspeed = 0;
        }

        if (key === 38 && this.xspeed !== 0 && this.canChange) {
            this.canChange = false;
            this.yspeed = -1;
            this.xspeed = 0;
        }

        if (key === 40 && this.xspeed !== 0 && this.canChange) {
            this.canChange = false;
            this.yspeed = 1;
            this.xspeed = 0;
        }
    }

    public addPart() {
        const lastPart = this.parts[this.parts.length - 1];
        this.parts.push(new Part(lastPart.x, lastPart.y));
    }

    public update() {
        this.x += this.xspeed;
        this.y += this.yspeed;

        if (this.x < 0) {
            this.x = this.game.colCount - 1;
        }
        if (this.y < 0) {
            this.y = this.game.rowCount - 1;
        }
        if (this.x > this.game.colCount - 1) {
            this.x = 0;
        }
        if (this.y > this.game.rowCount - 1) {
            this.y = 0;
        }

        for (let i = this.parts.length - 1; i >= 0; i--) {
            const part = this.parts[i];

            if (part !== undefined) {
                if (i !== 0) {
                    part.x = this.parts[i - 1].x;
                    part.y = this.parts[i - 1].y;

                    if (this.x === part.x && this.y === part.y) {
                        this.die();
                    }
                } else {
                    part.x = this.x;
                    part.y = this.y;
                }

                // Head?
                const isFirstPart =
                    this.x === this.parts[0].x && this.y === this.parts[0].y;
                const isCurrCellHead = this.x === part.x && this.y === part.y;
                const isFirstCellHead = isFirstPart && isCurrCellHead;

                this.game.grid.fillGrid(part.x, part.y, false, isFirstCellHead);
            }
        }
        this.canChange = true;
    }

    public die() {
        GameUtils.stopSnake();

        const date = new Date();
        const lastScore = this!.game.scoreValue;

        GameUtils.finishGame({ finished: true, score: lastScore });
        GameUtils.saveScore(lastScore, date);
    }
}
