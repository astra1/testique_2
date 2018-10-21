export class Settings {
    public colCount: number;
    public rowCount: number;
    public difficulty: number;

    constructor(obj?: any) {
        this.colCount = (obj && obj.colCount) || 15;
        this.rowCount = (obj && obj.rowCount) || 15;
        this.difficulty = (obj && obj.difficulty) || 7;
    }
}
