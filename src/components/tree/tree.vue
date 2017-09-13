<template>
  <div>
    <tree-node v-for='(child,index) in treeDataComputed' :treeData="treeData" :extendRender="extendRender" :vm="vm" :node='child' :key='index' :index='index'></tree-node>
  </div>
</template>
<script>

import bus from '../event-bus';
import TreeNode from './tree-node';

export default {
  components:{TreeNode},
  props:{
    treeData:Array,
    extendRender:Function,
  },
  data() {
    return {
      vm:null,

    }
  },
  computed: {

    //给原始 tree 树遍历增加唯一ID
    treeDataComputed() {

      var treeData = this.treeData;
      var lv = 0;
      addTreeId(treeData, lv)

      function addTreeId(data, lv) {
        if (data.length === 0) return;

        if (data.length !== undefined) { //如果data是数组

          data.forEach(function (c, i) {
            var idPrev = lv + '-';
            c.id = idPrev + i;
            if (c.children && c.children.length > 0) {
              addTreeId(c.children, c.id)
            }
          });
          
        }

      }


      return treeData
    }
  },
  mounted() {

    var self = this;
    bus.$on('update', (val) => {
      self.vm = val
    })

  },
  methods:{
   
  }
}
</script>
