import { ControlsComponent } from "./components/Controls";
import { GridBodyComponent } from "./components/GridBody";
import { ECS } from "./ECS";
import { InputSystem } from "./systems/InputSystem";
import { RenderSystem } from "./systems/RenderSystem";

declare global {
    interface Window {
        ecs: ECS;
    }
}

//@ts-ignore
export let ctx: CanvasRenderingContext2D = document.getElementById("canvas").getContext("2d");

const ecs: ECS = new ECS();
window.ecs = ecs;

const snake = new ECS.Entity(0, [new GridBodyComponent(), new ControlsComponent()]);

ecs.addSystem(new RenderSystem());
ecs.addSystem(new InputSystem());
ecs.addEntity(snake);

function gameLoop() {
    ecs.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();