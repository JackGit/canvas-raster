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
    this.options = defaultOptions
    this.cells = []
    this.canvas = null
    this.context = null
  }

  CanvasRaster.prototype = {
    constructor: CanvasRaster,

    _init: function () {

    },

    _createCells: function () {
      var cellWidth = this.options.cellSize[0]
      var cellHeight = this.options.cellSize[1]
      var wCount = Math.ceil(this.canvas.width / cellWidth)
      var hCount = Math.ceil(this.canvas.height / cellHeight)
      var x
      var y

      for (var i = 0; i < hCount; i++) {
        for (var j = 0; j < wCount; j++) {
          this.cells.push({
            x: x = j * cellWidth,
            y: y = i * cellHeight,
            color: this._getColor(x, y, cellWidth, cellHeight)
          })
        }
      }
    },

    _getColor: function (x, y, w, h) {
      var data = this.context.getImageData(x, y, w, h).data
      var color = getAverageColor(data)
      return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'
    },

    _drawCell: function (cell) {

    },

    _gridding: function () {

    },

    raster: function () {

    }
  }

  function drawRect (ctx, x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }

  function getAverageColor (imageData, opt) {
    var options = {
      calculateAlpha: (opt && typeof opt.calculateAlpha === 'boolean') ? opt.calculateAlpha : true
    }
    var sum = {r: 0, g: 0, b: 0}
    var data = imageData.data ? imageData.data : imageData
    var length = data.length
    var totalPixel = length / 4
    var opacity = 1

    for (var i = 0; i < length; i += 4) {
      if (options.calculateAlpha) {
        opacity = data[i + 3] / 255
      }
      sum.r += data[i] * opacity
      sum.g += data[i + 1] * opacity
      sum.b += data[i + 2] * opacity
    }
    return {
      r: Math.round(sum.r / totalPixel),
      g: Math.round(sum.g / totalPixel),
      b: Math.round(sum.b / totalPixel)
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
