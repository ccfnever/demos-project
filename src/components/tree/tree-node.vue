<template>
  <div :class="{'drop-top-enter':dropTopEnterColor,'drop-enter':dropEnterColor}">
    <div class="tree-node-top" @dragover.prevent @drop.stop="handleDropTop" @dragenter.stop="handleDragEnterTop" @dragleave.stop="handleDragLeaveTop"></div>
    <div class="tree-node" :draggable="!!node.name" :tree-id="node.id" @dragover.prevent @dragstart.stop="handleDragStart" @drop.stop="handleDrop" @dragenter.stop="handleDragEnter" @dragleave.stop="handleDragLeave">
      -- {{ node.name }} {{node.id}}
      <extend :render="expandRender" :vm="expandVm"></extend>
      <div class="tree-node-children">
        <tree-node v-for="(child,index) in node.children" :vm='vm' :treeData="treeData" :extendRender="extendRender" :node="child" :key="index" :index='index'>
        </tree-node>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../event-bus';
import TreeNode from './tree-node';

var Extend = {
  // name: 'extend',//可选
  functional: true, //重要，让组件无状态、无自身作用域 https://cn.vuejs.org/v2/api/#functional
  props: {  //可选
    render: Function,
    vm: Object,
  },
  render: (h, ctx) => {
    const params = {
      vm: ctx.props.vm
    };
    return ctx.props.render(h,params);
  }
}

export default {
  name: 'tree-node',
  components: { TreeNode, Extend },
  props: {
    extendRender: Function,
    treeData: Array,
    node: Object,
    index: Number,
    vm: Object
  },
  data() {
    return {
      dropTopEnterColor: false,
      dropEnterColor: false
    }
  },
  computed: {
    expandRender() {
      return this.extendRender;
    },
    expandVm(){
      return this;
    }

  },
  methods: {
    
    handleDragStart() {
      bus.$emit('update', this);
    },
    handleDropTop() { //拖到兄弟节点
      if (this.isUnableDrop()) {
        // this.clearAllBgColor();
        return false;
      }
      var index = this.vm.index + 1

      //如果拖动对象是顶级菜单
      if (!this.vm.$parent.node) {
        this.treeData.splice(this.vm.index, 1)//删除原来的
        this.treeData.splice(this.index, 0, this.vm.node);

        //如果拖动对象是顶级菜单
      } else if (!this.$parent.node) {
        this.vm.$parent.node.children.splice(this.vm.index, 1);//删除原来的
        this.treeData.splice(this.index, 0, this.vm.node);
      } else {
        this.vm.$parent.node.children.splice(this.vm.index, 1);//删除原来的
        this.$parent.node.children.splice(this.index, 0, this.vm.node);
      }

      this.dropTopEnterColor = false; //清除提示条样式
    },
    handleDrop() { //拖到子节点
      if (this.isUnableDrop()) {
        // this.clearAllBgColor();
        return false;
      }

      //如果是顶级菜单
      if (!this.vm.$parent.node) {
        this.treeData.splice(this.vm.index, 1)//删除原来的
      } else {
        this.vm.$parent.node.children.splice(this.vm.index, 1);//删除原来的
      }

      //判断,如果有子节点,则插入,如果没有,则设置children再插入
      if (!this.node.children) {
        this.$set(this.node, 'children', [])
      }
      this.node.children.push(this.vm.node);

      this.dropEnterColor = false; //清除提示条样式
    },
    handleDragEnterTop() {

      this.dropTopEnterColor = true;
    },
    handleDragEnter() {
      this.dropEnterColor = true;
    },
    handleDragLeaveTop() {
      this.dropTopEnterColor = false;
    },
    handleDragLeave() {
      this.dropEnterColor = false;
    },
    clearAllBgColor() {
      document.querySelectorAll('.tree-node').style.backgroundColor = ''
      document.querySelectorAll('.tree-node-top').style.backgroundColor = ''
    },
    isUnableDrop() {
      //不能拖到自己、或者自己的子孙上面，不然会报错
      let parent = this
      while (parent) {
        if (this.vm === parent) return true;
        parent = parent.$parent
      }
    },
    handCheckTree() {

      bus.$emit('on-check', this)
    }
  },
  created() {
    // Vue.component('test',{
    //   render:this.render[0].render
    // }).bind(this)
  }
}
</script>
<style scoped>
.tree-node {
  display: block;
  text-align: left;
}


.tree-node-children {
  margin-left: 40px;
}

.tree-node-top {
  height: 5px;
}

.drop-top-enter>.tree-node-top {
  background: deepskyblue;
}

.drop-enter .tree-node {
  background: deepskyblue;
}
</style>
