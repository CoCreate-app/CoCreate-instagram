(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["./client"], function(CoCreateInstagram) {
        	return factory(CoCreateInstagram)
        });
    } else if (typeof module === 'object' && module.exports) {
      const CoCreateInstagram = require("./server.js")
      module.exports = factory(CoCreateInstagram);
    } else {
        root.returnExports = factory(root["./client.js"]);
  }
}(typeof self !== 'undefined' ? self : this, function (CoCreateInstagram) {
  return CoCreateInstagram;
}));