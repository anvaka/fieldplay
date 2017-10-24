<template>
  <div class='ruler' :class='{highlighted: highlighted}'>
    <div class='horizontal tick-container'>
      <div class='tick' v-for='tick in hticks' :style='{left: tick.offset}'>{{tick.label}}</div>
    </div>
    <div class='vertical tick-container'>
      <div class='tick' v-for='tick in vticks' :style='{top: tick.offset}'>{{tick.label}}</div>
    </div>
  </div>
</template>
<script>
import bus from '../lib/bus';

  export default {
    name: 'Ruler',
    mounted() {
      bus.on('bbox-change', this.recomupteLabels, this);
    },
    beforeDestroy() {
      bus.off('bbox-change', this.recomupteLabels, this);
    },

    data() {
      return {
        hticks: [],
        vticks: [],
        highlighted: false
      };
    },
    methods: {
      recomupteLabels(bbox) {
        let {minX, minY, maxX, maxY} = bbox;
        if (this.clearHighlight) {
          clearTimeout(this.clearHighlight);
          this.clearHighlight = null;
        }

        
        this.highlighted = true;
        var canvasRect = window.scene.getCanvasRect();
        this.hticks = getHorizontalTicks(canvasRect, minX, maxX);
        this.vticks = getVerticalTicks(canvasRect, minY, maxY);
        this.clearHighlight = setTimeout(() => {
          this.highlighted = false;
          this.clearHighlight = null;
        }, 1500);
      }
    }
  }

function getHorizontalTicks(rect, minX, maxX) {
  var availableWidth = rect.width;
  let ticks = [];
  var tickCount = availableWidth < 600 ? 3 : 10;
  var step = availableWidth/(tickCount);
  let dx = (maxX - minX)/tickCount;

  for (var i = 0; i < tickCount; ++i) {
    ticks.push({
      offset: (rect.left + i * step) + 'px',
      label: formatNumber(dx * i + minX)
    });
  }

  return ticks;
}

function getVerticalTicks(rect, minY, maxY) {
  var availableHeight = rect.height;
  var ticks = [];
  var tickCount = availableHeight < 600? 5 : 10;
  let dy = (maxY - minY)/tickCount;
  var step = availableHeight/tickCount;

  // start from 1 to not overlap with x axis;
  for (var i = 1; i < tickCount; ++i) {
    ticks.push({
      offset: (rect.top + i * step) + 'px',
      label: formatNumber(dy * i + minY)
    });
  }
  return ticks;
}


function formatNumber(x) {
  return x.toFixed(2);
}
</script>
<style lang='stylus'>
vertical-labels-width = 48px;


.ruler {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  color: rgba(153, 197, 241, 0.4);
}

.tick-container {
  position: absolute;
  transition: all .5s;
}

.highlighted .tick-container {
  color: white;
}

.horizontal {
  height: 22px;
  left: 0;
  bottom: 0px;
  right: vertical-labels-width;
  .tick {
    transform: translateX(-50%);
    bottom: 4px;
  }
  .tick:first-child {
    transform: translate(0%);
  }
  .tick:last-child {
    transform: translate(-100%);
  }
}
.tick {
  position: absolute;
}

.vertical {
  right: 0px;
  top: 0;
  bottom: 0;
  width: vertical-labels-width;
  .tick {
    text-align: right;
    right: 0;
    padding-right: 8px;
    transform: translateY(-50%);
  }
}

@media (min-width: 800px) {
  large-screen-vertical-width = 70px;
  .horizontal {
    right: large-screen-vertical-width;
  }
  .vertical {
    width: large-screen-vertical-width;
  }
}

@media (max-width: 800px) {
.horizontal {
  height: 16px;
}
  .tick {
    font-size: 12px;
  }
}


.tracker {
  position: absolute;
  left: -5px;
  top: -5px;
  width: 10px;
  height: 10px;
}
</style>

