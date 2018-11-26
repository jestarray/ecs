import { Entity } from "./Entity";

/**
 * @module  ecs
 */
/**
 * @class  System
 *
 * @description  A system update all eligible entities at a given frequency.
 * This class is not meant to be used directly and should be sub-classed to
 * define specific logic.
 */

export abstract class System {
  frequency: number;
  entities: Map<number, Entity>;
  /**
   * @class  System
   * @constructor
   * @param [frequency=1] {Number} Frequency of execution.
   */
  constructor(frequency: number = 1) {
    /**
     * Frequency of update execution, a frequency of `1` run the system every
     * update, `2` will run the system every 2 updates, ect.
     * @property {Number} frequency
     */
    this.frequency = frequency;

    /**
     * Entities of the system.
     *
     * @property {Map<number, Entity>} entities
     */
    this.entities = new Map();
  }
  /**
   * Add an entity to the system entities.
   *
   * @param {Entity} entity The entity to add to the system.
   */

  addEntity(entity: Entity): void {
    entity.addSystem(this);
    this.entities.set(entity.id, entity);

    if (this.enter !== undefined) {
      this.enter(entity);
    }
  }
  /**
   * Remove an entity from the system entities. exit() handler is executed
   * only if the entity actually exists in the system entities.
   *
   * @param  {Entity} entity Reference of the entity to remove.
   */
  removeEntity(entity: Entity): void {

    for (let [key, value] of this.entities) {
      if (entity === value) {
        entity.removeSystem(this);
        this.entities.delete(key);
        if (this.exit !== undefined) {
          this.exit(value);
        }
      }
    }
  }
  /**
   * Apply update to each entity of this system.
   *
   * @method  updateAll
   */

  updateAll(elapsed: number) {
    if (this.preUpdate !== undefined) { this.preUpdate(); }

    for (let [key, value] of this.entities) {
      this.update(value, elapsed);
    }
    if (this.postUpdate !== undefined) { this.postUpdate() }
  }
  /**
   * dispose the system by exiting ALL the entities
   *
   * @method  dispose
   */
  dispose() {
    for (let [key, value] of this.entities) {
      value.removeSystem(this);
      if (this.exit !== undefined) { this.exit(value); }
    }
  }

  // methods to be extended by subclasses
  /**
   * Abstract method to subclass. Called once per update, before entities
   * iteration.
   *
   * @method  preUpdate
   */
  preUpdate() {
    
  }
  /**
   * Abstract method to subclass. Called once per update, after entities
   * iteration.
   *
   * @method  postUpdate
   */
  postUpdate() {

  }
  /**
   * Abstract method to subclass. Should return true if the entity is eligible
   * to the system, false otherwise.
   *
   * @method  test
   * @param  {Entity} entity The entity to test.
   */
  abstract test(entity: Entity): boolean
  /**
   * Abstract method to subclass. Called once when an entity is added to the system.
   *
   * @method  enter
   * @param  {Entity} entity The added entity.
   */
  enter(entity: Entity) {
    
  }
  /**
   * Abstract method to subclass. Called once when an entity is removed from the system.
   *
   * @method  exit
   * @param  {Entity} entity The removed entity.
   */
  exit(entity: Entity) {

  }
  /**
   * Abstract method to subclass. Called for each entity to update. This is
   * the only method that should actual mutate entity state.
   *
   * @method  update
   * @param  {Entity} entity The entity to update.
   * @param {number} elapsed the delta time
   */
  update(entity: Entity, elapsed?: number) {

  }
}
// jshint unused:true
