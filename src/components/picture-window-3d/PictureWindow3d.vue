<template>
  <div>
    <!--<h3>{{title}}</h3>-->
    <div class="container">
      <div class="picture-container">
        <div class="section section-1" id="pic1">
        </div>
      </div>
  
      <!-- <div class="test">
              <div class="before">正面</div>
              <div class="after">背面</div>
            </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '图片切换动画'
    }
  },
  mounted() {
    var PictureMove = function (selector, params) {

      //getComputedStyle 方法的兼容性处理
      if (!window.getComputedStyle) {
        window.getComputedStyle = function (el) {
          this.el = el;
          this.getPropertyValue = function (prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop === 'float')
              prop = 'styleFloat';
            if (re.test(prop)) {
              prop = prop.replace(re, function () {
                return arguments[2].toUpperCase();
              });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
          }
          return this;
        }
      }

      function _isFunction(fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
      }

      var _this = this;

      /**
       * 默认参数
       * @param  {Number} row                   一行有多少小图片
       * @param  {Number} column                一列有多少小图片
       * @param  {Number} intervalTime          设置几层、背景
       * @param  {Array[Object]} animateQueue   index:起始位置 direction:方向
       */
      var defaults = {
        row: 4,
        column: 4,
        backgroundURL: [],
        intervalTime: 500,
        animateQueue: [{ index: 13, direction: 'left' }, { index: 29, direction: 'right' }, { index: 28, direction: 'right' }],
        starTime: 2000,
        callBack: null

      }

      params = params || {};
      for (var prop in defaults) {
        if (prop in params && typeof params[prop] === 'object') {
          for (var subProp in defaults[prop]) {
            if (!(subProp in params[prop])) {
              params[prop][subProp] = defaults[prop][subProp];
            }
          }
        } else if (!(prop in params)) {
          params[prop] = defaults[prop];
        }
      }
      _this.params = params;

      _this.row = _this.params.row;
      _this.column = _this.params.column;
      _this.backgroundURL = _this.params.backgroundURL;
      _this.picContainer = document.getElementById(selector);
      _this.intervalTime = _this.params.intervalTime;
      _this.animateQueue = _this.params.animateQueue;
      _this.starTime = _this.params.starTime;
      _this.callBack = _this.params.callBack;
      _this.currentFloor = 0;
      _this.floors = []
      //给一层创建小图片
      _this.createDebris = function (floor, backgroundURL) {

        var htmlStr = '', columnNum = 0, rowNum = 0;
        for (var i = 0; i < _this.row * _this.column; i++) {
          htmlStr += '<div class="debris"></div>'
        }
        floor.innerHTML = htmlStr;

        _this.debrisEl = floor.getElementsByTagName('div');
        _this.containerWidth = window.getComputedStyle(_this.picContainer).width;
        _this.containerHeight = window.getComputedStyle(_this.picContainer).height;
        _this.debrisWidth = parseInt(_this.containerWidth) / _this.row;
        _this.debrisHeight = parseInt(_this.containerHeight) / _this.column;


        for (let i = 0; i < _this.debrisEl.length; i++) {
          _this.debrisEl[i].style.width = _this.debrisWidth + 'px'
          _this.debrisEl[i].style.height = _this.debrisHeight + 'px'

          if (backgroundURL) {
            _this.debrisEl[i].style.backgroundImage = "url(" + backgroundURL + ")";
          }
          _this.debrisEl[i].style.backgroundSize = _this.containerWidth;

          if (i !== 0 && i % _this.row == 0) {
            rowNum = 0
            columnNum++
          }
          _this.debrisEl[i].style.left = _this.debrisWidth * rowNum + 'px'
          _this.debrisEl[i].style.top = _this.debrisHeight * columnNum + 'px'
          _this.debrisEl[i].style.backgroundPosition = -_this.debrisWidth * rowNum + 'px ' + -_this.debrisHeight * columnNum + 'px'
          rowNum++
        }
      }

      _this.animateStart = function () {

        _this.animate();

      }

      _this.createFloor = function () {

        var floor;
        for (var i = 0; i < _this.backgroundURL.length; i++) {
          floor = document.createElement('div')

          if (i & 1 !== 0) {
            floor.className = 'pic-floor back pic-floor-' + (i + 1);
          } else {
            floor.className = 'pic-floor pic-floor-' + (i + 1);
          }

          floor.style.zIndex = _this.backgroundURL.length - i;
          _this.picContainer.appendChild(floor);
          _this.createDebris(floor, _this.backgroundURL[i])
          _this.floors.push(floor)
        }
        setTimeout(function () {
          _this.animateStart()
        }, 2000)

      }

      //递归遍历dom的上下左右四个元素，然后隐藏
      _this.animate = function () {

        var s = 0;

        debrisAnimate(_this.animateQueue[_this.currentFloor].index, _this.animateQueue[_this.currentFloor].direction)

        function debrisAnimate(startIndex, direction) {

          var debris = _this.floors[_this.currentFloor].getElementsByTagName('div');

          _this.currentFloor++;


          var startDom = debris[startIndex]
          if (!startDom || startDom.getAttribute('animited') == 'animited') return false;


          function _animate(index) {


            debris[index].setAttribute('animited', 'animited');
            debris[index].className += ' animited';

            var backdebris = _this.floors[_this.currentFloor].getElementsByTagName('div')[index]
                backdebris.className += ' ready'
          }

          //第一步
          _animate(startIndex);
          setTimeout(function () {
            _stepTwo();
          }, _this.intervalTime)


          //第二步
          function _stepTwo() {
            switch (direction) {
              case 'left':
                _animate(startIndex + 1);
                break;
              case 'right':
                _animate(startIndex - 1);
                break;
            }
            setTimeout(function () {
              _stepThree();
            }, _this.intervalTime)
          }

          //第三步
          function _stepThree() {
            var path = [];

            switch (direction) {
              case 'left':
                path.push(startIndex - _this.row);
                path.push(startIndex - _this.row + 1);
                path.push(startIndex - _this.row + 2);
                path.push(startIndex + 2);
                path.push(startIndex + 2 + _this.row);
                path.push(startIndex + 1 + _this.row);
                path.push(startIndex + _this.row);
                break;
              case 'right':
                path.push(startIndex - _this.row);
                path.push(startIndex - _this.row - 1);
                path.push(startIndex - _this.row - 2);
                path.push(startIndex - 2);
                path.push(startIndex - 2 + _this.row);
                path.push(startIndex - 1 + _this.row);
                path.push(startIndex + _this.row);
                break;
            }

            path.forEach(function (c, i) {
              setTimeout(function (s) {
                _animate(c);
                if (i == path.length - 1) {
                  _stepFour()
                }
              }, s * 300, s);
              s++
            })
          }

          //第四步
          function _stepFour() {

            setTimeout(function () {
              for (var i = 0; i < debris.length; i++) {
                (function (n) {
                  setTimeout(function () {
                    _animate(n);
                  }, 1000 * Math.random())

                })(i)
              }
              
              setTimeout(function () {
                if (_this.currentFloor == _this.floors.length) {
                  if (_isFunction(_this.callBack)) {
                    _this.callBack();
                    return false;
                  }
                } else {
                  debrisAnimate(_this.animateQueue[_this.currentFloor].index, _this.animateQueue[_this.currentFloor].direction)
                }

              }, _this.intervalTime * 3)

            }, _this.intervalTime)

          }

        }
      }
      _this.init = function () {
        _this.createFloor();
      }

      _this.init();
    }

    var pic = new PictureMove('pic1', {
      row: 8,
      column: 5,
      backgroundURL: [
        'https://cimg2.res.meizu.com/www/201707/f9CDEF5H4J32M1zxwvSusVlihZabBeTd.jpg',
        'https://cimg2.res.meizu.com/www/201707/fA8D54GHIJ3zMNOyQRtsUqponmlhcdeB.jpg',
        'https://cimg2.res.meizu.com/www/201707/f9CDEF5H4J32M1zxwvSusVlihZabBeTd.jpg',
      ],
      intervalTime: 500,
      animateQueue: [{ index: 13, direction: 'left' }, { index: 28, direction: 'right' }, { index: 20, direction: 'left' }],
      starTime: 1000,
      callBack: function () {
        console.log(123)
      }
    })


  }
}
</script>
<style  lang='scss'>
* {
  padding: 0;
  margin: 0;
}

h1 {
  display: none;
}

.picture-container {
  margin: 20px;
  padding-top: 56.2%;
  height: 0;
  position: relative;
  .section {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    .pic-floor {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0; // background: #000;
    }
    .debris {
      position: absolute;
      width: 25%;
      height: 300px;
      top: 0;
      left: 0; // background: url(../../assets/components/picture-window/images/bg_2.jpg) no-repeat;
      font-size: 50px;
      color: #fff;
      transform: perspective(500px) rotateY(90deg);
      
    }
  }
  .pic-floor-1 {
    .debris {
      transform: perspective(500px) rotateY(0deg);
    }
  }
  .pic-floor {
    .back {
      .debris {
        transform: perspective(500px) rotateY(90deg);
      }
    }
    .animited {
      transform: perspective(500px) rotateY(90deg);
      transition: transform 0.5s ease-in;
    }
     .ready {
      transform: perspective(500px) rotateY(0deg);
      transition: transform 0.5s 0.5s ease-out;
    }
    &.back {
      .animited {
        transition: transform 0.5s;
        transform: perspective(500px) rotateY(90deg);
      }
    }
  }
  .open-left{
    transform-origin: 0% 0%;
  }
}




/*** test ***/

.test {
  width: 200px;
  height: 400px;
  background: deepskyblue;
  margin-left: 200px;
  position: relative;

  div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .before {
    transform: perspective(600px) rotateY(-180deg);
    z-index: 2;
    background: red;
  }
  .after {
    transform: rotateY(-180deg);
    background: green;
  }
}
</style>

