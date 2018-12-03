import { BaseComponent } from "../Component";

export class GridBodyComponent implements BaseComponent{
    name: string | number;
    [index: string]: number | string;
    tileX: number;
    tileY: number;
    tileToX: number;
    tileToY: number;
    width: number;
    height: number;
    vx: number;
    vy: number;

    constructor(tileX: number = 0, tileY: number = 0, tileToX: number = 0, tileToY: number = 0, width: number = 32, height: number = 32, vx: number = 0, vy: number = 2.5) {
        this.name = "body";
        this.tileX = tileX;
        this.tileY = tileY;

        this.tileToX = tileToX;
        this.tileToY = tileToY;

        this.width = width;
        this.height = height;
        this.vx = vx;
        this.vy = vy;
    }
    get x(): number {
        return this.tileX * 32;
    }
    get y(): number {
        return this.tileY * 32;
    }
}