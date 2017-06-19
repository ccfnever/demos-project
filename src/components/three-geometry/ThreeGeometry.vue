<template>
  <div>
    <h2>{{title}}</h2>
    <canvas id="mainCanvas"></canvas>
  </div>
</template>
<script>
  import THREE from '../../libs/three-r80.js';
//  import Init from './threeGeometry.js';
  console.log(THREE)
  export default {
    data(){
      return {
        title:'Three.js 几何模型'
      }
    },
    mounted(){

    }
  }
</script>
<style>

</style>
