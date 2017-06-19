<template>
  <div class="">
    <h1>喷泉</h1>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
  import init from './CanvasGeyser.js';

  export default {
    name: 'CanvasGeyser',
    data() {
      return {};
    },
    mounted(){
      init()
    }
  };

</script>


<style scoped>
  #canvas {
    /*background: url(test/colors_bg.jpg) no-repeat center bottom;*/
    background: #000;
    background-size: 100%;
    margin: 0px;
    overflow: hidden;
    width: 100%;
    height: 1000px;
  }

  .phone {
    width: 540px;
    height: 670px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -270px;
    /*background:url(test/phone.png) no-repeat;*/
    z-index: 9
  }

  #canvas {

  }
</style>
