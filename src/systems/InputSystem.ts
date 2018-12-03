import { ECS } from "../ECS";
import { Entity } from "../Entity";

export const map: number[][] = 
[[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

export class InputSystem extends ECS.System {
    constructor() {
        super();
    }
    enter(entity: Entity) {
        document.onkeydown = function (ev: KeyboardEvent) {
            switch (ev.code) {
                case "KeyD":
                    entity.comp.controls.pressingRight = true;
                    break;
                case "KeyA":
                    entity.comp.controls.pressingLeft = true;
                    break;
                case "KeyW":
                    entity.comp.controls.pressingUp = true;
                    break;
                case "KeyS":
                    entity.comp.controls.pressingDown = true;
                    break;
            }
        }
        document.onkeyup = function (ev: KeyboardEvent) {
            switch (ev.code) {
                case "KeyD":
                    entity.comp.controls.pressingRight = false;
                    break;
                case "KeyA":
                    entity.comp.controls.pressingLeft = false;
                    break;
                case "KeyW":
                    entity.comp.controls.pressingUp = false;
                    break;
                case "KeyS":
                    entity.comp.controls.pressingDown = false;
                    break;
            }
        }

    }

    test(entity: Entity): boolean {
        if (entity.comp.controls !== undefined) {
            return true;
        }
        return false;
    }
    isMoving(entity: Entity): boolean {
        return entity.comp.body.tileX !== entity.comp.body.tileToX || entity.comp.body.tileY !== entity.comp.body.tileToY;
    }
    isWall(x: number, y: number) {
        switch (map[y][x]) {
            case 0:
                return false;
            case 1:
                return true;
        }
    }
    update(entity: Entity, delta: number) {

        if (this.isMoving(entity) === false) {
            if (entity.comp.controls.pressingRight === true
                && !this.isWall(entity.comp.body.tileToX + 1, entity.comp.body.tileToY)
            ) {
                entity.comp.body.tileToX++;
                entity.comp.body.vx = 2.5;
            }
            if (entity.comp.controls.pressingLeft === true
                && !this.isWall(entity.comp.body.tileToX - 1, entity.comp.body.tileToY)) {
                entity.comp.body.tileToX--;
                entity.comp.body.vx = -2.5;

            }

            if (entity.comp.controls.pressingUp === true
                && !this.isWall(entity.comp.body.tileToX, entity.comp.body.tileToY - 1)) {
                entity.comp.body.tileToY--;
                entity.comp.body.vy = -2.5;
            }
            if (entity.comp.controls.pressingDown === true
                && !this.isWall(entity.comp.body.tileToX, entity.comp.body.tileToY + 1)) {
                entity.comp.body.tileToY++;
                entity.comp.body.vy = 2.5;
            }
        }
    }
}