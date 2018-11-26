import { BaseComponent, CMP } from "../Component";

export class ControlsComponent extends BaseComponent {
    pressingDown: boolean;
    pressingLeft: boolean;
    pressingRight: boolean;
    pressingUp: boolean;
    constructor() {
        super(CMP.INPUT);
        this.pressingDown = false;
        this.pressingLeft = false;
        this.pressingRight = false;
        this.pressingUp = false;
    }
}