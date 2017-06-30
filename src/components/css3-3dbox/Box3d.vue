<template>
  <div>
    <h2>{{title}}</h2>
    <div class="box">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Box3d',
    data(){
      return {
        title:'css3 旋转3D盒子'
      }
    },
    mounted(){

    }
  }

</script>
<style>
.box{
  position: absolute;
  left:50%;
  width:300px;
  height:300px;
  top:50%;
  margin:-150px 0 0 -150px;
  transform-style: preserve-3d;
  transform:  rotateX(30deg) rotateY(30deg);
  animation:boxMove 6s infinite;
}
.box>span{
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  font-size:50px;
  text-align: center;
  line-height:300px;
  background:rgba(141, 214, 249, 0.498039);
  box-sizing:border-box;
  transform-origin: 50% 50%;
  animation:originChange 6s infinite;

}
.box>span:nth-child(1){
  transform: rotateY(0deg) translateZ(150px);
  z-index: 4;
}
.box>span:nth-child(2){
  transform:  rotateY(90deg) translateZ(150px);

}
.box>span:nth-child(3){
  transform:  rotateY(-90deg) translateZ(150px) ;
}
.box>span:nth-child(4){
  transform:  rotateX(0deg) rotateY(-180deg) translateZ(150px) ;
}
.box>span:nth-child(5){
   transform: rotateX(-90deg) translateZ(150px);
 }
.box>span:nth-child(6){
  transform: rotateX(90deg)  translateZ(150px);
}

  @keyframes boxMove {
    0% {
      transform: rotateX(30deg) rotateY(0deg);
    }
    25% {
      transform: rotateX(180deg) rotateY(660deg);
    }
    50% {
      transform: rotateX(260deg) rotateY(120deg);
    }
    75% {
      transform: rotateX(-160deg) rotateY(180deg);
    }
    100% {
      transform: rotateX(30deg) rotateY(0deg);
    }
  }
@keyframes originChange {
  0% {
    transform-origin: 50% 50% 0px;
  }
  25% {
    transform-origin: 50% 50% 100px;
  }
  50% {
    transform-origin: 50% 50% 500px;
  }
  75% {
    transform-origin: 50% 50% -100px;
  }
  100% {
    transform-origin: 50% 50% 0px;
  }
}
</style>
