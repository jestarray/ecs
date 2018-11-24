/**
 * @module  ecs
 */
import { UIDGenerator, DefaultUIDGenerator } from './UID';
import { System } from './System';
import { ECS } from './ECS';
import { IComponent } from './IComponent';

/**
 * An entity.
 *
 * @class  Entity
 */
export class Entity {
  id: number;
  systems: System[];
  systemsDirty: boolean;
  components: { [index: string]: IComponent | undefined | {}};
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
  constructor(id: number, components: IComponent[] = []) {
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
     * @property {Object} components
     */
    this.components = {};

    // components initialisation
    for (let i = 0, component: IComponent; component = components[i]; i += 1) {
      // if a getDefaults method is provided, use it. First because let the
      // runtime allocate the component is way more faster than using a copy
      // function. Secondly because the user may want to provide some kind
      // of logic in components initialisation ALTHOUGH these kind of
      // initialisation should be done in enter() handler
      if (component.getDefaults) {
        this.components[component.name] = component.getDefaults();
      } else {
        this.components[component.name] = Object.assign({},
          components[i].defaults);
      }
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
    if (!this.systemsDirty && this.ecs !== undefined) {
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
   * Add a component to the entity. WARNING this method does not copy
   * components data but assign directly the reference for maximum
   * performances. Be sure not to pass the same component reference to
   * many entities.
   *
   * @param {String} name Attribute name of the component to add.
   * @param {Object} data Component data.
   */
  addComponent(name: string, data: object) {
    this.components[name] = data || {};
    this.setSystemsDirty();
  }
  /**
   * Remove a component from the entity. To preserve performances, we
   * simple set the component property to `undefined`. Therefore the
   * property is still enumerable after a call to removeComponent()
   *
   * @param  {String} name Name of the component to remove.
   */
  removeComponent(name: string) {
    if (!this.components[name]) {
      return;
    }

    this.components[name] = undefined;
    this.setSystemsDirty();
  }
  /**
   * Update a component field by field, NOT recursively. If the component
   * does not exists, this method create it silently.
   *
   * @method updateComponent
   * @param  {String} name Name of the component
   * @param  {Object} data Dict of attributes to update
   * @example
   *   entity.addComponent('kite', {vel: 0, pos: {x: 1}});
   *   // entity.component.pos is '{vel: 0, pos: {x: 1}}'
   *   entity.updateComponent('kite', {angle: 90, pos: {y: 1}});
   *   // entity.component.pos is '{vel: 0, angle: 90, pos: {y: 1}}'
   */
  updateComponent(name: string, data: any) {
    let component = this.components[name];

    if (!component) {
      this.addComponent(name, data);
    } else {
      let keys = Object.keys(data);

      for (let i = 0, key; key = keys[i]; i += 1) {
        component[key] = data[key];
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
