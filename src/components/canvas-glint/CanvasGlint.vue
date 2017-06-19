<template>
  <div >
    <h2>{{title}}</h2>
    <div class="canvas-glint">
      <canvas id="canvas" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>

  var smoothTrail = function (c,cw,ch){
    this.init = function(){
      this.loop()
    };

    var _this = this;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.cw = cw;
    this.mx = 0;
    this.my = 0;

    //trail
    this.trail = [];
    this.maxTrail = 200;
    this.mouseDown = false;

    this.ctx.lineWidth = .1;
    this.ctx.lineJoin = 'round';

    this.radius = 1;
    this.speed = 0.4;
    this.angle = 0;
    this.arcx = 0;
    this.arcy = 0;
    this.growRadius = true;
    this.seconds = 0;
    this.milliseconds = 0;

    this.rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};
    this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};

    this.createPoint = function(x, y){
      this.trail.push({
        x: x,
        y: y
      });
    };

    this.updateTrail = function(){

      if(this.trail.length < this.maxTrail){
        this.createPoint(this.arcx, this.arcy);
      }

      if(this.trail.length >= this.maxTrail){
        this.trail.splice(0, 1);
      }
    };

  }

export default {
  name: 'CanvasGlint',
  data() {
    return {
      title:'canvas 闪烁线条'
    }
  },
  mounted(){

  }
};




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
h1, h2 {
  font-weight: normal;
}

.canvas-glint{
  width:100%;
  height:100%;
  background: #000;
  overflow: hidden;
}
canvas {
  display: block;
  margin: 0 auto;
}
</style>
