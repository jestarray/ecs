import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { System } from "./System";
import { IComponent } from "./IComponent";

const ecs: ECS = new ECS();
window.ecs = ecs;
console.log(ecs);

class MovementSystem extends ECS.System {
    constructor() {
        super();
    }

    test(entity: Entity): boolean {
        if(entity.components.pos !== undefined){
            return true;
        }
        return false
    }
    update(entity: Entity, delta: number): void {
        entity.components.pos.x += Math.ceil(Math.random() * 10);
    }
}

const Position: IComponent = {
    name: "pos",
    defaults: {
        x: 0,
        y: 0
    }
}

const player: Entity = new ECS.Entity(1, [Position]);
const player2: Entity = new ECS.Entity(2);

/* for (let i = 1; i < 1; i++) {
    ecs.addEntity(new ECS.Entity(i, [Position]));
} */

ecs.addSystem(new MovementSystem());
ecs.addEntity(player);
ecs.addEntity(player2)

//movesys.addEntity(player);
window.player = player;

function gameLoop() {
    ecs.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();