import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { CMP } from "./Component";

export class InputSystem extends ECS.System {
    constructor() {
        super();
    }
    enter(entity: Entity) {
        document.onkeydown = function (ev: KeyboardEvent) {
            switch (ev.code) {
                case "KeyD":
                    entity.comp[CMP.INPUT].pressingRight = true;
                    break;
                case "KeyA":
                    entity.comp[CMP.INPUT].pressingLeft = true;
                    break;
                case "KeyW":
                    entity.comp[CMP.INPUT].pressingUp = true;
                    break;
                case "KeyS":
                    entity.comp[CMP.INPUT].pressingDown = true;
                    break;
            }
        }
        document.onkeyup = function (ev: KeyboardEvent) {
            switch (ev.code) {
                case "KeyD":
                    entity.comp[CMP.INPUT].pressingRight = false;
                    break;
                case "KeyA":
                    entity.comp[CMP.INPUT].pressingLeft = false;
                    break;
                case "KeyW":
                    entity.comp[CMP.INPUT].pressingUp = false;
                    break;
                case "KeyS":
                    entity.comp[CMP.INPUT].pressingDown = false;
                    break;
            }
        }

    }

    test(entity: Entity): boolean {
        if (entity.comp[CMP.INPUT] !== undefined) {
            return true;
        }
        return false;
    }
    isMoving(entity: Entity): boolean {
        return entity.comp[CMP.GRIDBODY].tileX !== entity.comp[CMP.GRIDBODY].tileToX || entity.comp[CMP.GRIDBODY].tileY !== entity.comp[CMP.GRIDBODY].tileToY;
    }
    update(entity: Entity, delta: number) {

        if (this.isMoving(entity) === false) {
            if (entity.comp[CMP.INPUT].pressingRight === true) {
                entity.comp[CMP.GRIDBODY].tileToX++;
                entity.comp[CMP.GRIDBODY].vx = 2.5;
            }
            if (entity.comp[CMP.INPUT].pressingLeft === true) {
                entity.comp[CMP.GRIDBODY].tileToX--;
                entity.comp[CMP.GRIDBODY].vx = -2.5;

            }

            if (entity.comp[CMP.INPUT].pressingUp === true) {
                entity.comp[CMP.GRIDBODY].tileToY--;
                entity.comp[CMP.GRIDBODY].vy = -2.5;
            }
            if (entity.comp[CMP.INPUT].pressingDown === true) {
                entity.comp[CMP.GRIDBODY].tileToY++;
                entity.comp[CMP.GRIDBODY].vy = 2.5;
            }
        }
    }
}