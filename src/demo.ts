import { ECS } from "./ECS";
import { Entity } from "./Entity";
import { System } from "./System";
import { IComponent } from "./IComponent";
import { RenderSystem } from "./RenderSystem";
import { InputSystem } from "./InputSystem";

declare global {
    interface Window {
        ecs: ECS;
    }
}

//@ts-ignore
export let ctx: CanvasRenderingContext2D = document.getElementById("canvas").getContext("2d");

const ecs: ECS = new ECS();
window.ecs = ecs;

window.onkeydown = function () {

}

const Position: IComponent = {
    name: "pos",
    defaults: {
        x: 0,
        y: 0
    }
}

const RectangularBody: IComponent = {
    name: "body",
    defaults: {
        width: 50,
        height: 50,
    }
}

const controls: IComponent = {
    name: "controls",
    defaults: {
        pressingDown: false,
        pressingLeft: false,
        pressingRight: false,
        pressingUp: false,

    }
}


const snake = new ECS.Entity(0, [Position, RectangularBody, controls]);

ecs.addSystem(new RenderSystem());
ecs.addSystem(new InputSystem());
ecs.addEntity(snake);

function gameLoop() {
    ecs.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();