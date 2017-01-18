(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof exports === 'object') {
    module.exports = factory() // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(factory) // AMD. Register as an anonymous module.
  } else {
    root.CanvasRaster = factory() // Browser globals
  }
})(this, function () {
  function CanvasRaster () {
    var defaultOptions = {
      cellSize: [10, 10]
    }
  }

  CanvasRaster.prototype = {
    constructor: CanvasRaster,

    _init: function () {

    },

    raster: function () {
      
    }
  }

  function loadImage (imageUrl, callback) {
    var img = new Image()
    img.onload = function () {
      callback && callback(img)
    }
    img.crossOrigin = 'anonymous'
    img.src = imageUrl
  }

  return CanvasRaster
})
