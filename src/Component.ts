/* 
    Use enum to define component names
*/

export const enum CMP {
    GRIDBODY,
    INPUT,
}

export abstract class BaseComponent {
    name: CMP;
    constructor(name: CMP) {
        this.name = name;
    }
}