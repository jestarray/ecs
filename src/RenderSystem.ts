import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { ctx } from "./demo";
export class RenderSystem extends ECS.System {
    constructor() {
        super();
    }
    test(entity: Entity): boolean {
        if (entity.components.body !== undefined) {
            return true;
        }
        return false;
    }
    update(entity: Entity, delta: number): void {
        //@ts-ignore
        ctx.clearRect(0, 0, 400, 400);

        ctx.fillRect(entity.components.pos.x, entity.components.pos.y, entity.components.body.width, entity.components.body.height);
    }
}