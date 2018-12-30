Entity Component System
=======================

> Entity-component-system (ECS) is an architectural pattern that is mostly 
> used in game development. An ECS follows the Composition over inheritance 
> principle that allows greater flexibility in defining entities where every 
> object in a game's scene is an entity (e.g. enemies, bullets, vehicles, 
> etc.).
> *Thanks Wikipédia*

This library implement the entity component system pattern in EcmaScript6.

## Features

 * ES6. 
 * Barebone. No bullshit. No black magic. Take a look at the sources.
 * Flexible. You can subclass the Entity or UIDGenerator classes to implement your own logic. e.g. extend the System class in an EventEmitterSystem class to allow inter-system communication!
 * Fast. Intelligently batch your entities and systems so that the minimum amount of time is spent on pure iteration. Benchmarks in a <hope>near</hope> future.
 * Fast even for ECS. The eligibility to systems is computed only when components list change, and in most cases the overhead of systems eligibility will be computed once per entity, when added. Therefore there is no overhead for most iterations. [Iteration is often considered as a flaw of ecs pattern](https://en.wikipedia.org/wiki/Entity_component_system#Drawbacks).

## Getting started

Transiple and bundle with ```parcel index.html```

## Documentation

The full documentation of methods can be found on [yagl.github.io/docs/ecs](yagl.github.io/docs/ecs). Please note that documentation is still a WIP and may be incompatible with breaking changes

## To Do:

* Fix type errors
* Benchmark iteration of entites (array vs maps);
* Get working demo
* Added intersystems commuinication with event emitters

Bugs:
* Entity.updateComponent() is probably broken
