var mkhash = require('multikey-hash');

/**
 * Creates a new SuperHash
 *
 *  Example `entries` Array
 *
 * ```
 * [[1,2,3],'foo'], [[{foo: 'bar', {blip:'blop'}],'bar']]
 * ```
 * 
 * @class
 * @param {Array} entries two dimensional array with entries to prefill the map. Keys must be an array (even if just one)
 * @api public
 */
function SuperHash(entries) {
  var args;

  this.store = {};
  this.size = 0;

  if (!entries) {
    return;
  }

  for (var i = 0; i < entries.length; i++) {
    args = entries[i][0];
    args.push(entries[i][1]);
    this.set.apply(this, args);
  }
}

/**
 * Creates a hash from the keys if it doesn't exist and sets the last argument passed in as the value
 *
 * @param {...*} keys  Used to generate hash
 * @param {*} value to be associated with the key
 * @return {Number} the hash associated with the keys
 * @api public
 */
SuperHash.prototype.set = function set() {
  var len = arguments.length;
  var value = arguments[len-1];
  var keys = new Array(len-1);
  var hash;

  for (var i = 0; i < len-1; i++) {
    keys[i] = arguments[i];
  }

  hash = mkhash.apply(this, keys);

  if (!this.store.hasOwnProperty(hash)) {
    this.size++; 
  }
  
  this.store[hash] = [keys, value];
  return this;
};

/**
 * Returns the value associated with the hash generated from the keys
 *
 * @param {...*} keys Used to generate a hash for lookup
 * @return {Object} value associated with generated hash
 * @api public
 */
SuperHash.prototype.get = function get() {
  var hash = mkhash.apply(this, arguments);

  return this.store[hash] ? this.store[hash][1] : undefined;
};

/**
 * Tells whether or not value associated with the hash generated from the keys is in the map
 *
 * @param {...*} keys - Used to generate a hash for lookup
 * @return {Boolean} true if generated hash is in the map
 * @api public
 */
SuperHash.prototype.has = function has() {
  var key = mkhash.apply(this, arguments);

  return key in this.store;
};

SuperHash.prototype.keys = function keys() {
  var _keys = [];
  for (var hash in this.store) {
    if (this.store.hasOwnProperty(hash)) {
      _keys.push(this.store[hash][0]);
    }
  }
  return _keys;
};

SuperHash.prototype.entries = function entries() {
  var _entries = [];
  for (var hash in this.store) {
    if (this.store.hasOwnProperty(hash)) {
      _entries.push(this.store[hash]);
    }
  }
  return _entries;
};

SuperHash.prototype.values = function values() {
  var _values = [];
  for (var hash in this.store) {
    if (this.store.hasOwnProperty(hash)) {
      _values.push(this.store[hash][1]);
    }
  }
  return _values;
};

/**
 * Loops through each value in the hashmap passing it as the first argument in callack
 *
 * ```js
 * hashMap.forEach(function(value){
 *   
 * });
 * ```
 * 
 * @param  {Function} cb      callback function called with `(key, value)` for each entry in the map
 * @param  {*}   `this` context for the callback 
 * @api public
 */
SuperHash.prototype.forEach = function forEach(cb, thisArg) {
  thisArg = thisArg || this;
  for (var hash in this.store) {
    if (this.store.hasOwnProperty(hash)) {
      cb.call(thisArg, this.store[hash][1], this.store[hash][0]);
    }
  }
};

/**
 * Removes the hash generated by the keys and the associated value
 *
 * @param {...*} keys - Used to generate a hash for lookup
 * @return {Boolean} whether the hash existed or not
 * @api public
 */
SuperHash.prototype.delete = function() {
  var key = mkhash.apply(this, arguments);

  if (!this.store[key]) {
    return false;
  }
  return delete this.store[key];
};

SuperHash.prototype.clear = function clear() {

};

module.exports = SuperHash;