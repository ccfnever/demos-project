let init;
export default init = function(canvas){
  var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d');

  var canvasWidth = innerWidth,
    canvasHeight = innerHeight;

  var particleArr = [];
  var colors = ['#e50547','#4fffff','#203ee1','#fff23d'];


  //纯色颗粒
  //#e50547 红色


  var imgArr = []
  var imgArrRed = []
  var imgArrYellow = []
  var imgArrBlue = []

  // var img = new Image();
  // 	img.src = 'QQ20161127-0@2x.png'



  //var imgNum = 10;
  //
  //for(var i = 0;i<imgNum;i++){
  //  var img = new Image();
  //  img.src = 'test/'+i+'.png';
  //  imgArr.push(img)
  //}
  //
  //for(var j = 0;j<7;j++){
  //  var img2 = new Image();
  //  img2.src = 'test/'+j+'.png';
  //  imgArrRed.push(img2)
  //}
  //
  //for(var j = 0;j<2;j++){
  //  var img2 = new Image();
  //  var z = 5;
  //  img2.src = 'test/'+(z+j)+'.png';
  //  imgArrYellow.push(img2)
  //}
  //
  //for(var j = 0;j<4;j++){
  //  var img2 = new Image();
  //  var z = 7;
  //  img2.src = 'test/'+(z+j)+'.png';
  //  imgArrBlue.push(img2)
  //}



  init();

  function init(){
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // setInterval(loop,1000/120)
    requestAnimationFrame(loop)
  }

  function loop(){

    requestAnimationFrame(loop)

    //清楚canvas
    // ctx.fillStyle =  "rgba(0,0,0,0.3)";
    // ctx.fillRect(0,0, canvasWidth, canvasHeight);

    ctx.clearRect(0,0, canvasWidth, canvasHeight)
    var colorIndex = parseInt(Math.random()*10)

    var redRandom = parseInt(Math.random()*6)
    var yellowRandom = parseInt(Math.random()*2)
    var blueRandom = parseInt(Math.random()*4)

    // var size = Math.random() *3;

    //随机产生一个粒子
    var particle = new Particle(canvasWidth/2, 690,'#e50547',false,1,1.5,1.5);
    var particle2 = new Particle(canvasWidth/2, 700,'#e50547',false,1,1.5,1.5);
    var particle3 = new Particle(canvasWidth/2, 710,'#e50547',false,1,1.5,1.5);
    var particle4 = new Particle(canvasWidth/2, 720,'#4fffff',false,1,1.5,1.5);


    var particle5 = new Particle(canvasWidth/2.02, 710,'#e50547',false,1,1.5,1.5);
    var particle6 = new Particle(canvasWidth/2.02, 710,'#e50547',false,1,1.5,1.5);
    var particle7 = new Particle(canvasWidth/2.02, 710,'#e50547',false,1,1.5,1.5);
    var particle8 = new Particle(canvasWidth/2.02, 710,'#e50547',false,1,1.5,1.5);

    var particle9  = new Particle(canvasWidth/2.02, 710,'#4fffff',false,2,3,3);
    var particle10 = new Particle(canvasWidth/2.02, 710,'#4fffff',false,2,3,3);
    var particle11 = new Particle(canvasWidth/2.02, 710,'#e50547',false,2,3,3);
    var particle12 = new Particle(canvasWidth/2.02, 710,'#e50547',false,2,3,3);

    particle.xVel  = Math.random()*3-1.5;//水平位置变化量
    particle2.xVel  = Math.random()*3-1.5;//水平位置变化量
    particle3.xVel = Math.random()*0.2-2;//水平位置变化量
    particle4.xVel = Math.random()*0.2+1.5;//水平位置变化量
    // particle4.xVel = 0;//水平位置变化量

    particle5.xVel = Math.random()*1.2-2;//水平位置变化量
    particle6.xVel = Math.random()*1.2-2;//水平位置变化量
    particle7.xVel = Math.random()*1.2-2;//水平位置变化量
    particle8.xVel = Math.random()*1.2-2;//水平位置变化量

    particle9.xVel = Math.random()*1.2+1;;//水平位置变化量
    particle10.xVel = Math.random()*1.2+1;;//水平位置变化量
    particle11.xVel = Math.random()*1.2+1;;//水平位置变化量
    particle12.xVel = Math.random()*1+2;//水平位置变化量



    particleArr.push(particle); //加入数组
    particleArr.push(particle2); //加入数组
    particleArr.push(particle3); //加入数组
    particleArr.push(particle4); //加入数组

    particleArr.push(particle5); //加入数组
    particleArr.push(particle6); //加入数组
    particleArr.push(particle7); //加入数组
    particleArr.push(particle8); //加入数组

    particleArr.push(particle9); //加入数组
    particleArr.push(particle10); //加入数组
    particleArr.push(particle11); //加入数组
    particleArr.push(particle12); //加入数组



    // 绘制数组中的每一个粒子
    for (var i=0; i<particleArr.length; i++) {
      var particle = particleArr[i];
      particle.render();
      // 更新数组中的每一个粒子
      particle.update();
    }
    //clean up
    if (particleArr.length>6000){
      particleArr.splice(0,12);

    }
  }
  //绘色
  function Particle(xPos,yPos,color,img,g,y,x,size){
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
    this.img = img;

    this.yVel = Math.random()* -8;//向量，负值，所以粒子向上运动
    this.xVel = 0;

    this.size = size || 1;

    this.elasticity = Math.random()*0.1 + 0.6;	//弹力系数

    this.down = true; 	//默认向下


    this.gravity = 0.03+Math.random()*0.05;	//增加重力影响

    this.render = function(){

      if (this.color) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.xPos,this.yPos,this.size,0,Math.PI*2,true);
        ctx.fill()

      }else{
        ctx.drawImage(this.img,this.xPos,this.yPos);

      }


    }
    this.update = function(){ //更新
      this.yVel += this.gravity/g;

      if (this.yPos > canvasHeight) {
        this.down = false;
      }


      if (!this.down) {

        if (this.yPos < (700 + (700*(1-this.elasticity)))) {
          this.down = true;
          this.yVel = this.yVel * -0.5
        }else{

          this.yPos -= this.yVel/y;

        }

      }else{
        this.yPos += this.yVel/y;
      }

      this.xPos += this.xVel/x;
    }
  }
}

