Version 3.0
======
* BREAKING: changed components to comp
* Added: Components Base Class and Types
* Removed: lots of cleanups

Version 2.0
======
* Switched most arrays to maps
* Removed UID for now
* Adding parcel for building
* Initial demo with parcel

## Updates / Changes from the original version
This repo is a fork of Pierre BEAUJEU yagl-ecs which i use in my games.
- The dependencies are updated (as of July 2018)
- Gulp is removed
- Some restructuring
- Making a local NPM module out of it, as i won't publish this to npm
- Replaced fastSplice with Array.prototype.splice, as fastSplice is 3 times slower nowadays :)