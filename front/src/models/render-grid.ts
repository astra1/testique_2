import { Game } from './game';

export class RenderGrid {
    private game: Game;
    private grid: any[][];

    constructor(game: Game) {
        this.game = game;
        this.grid = [];

        this.buildGrid();
    }

    public fillGrid(x: number, y: number, isFood: boolean, isHead: boolean) {
        const gridPiece = this.grid[x] && this.grid[x][y];
        if (gridPiece) {
            gridPiece.value = true;
            gridPiece.isFood = isFood;
            gridPiece.isHead = isHead;
        }
    }

    public update() {
        for (let x = 0; x < this.game!.colCount; x++) {
            for (let y = 0; y < this.game!.rowCount; y++) {
                const gridPiece = this.grid[x][y];

                // Empty or filled cell
                if (gridPiece.value) {
                    gridPiece.cell.classList.add('filled');
                    gridPiece.cell.classList.remove('empty');
                } else {
                    gridPiece.cell.classList.add('empty');
                    gridPiece.cell.classList.remove('filled');
                }

                // Is food or not
                gridPiece.isFood
                    ? gridPiece.cell.classList.add('food')
                    : gridPiece.cell.classList.remove('food');

                // Is Head
                gridPiece.isHead
                    ? gridPiece.cell.classList.add('head')
                    : gridPiece.cell.classList.remove('head');

                gridPiece.value = false;
            }
        }
    }

    private createCell(x: number, y: number): any {
        const cell = document.createElement('div');
        cell.classList.add('stage-cell');

        cell.style.width = cell.style.height = this.game.cellSize + 'rem';

        cell.style.left = x * this.game!.cellSize + 'rem';
        cell.style.top = y * this.game!.cellSize + 'rem';
        return cell;
    }

    private buildGrid() {
        for (let x = 0; x < this.game!.colCount; x++) {
            this.grid[x] = [];

            for (let y = 0; y < this.game!.rowCount; y++) {
                const cell = this.createCell(x, y);
                this.game.stage.appendChild(cell);

                this.grid[x][y] = {
                    cell,
                    value: false,
                    isFood: false,
                    isHead: false,
                };
            }
        }
    }
}
