import { Entity } from "./Entity";
import { System } from "./System";

/**
 * Entity Component System module
 *
 * @module ecs
 */

/** @typedef Entity */
/** @typedef System */

/**
 * @class  ECS
 */
export class ECS {
  entities: Map<number, Entity>;
  entitiesSystemsDirty: Map<number, Entity>;
  systems: System[];
  updateCounter: number;
  lastUpdate: number;
  /**
   * @constructor
   * @class  ECS
   */
  constructor() {
    /**
     * Store all entities of the ECS.
     *
     * @property entities
     * @type {Array}
     */
    this.entities = new Map();

    /**
     * Store entities which need to be tested at beginning of next tick.
     *
     * @property entitiesSystemsDirty
     * @type {Array}
     */
    this.entitiesSystemsDirty = new Map();

    /**
     * Store all systems of the ECS.
     *
     * @property systems
     * @type {Array}
     */
    this.systems = []

    /**
     * Count how many updates have been done.
     *
     * @property updateCounter
     * @type {Number}
     */
    this.updateCounter = 0

    this.lastUpdate = performance.now()
  }

  /**
   * Retrieve an entity by id
   * @param  {Number} id id of the entity to retrieve
   * @return {Entity} The entity if found null otherwise
   */

  getEntityById(id: number): Entity | undefined {
    return this.entities.get(id);
  }

  /**
   * Add an entity to the ecs.
   *
   * @method addEntity
   * @param {Entity} entity The entity to add.
   */
  addEntity(entity: Entity) {
    this.entities.set(entity.id, entity);
    entity.addToECS(this)
  }

  /**
   * Remove an entity from the ecs by reference.
   *
   * @method removeEntity
   * @param  {Entity} entity reference of the entity to remove
   * @return {boolean}        the remove entity if any
   */
  removeEntity(entity: Entity): boolean {
    for (let [key, value] of this.entities) {
      if (value === entity) {
        entity.dispose();
        this.removeEntityIfDirty(entity);
        this.entities.delete(key);
        return true;
      }
    }
    return false;
  }


  /**
   * Remove an entity from the ecs by entity id.
   *
   * @method removeEntityById
   * @param  {number} entityId id of the entity to remove
   * @return {boolean}          removed entity if any
   */
  removeEntityById(entityId: number): boolean {
    let entity = this.entities.get(entityId);
    if (entity !== undefined) {
      entity.dispose();
      this.removeEntityIfDirty(entity);
      this.entities.delete(entityId);
      return true;
    }
    return false;
  }

  /**
   * Remove an entity from dirty entities by reference.
   *
   * @private
   * @method removeEntityIfDirty
   * @param  {[type]} entity entity to remove
   */
  removeEntityIfDirty(entity: Entity) {
    for (let [key, value] of this.entities) {
      if (value === entity) {
        value.dispose();
        this.entitiesSystemsDirty.delete(key);
      }
    }
  }

  /**
   * Add a system to the ecs, and test all entities for eligibility for the system
   *
   * @method addSystem
   * @param {System} system system to add
   */
  addSystem(system: System) {
    this.systems.push(system)

    for (let [key, value] of this.entities) {
      if (system.test(value)) {
        system.addEntity(value);
      }
    }
  }

  /**
   * Remove a system from the ecs.
   *
   * @method removeSystem
   * @param  {System} system system reference
   */
  removeSystem(system: System) {
    let index = this.systems.indexOf(system)

    if (index !== -1) {
      this.systems.splice(index, 1)
      system.dispose()
    }
  }

  /**
   * "Clean" entities flagged as dirty by removing unecessary systems and
   * adding missing systems.
   *
   * @private
   * @method cleanDirtyEntities
   */
  cleanDirtyEntities() {

    for (let [key, value] of this.entitiesSystemsDirty) {
      for (let i: number = 0, system: System; system = this.systems[i]; i += 1) {

        // for each dirty entity for each system
        let index = value.systems.indexOf(system);
        let entityTest = system.test(value);

        if (index === -1 && entityTest) { // if the entity is not added to the system yet and should be, add it
          system.addEntity(value)
        } else if (index !== -1 && !entityTest) {// if the entity is added to the system but should not be, remove it
          system.removeEntity(value)
        }
        // else we do nothing the current state is OK

      }
      value.systemsDirty = false

    }
    this.entitiesSystemsDirty.clear();
  }

  /**
   * Update the ecs.
   *
   * @method update
   */
  update(): void {
    let now: number = performance.now()
    let elapsed: number = now - this.lastUpdate

    for (let i = 0, system; system = this.systems[i]; i += 1) {
      if (this.updateCounter % system.frequency > 0) {
        continue
      }

      if (this.entitiesSystemsDirty.size >= 1) {
        // if the last system flagged some entities as dirty check that case
        this.cleanDirtyEntities()
      }

      system.updateAll(elapsed)
    }

    this.updateCounter += 1
    this.lastUpdate = now
  }
  static Entity = Entity;
  static System = System;
}
