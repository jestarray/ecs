import { BaseComponent } from "../Component";

export class ControlsComponent implements BaseComponent{
    [index: string] : boolean | number | string;
    name: string | number;
    pressingDown: boolean;
    pressingLeft: boolean;
    pressingRight: boolean;
    pressingUp: boolean;
    constructor() {
        this.name = "controls"
        this.pressingDown = false;
        this.pressingLeft = false;
        this.pressingRight = false;
        this.pressingUp = false;
    }
}