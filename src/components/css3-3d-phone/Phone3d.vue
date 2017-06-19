<template>
  <div>
    <h2>{{title}}</h2>
    <div class="phone-box">
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
  data(){
    return {
      title:'手机转场动画'
    }
  }
}
</script>
<style>
.phone-box{
  width:600px;
  height:300px;
  position: absolute;
  left:50%;
  top:50%;
  margin:-150px 0 0 -300px;
  /*perspective:110px;*/
  transform-style:preserve-3d;
  transform:rotateX(48deg) rotateY(-20deg) rotateZ(99deg) translateY(-200px);
  animation:originChange 6s infinite;
}
.phone-box>span{
  display:block;
  position: absolute;
  width:100%;
  height:100%;
  background:rgba(12,34,45,.3);
  transform-origin: 50% 50%;
  background-size:100% 100%;
  /*box-sizing:border-box;*/
  /*border:1px solid red;*/
  border-radius: 50px;
}
.phone-box>span:nth-child(1){
  width:600px;
  height:300px;
  background-image:url(../../assets/components/css3-3d-phone/1.jpg);
  transform: translateZ(18px);
}
.phone-box>span:nth-child(2){
  width:36px;
  height:300px;
  /*background-color:red;*/
  transform:rotateY(90deg) translateZ(582px);
  background-image:url(../../assets/components/css3-3d-phone/4.jpg);
}
.phone-box>span:nth-child(3){
  width:36px;
  height:300px;
  transform:rotateY(-90deg) translateZ(18px);
}
.phone-box>span:nth-child(4){
  width:600px;
  height:36px;
  transform:rotateX(90deg) translateZ(18px);
  background-image:url(../../assets/components/css3-3d-phone/3.jpg);
}
.phone-box>span:nth-child(5){
  width:600px;
  height:36px;
  transform:rotateX(-90deg) translateZ(282px);
  background-image:url(../../assets/components/css3-3d-phone/3.jpg);
}
.phone-box>span:nth-child(6){
  width:600px;
  height:300px;
  transform: translateZ(-18px);
  background-image:url(../../assets/components/css3-3d-phone/2.jpg);
}
@keyframes originChange {
  0% {
    transform:rotateX(48deg) rotateY(-20deg) rotateZ(99deg);
  }

  100% {
    transform:rotateX(84deg) rotateY(0deg) rotateZ(0deg) ;
  }
}
</style>
