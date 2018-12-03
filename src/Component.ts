import { GridBodyComponent } from "./components/GridBody";
import { ControlsComponent } from "./components/Controls";

export interface BaseComponent { 
    name: string | number;
}

export interface AllComponents {
    [ index: string] : object;
    body: GridBodyComponent;
    controls: ControlsComponent;
}