<template>
  <div class="tree-node" :draggable="!!node.name" :tree-id="node.id" @dragover.prevent @dragstart.stop="handleDragStart" @drop.stop="handleDrop" @dragenter.stop="handleDragEnter" @dragleave.stop="handleDragLeave" @dragend.prevent="handleDragEnd">
    -- {{ node.name }} {{node.id}}
    <div class="tree-node-children">
      <tree-node v-for="(child,index) in node.children" :vm='vm'  :node="child" :key="index" :index='index'>
      </tree-node>
    </div>
  </div>
</template>
<script>
import bus from '../event-bus';

export default {
  name: 'tree-node',
  props: {

    node: Object,
    index: Number,
    vm:Object
  },
  data() {
    return {
      dropObj: {},
      targetVm: null,
      newTreeData:[],
      
    }
  },
  computed: {


  },
  methods: {
    clearBgColor() { // 清理样式
      this.$el.style.backgroundColor = '';
    },
    handleDragStart() {
      

      bus.$emit('update', this);

      console.log(this)

      // this.newTreeData = this.treeData;

      // var treeId = this.node.id; //被拖动的节点id
      // var indexArr = treeId.split('-');
      // indexArr.splice(0,1);

      // console.log(indexArr)

      // if(indexArr.length == 1){//首层
      //   this.treeData.splice(indexArr[0], 1)
      // }else{
       
      //   var newIndexArr = []
      //   indexArr.forEach(function(c,i){
      //     if(i&1 == 1 || i == indexArr.length-1){
      //       newIndexArr.push("['children']")
      //     }
      //     newIndexArr.push(`[${c}]`)
      //   });

      //   var str = newIndexArr.join('');
      //   var javacsriptStr = `this.dropObj = this.treeData${str}`;
      //   eval(javacsriptStr);
      //   console.log(this.dropObj)

      // }


      // this.treeData.splice(0, 1)

      // console.log(this.treeData)
      this.$el.style.backgroundColor = 'rgba(0,0,0,0.8)'
    },
    handleDrop() {

      console.log(this.vm)
      this.vm.$parent.node.children.splice(this.vm.index,1);//删除原来的

      var index = this.vm.index + 1


      console.log(this.index)
      this.$parent.node.children.splice(this.index, 0, this.vm.node)

      // console.log(this.node.id)
      this.$el.style.backgroundColor = 'pink'

      console.log(this.treeData)
      // bus.$emit('update', [])
      // debugger
    },
    handleDragEnter() {
      // if (!this.isAllowToDrop) return

      // console.log(this.$el)
      this.$el.style.backgroundColor = 'rgba(0,0,0,0.3)'
    },
    handleDragLeave() {
      this.clearBgColor()
    },
    handleDragEnd() {
      this.clearBgColor()
    },
    
  }
}
</script>
<style scoped>

.tree-node {
  display: block;
}


.tree-node-children {
  margin-left: 120px;
}
</style>
