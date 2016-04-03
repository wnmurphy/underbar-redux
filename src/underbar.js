(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument.
  _.identity = function (val) {
    return val;
  };

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    if(n>array.length){
      return array;
    }
    return n === undefined ? array[array.length-1] : array.slice(array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (Object.prototype.toString.call(collection) === "[object Object]") {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {

    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    var filteredArray = [];
    _.each(collection, function (element) {
      if (test(element)) {
        filteredArray.push(element);
      }
    });
    return filteredArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    return _.filter(collection, function (element) {
      return test(element) === false;
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    var uniqArray = [];
    array.sort();
    for (var i = 0; i < array.length; i+=1) {
      if (array[i]!==array[i-1]) {
        uniqArray.push(array[i]);
      }
    }
    return uniqArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    var mapped = [];
    _.each(collection, function (element) {
      mapped.push(iterator(element));
    });
    return mapped;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  _.reduce = function (collection, iterator, accumulator) {

    var initializing = arguments.length === 2;

    _.each(collection, function (element) {
      if (initializing) {
        accumulator = element;
        initializing = false;
      } else {
        accumulator = iterator(accumulator, element);
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function (trueSoFar, element) {
      return trueSoFar && iterator(element);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one.
  _.some = function (collection, iterator) {
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function (trueSoFar, element) {
      return trueSoFar || iterator(element);
    }, false);
  };

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function (obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (obj) {
    for (var i = 0; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (!(key in obj)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {

    var alreadyCalled = false;
    var result;

    return function () {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  // Memorize an expensive function's results by storing them.
  _.memoize = function (func) {
    var memoized = {};
    return function () {
      var args = Array.prototype.slice.call(arguments);
      if (memoized[args]) {
        return memoized[args];
      } else {
        memoized[args] = func.apply(this, args);
        return memoized[args];
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function (func, wait) {
    var args = Array.prototype.slice.call(arguments,2);
    setTimeout(function () {
      func.apply(this, args);
    }, wait);
  };

  // Randomizes the order of an array's contents.
  _.shuffle = function (array) {
    var shuffled = array.slice();
    var randomIndex;
    var elementHolder;

    for (var i = 0; i < array.length; i++) {
      randomIndex = Math.round(Math.random() * (array.length-1));
      elementHolder = shuffled[i];
      shuffled[i] = shuffled[randomIndex];
      shuffled[randomIndex] = elementHolder;
    }

    if (shuffled.toString() === array.toString()) {
      return _.shuffle(array);
    }

    return shuffled;
  };
}());
