import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { ctx } from "./demo";
import { CMP } from "./Component";
export class RenderSystem extends ECS.System {
    constructor() {
        super();
    }
    test(entity: Entity): boolean {
        if (entity.comp[CMP.GRIDBODY] !== undefined) {
            return true;
        }
        return false;
    }
    renderMovement(entity: Entity, delta: number) {

        if (entity.comp[CMP.GRIDBODY].tileX !== entity.comp[CMP.GRIDBODY].tileToX) {
            entity.comp[CMP.GRIDBODY].tileX += entity.comp[CMP.GRIDBODY].vx * (delta / 1000);

            if (entity.comp[CMP.GRIDBODY].vx > 0 && entity.comp[CMP.GRIDBODY].tileX > entity.comp[CMP.GRIDBODY].tileToX) { //moving right
                entity.comp[CMP.GRIDBODY].vx = 0;
                entity.comp[CMP.GRIDBODY].tileX = entity.comp[CMP.GRIDBODY].tileToX;

            } else if (entity.comp[CMP.GRIDBODY].vx < 0 && entity.comp[CMP.GRIDBODY].tileX < entity.comp[CMP.GRIDBODY].tileToX) { //moving left
                entity.comp[CMP.GRIDBODY].vx = 0;
                entity.comp[CMP.GRIDBODY].tileX = entity.comp[CMP.GRIDBODY].tileToX;
            }
        }

        if (entity.comp[CMP.GRIDBODY].tileY !== entity.comp[CMP.GRIDBODY].tileToY) {
            entity.comp[CMP.GRIDBODY].tileY += entity.comp[CMP.GRIDBODY].vy * (delta / 1000);

            if (entity.comp[CMP.GRIDBODY].vy > 0 && entity.comp[CMP.GRIDBODY].tileY > entity.comp[CMP.GRIDBODY].tileToY) { //moving down
                entity.comp[CMP.GRIDBODY].vy = 0;
                entity.comp[CMP.GRIDBODY].tileY = entity.comp[CMP.GRIDBODY].tileToY;

            } else if (entity.comp[CMP.GRIDBODY].vy < 0 && entity.comp[CMP.GRIDBODY].tileY < entity.comp[CMP.GRIDBODY].tileToY) { //moving up
                entity.comp[CMP.GRIDBODY].vy = 0;
                entity.comp[CMP.GRIDBODY].tileY = entity.comp[CMP.GRIDBODY].tileToY;
            }
        }
    }
    update(entity: Entity, delta: number): void {
        //@ts-ignore
        ctx.clearRect(0, 0, 400, 400);

        this.renderMovement(entity, delta);

        ctx.fillRect(entity.comp[CMP.GRIDBODY].x, entity.comp[CMP.GRIDBODY].y, entity.comp[CMP.GRIDBODY].width, entity.comp[CMP.GRIDBODY].height);
    }
}