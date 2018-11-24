import { ECS } from "./ECS";
import { Entity } from "./Entity";

export class InputSystem extends ECS.System {
    constructor() {
        super();
    }
    enter(entity: Entity) {
        document.onkeydown = function (ev: KeyboardEvent) {

            switch (ev.code) {
                case "KeyD":
                    entity.components.controls.pressingRight = true;
                    break;
                case "KeyA":
                    entity.components.controls.pressingLeft = true;
                    break;
                case "KeyW":
                    entity.components.controls.pressingUp = true;
                    break;
                case "KeyS":
                    entity.components.controls.pressingDown = true;
                    break;
            }
        }
        document.onkeyup = function (ev: KeyboardEvent) {
            switch (ev.code) {
                case "KeyD":
                    entity.components.controls.pressingRight = false;
                    break;
                case "KeyA":
                    entity.components.controls.pressingLeft = false;
                    break;
                case "KeyW":
                    entity.components.controls.pressingUp = false;
                    break;
                case "KeyS":
                    entity.components.controls.pressingDown = false;
                    break;
            }
        }
        
    }

    test(entity: Entity): boolean {
        if (entity.components.controls !== undefined) {
            return true;
        }
        return false;
    }
    update(entity: Entity, delta: number) {
        if(entity.components.controls.pressingRight === true){
            entity.components.pos.x += entity.components.body.width * (delta / 1000);
        }
        if(entity.components.controls.pressingLeft === true){
            entity.components.pos.x += -entity.components.body.width * (delta / 1000);
        }

        if(entity.components.controls.pressingUp === true){
            entity.components.pos.y += -entity.components.body.height * (delta / 1000);
        }
        if(entity.components.controls.pressingDown === true){
            entity.components.pos.y += entity.components.body.height * (delta / 1000);
        }
    }
}