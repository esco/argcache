var mkhash = require('multikey-hash');

/**
 * Creates a new SuperHash
 *
 * @class
 * @api public
 */
function SuperHash() {
  this.store = {};
  this.size = 0;
}

/**
 * Creates a hash from the keys if it doesn't exist and sets the last argument passed in as the value
 *
 * @param {...*} keys - Used to generate hash
 * @param {*} to be associated with the key
 * @return {Number} the hash associated with the keys
 * @api public
 */
SuperHash.prototype.set = function() {
  var len = arguments.length;
  var value = arguments[len-1];
  var keys = new Array(len-1);
  var hash;

  for (var i = 0; i < len-1; i++) {
    keys[i] = arguments[i];
  }

  hash = mkhash.apply(this, keys);
  this.store[hash] = value;
  return this;
};

/**
 * Returns the value associated with the hash generated from the keys
 *
 * @param {...*} keys - Used to generate a hash for lookup
 * @return {Object} value associated with generated hash
 * @api public
 */
SuperHash.prototype.get = function() {
  var key = mkhash.apply(this, arguments);

  return this.store[key];
};

/**
 * Tells whether or not value associated with the hash generated from the keys is in the map
 *
 * @param {...*} keys - Used to generate a hash for lookup
 * @return {Boolean} true if generated hash is in the map
 * @api public
 */
SuperHash.prototype.has = function() {
  var key = mkhash.apply(this, arguments);

  return key in this.store;
};

SuperHash.prototype.keys = function() {

}

SuperHash.prototype.entries = function() {

}

SuperHash.prototype.values = function() {

}

SuperHash.prototype.forEach = function(cb) {

}
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

SuperHash.prototype.clear = function() {

}


module.exports = SuperHash;