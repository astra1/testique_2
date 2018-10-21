export class Score {
    public score: number;
    public date: Date;
    constructor(obj?: any) {
        this.score = (obj && obj.score) || 0;
        this.date = (obj && obj.date) || Date.now();
    }
}
