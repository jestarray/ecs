import { InputComponent } from "./components/Input";
import { GridBodyComponent } from "./components/Render";
import { ECS } from "./ECS";
import { InputSystem } from "./InputSystem";
import { RenderSystem } from "./RenderSystem";

declare global {
    interface Window {
        ecs: ECS;
    }
}

//@ts-ignore
export let ctx: CanvasRenderingContext2D = document.getElementById("canvas").getContext("2d");

const ecs: ECS = new ECS();
window.ecs = ecs;

const snake = new ECS.Entity(0, [new GridBodyComponent(), new InputComponent()]);

ecs.addSystem(new RenderSystem());
ecs.addSystem(new InputSystem());
ecs.addEntity(snake);

function gameLoop() {
    ecs.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();