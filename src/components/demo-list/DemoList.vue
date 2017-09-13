<template>
  <div>
    <h1>{{ msg }}</h1>
    <ul class="nav">
      <li><router-link to="canvas-geyser">canvas-geyser</router-link></li>
      <li><router-link to="css3-3dbox">css3-3dbox</router-link></li>
      <li><router-link to="css3-3d-phone">css3-3d-phone</router-link></li>
      <li><router-link to="three-geometry">three-geometry</router-link></li>
      <li><router-link to="picture-window">picture-window</router-link></li>
      <li><router-link to="tree">tree</router-link></li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'DemoList',
    data() {
      return {
        msg: 'Welcome to review the demos',
      };
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }
  .nav{

  }
</style>
