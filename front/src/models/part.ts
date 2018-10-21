export class Part {
    public static generateParts(count: number, x: number, y: number) {
        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(new Part(x - 1, y));
        }
        return result;
    }

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
