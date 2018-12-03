/**
 * @module  ecs
 */
import { ECS } from './ECS';
import { System } from './System';
import { UIDGenerator } from './UID';
import { AllComponents, BaseComponent } from './Component';

/**
 * An entity.
 *
 * @class  Entity
 */
export class Entity {
  id: number;
  systems: System[];
  systemsDirty: boolean;
  comp: AllComponents;
  ecs: null | ECS;
  /**
   * @class Entity
   * @constructor
   *
   * @param  {Number|UIDGenerator} [idOrUidGenerator=null] The entity id if
   * a Number is passed. If an UIDGenerator is passed, the entity will use
   * it to generate a new id. If nothing is passed, the entity will use
   * the default UIDGenerator.
   *
   * @param {Array[Component]} [components=[]] An array of initial components.
   */
  constructor(id: number, components: any[] = []) {
    /**
     * Unique identifier of the entity.
     *
     * @property {Number} id
     */
    this.id = id;

    /**
     * Systems applied to the entity.
     *
     * @property {Array[System]} systems
     */
    this.systems = [];

    /**
     * Indiquate a change in components (a component was removed or added)
     * which require to re-compute entity eligibility to all systems.
     *
     * @property {Boolean} systemsDirty
     */
    this.systemsDirty = false;

    /**
     * Components of the entity stored as key-value pairs.
     *
     * @property {Object} comp
     */
    this.comp = {};

    // comp initialisation


    for (let i = 0; i < components.length; i++) {
      //@ts-ignore
      this.comp[components[i].name] = components[i];
    }

    /**
     * A reference to parent ECS class.
     * @property {ECS} ecs
     */
    this.ecs = null;
  }
  /**
   * Set the parent ecs reference.
   *
   * @private
   * @param {ECS} ecs An ECS class instance.
   */
  addToECS(ecs: ECS) {
    this.ecs = ecs;
    this.setSystemsDirty();
  }
  /**
   * Set the systems dirty flag so the ECS knows this entity
   * needs to recompute eligibility at the beginning of next
   * tick.
   */
  setSystemsDirty() {
    if (!this.systemsDirty && this.ecs !== undefined && this.ecs !== null) {
      this.systemsDirty = true;

      // notify to parent ECS that this entity needs to be tested next tick
      this.ecs.entitiesSystemsDirty.set(this.id, this);
    }
  }
  /**
   * Add a system to the entity.
   *
   * @private
   * @param {System} system The system to add.
   */
  addSystem(system: System) {
    this.systems.push(system);
  }
  /**
   * Remove a system from the entity.
   *
   * @private
   * @param  {System} system The system reference to remove.
   */
  removeSystem(system: System) {
    let index = this.systems.indexOf(system);

    if (index !== -1) {
      this.systems.splice(index, 1);
    }
  }
  /**
   * Add a component to the entity.
   *
   * @param {String} name Attribute name of the component to add.
   * @param {Object} data Component data.
   */
  addComponent(name: string, data: BaseComponent) {
    this.comp[name] = data;
    this.setSystemsDirty();
  }
  /**
   * Remove a component from the entity. To preserve performances, we
   * simple set the component property to `null`. Therefore the
   * property is still enumerable after a call to removeComponent()
   *
   * @param  {String} name Name of the component to remove.
   */
  removeComponent(name: string) {
    if (!this.comp[name]) {
      return;
    }
    //@ts-ignore
    this.comp[name] = null; 
    this.setSystemsDirty();
  }
  /**
   * Update a component field by field, NOT recursively. If the component
   * does not exists, this method create it silently.
   *
   * @method updateComponent
   * @param  {Number} name Name of the component
   * @param  {Object} data Dict of attributes to update
   * @example
   *   entity.addComponent('kite', {vel: 0, pos: {x: 1}});
   *   entity.component.pos is '{vel: 0, pos: {x: 1}}'
   *   entity.updateComponent('kite', {angle: 90, pos: {y: 1}});
   *   entity.component.pos is '{vel: 0, angle: 90, pos: {y: 1}}'
   */
  updateComponent(name: string, data: any) {

    if (!this.comp[name]) {
      this.addComponent(name, data);
    } else {
      let keys = Object.keys(data);

      for (let i = 0, key; key = keys[i]; i += 1) {
        this.comp[name][key] = data[key];
      }
    }
  }
  /**
   * Update a set of components.
   *
   * @param  {Object} componentsData Dict of components to update.
   */
  updateComponents(componentsData: object) {
    let components = Object.keys(componentsData);

    for (let i = 0, component; component = components[i]; i += 1) {

      this.updateComponent(component, componentsData[component]);
    }
  }
  /**
   * Dispose the entity.
   *
   * @private
   */
  dispose() {
    for (var i = 0, system; system = this.systems[0]; i += 1) {
      system.removeEntity(this);
    }
  }
}
