export interface IComponent {
    getDefaults?(): IComponent,
    name: string,
    defaults?: object
}