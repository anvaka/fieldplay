<template>
    <div class='vector-view'>
    <svg >
      <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="orange" />
        </marker>
      </defs>
      <g>
        <path v-for='vector in vectors' :d='getPath(vector)' stroke-width='1px' stroke='orange' marker-end="url(#arrow)" ></path>
      </g>
    </svg>
  </div>
</template>
<script>
import bus from '../lib/bus';
import {encodeFloatRGBA} from '../lib/utils/floatPacking';

export default {
  name: 'VectorView',
  mounted() {
    bus.on('bbox-change', this.updateVectors, this);
    bus.on('vector-line-ready', this.drawComputedVectors, this);
  },
  beforeDestroy() {
    bus.off('bbox-change', this.updateVectors, this)
    bus.off('vector-line-ready', this.drawComputedVectors, this);
  },
  data() {
    return {
      vectors: []
    }
  },
  methods: {
    getPath(v) {
      return 'M' + v.from_x + ',' + v.from_y + ' L' + v.to_x + ',' + v.to_y;
    },

    updateVectors() {
      var bbox = window.scene.getBoundingBox();
      var sampleCount = 16;// Must be a round square number.
      var dx = Math.abs(bbox.maxX - bbox.minX)/sampleCount;
      var dy = Math.abs(bbox.minY - bbox.maxY)/sampleCount;

      var particleStateX = new Uint8Array(sampleCount * sampleCount * 4);
      var particleStateY = new Uint8Array(sampleCount * sampleCount * 4);

      var i = 0;
      for (var row = 0; row < sampleCount; ++row) {
        for (var col = 0; col < sampleCount; ++col) {
          var x = bbox.minX + col * dx;
          var y = bbox.maxY + row * dy;
          encodeFloatRGBA(x, particleStateX, i * 4);
          encodeFloatRGBA(y, particleStateY, i * 4); 
          i += 1;
        }
      }

      bus.fire('vector-lines-request', {
        x: particleStateX,
        y: particleStateY,
        resolution: sampleCount
      });
    },

    drawComputedVectors(vectorInfo) {
      var sampleCount = vectorInfo.resolution;
      var rect = window.scene.getCanvasRect();
      var {decoded_velocity_x, decoded_velocity_y} = vectorInfo;

      var vectors = [];

      var i = 0;
      for (var row = 0; row < sampleCount; ++row) {
        for (var col = 0; col < sampleCount; ++col) {
          var vx = decoded_velocity_x[i];
          var vy = -decoded_velocity_y[i];
          i += 1;

          var l = Math.sqrt(vx * vx + vy * vy);
          if (l === 0) continue;
          var nx = vx / l;
          var ny = vy / l;

          var x = (sampleCount - 1 - col)/sampleCount;
          var y = row / sampleCount

          var xOffset = rect.left + x * rect.width;
          var yOffset = -rect.top + y * rect.height;

          vectors.push({
            from_x: xOffset,
            from_y: yOffset,
            to_x: xOffset + nx * 15,
            to_y: yOffset + ny * 15,
          });
        }
      }

      this.vectors = vectors;
    }
  }
}

function getValueFromField(col, row, array) {
  return array[col + row * vectorInfo.resolution];
}
</script>


<style lang='stylus'>
.vector-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  svg {
    width: 100%;
    height: 100%;
  }
}

</style>
