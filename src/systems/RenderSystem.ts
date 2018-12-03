import { ECS } from "../ECS";
import { Entity } from "../Entity";
import { ctx } from "../demo";

import { map } from "./InputSystem";

export class RenderSystem extends ECS.System {
    constructor() {
        super();
    }
    test(entity: Entity): boolean {
        if (entity.comp.body !== undefined) {
            return true;
        }
        return false;
    }
    renderMovement(entity: Entity, delta: number) {

        if (entity.comp.body.tileX !== entity.comp.body.tileToX) {
            entity.comp.body.tileX += entity.comp.body.vx * (delta / 1000);

            if (entity.comp.body.vx > 0 && entity.comp.body.tileX > entity.comp.body.tileToX) { //moving right
                entity.comp.body.vx = 0;
                entity.comp.body.tileX = entity.comp.body.tileToX;

            } else if (entity.comp.body.vx < 0 && entity.comp.body.tileX < entity.comp.body.tileToX) { //moving left
                entity.comp.body.vx = 0;
                entity.comp.body.tileX = entity.comp.body.tileToX;
            }
        }

        if (entity.comp.body.tileY !== entity.comp.body.tileToY) {
            entity.comp.body.tileY += entity.comp.body.vy * (delta / 1000);

            if (entity.comp.body.vy > 0 && entity.comp.body.tileY > entity.comp.body.tileToY) { //moving down
                entity.comp.body.vy = 0;
                entity.comp.body.tileY = entity.comp.body.tileToY;

            } else if (entity.comp.body.vy < 0 && entity.comp.body.tileY < entity.comp.body.tileToY) { //moving up
                entity.comp.body.vy = 0;
                entity.comp.body.tileY = entity.comp.body.tileToY;
            }
        }
    }
    update(entity: Entity, delta: number): void {
        //@ts-ignore
        ctx.clearRect(0, 0, 400, 400);

        this.renderMovement(entity, delta);

        for (let i = 0; i < map.length; i++) {

            for (let j = 0; j < map[i].length; j++) {
                switch (map[i][j]) {
                    case 0:
                        break;
                    case 1:
                        ctx.fillRect(j * 32, i * 32, 32, 32);
                }
            }
        }

        ctx.fillRect(entity.comp.body.x, entity.comp.body.y, entity.comp.body.width, entity.comp.body.height);
    }
}