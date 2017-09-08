<template>
  <div>
    <h2>{{title}}</h2>
  
    <tree-node v-for='(child,index) in treeDataComputed' :vm="vm" :node='child' :key='index' :index='index'></tree-node>
  
  </div>
</template>
<script>

import bus from '../event-bus';

export default {
  data() {
    return {
      title: 'tree 组件示例',
      vm:null,
      treeData: [
        {
          name: '水果',
          children: [
            {
              name: '苹果',
            },
            {
              name: '香蕉',
              children: [
                {
                  name: '臭香蕉',

                },
                {
                  name: '烂香蕉'
                },
                {
                  name: '硬香蕉'
                },
                {
                  name: '软香蕉'
                },
                {
                  name: '长香蕉'
                }
              ]
            }

          ]
        },
        {
          name: '蔬菜',
          children: [
            {
              name: '小白菜',
            },
            {
              name: '萝卜',
              children: [
                {
                  name: '红萝卜',

                },
                {
                  name: '白萝卜'
                }
              ]
            }

          ]
        }

      ]

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
  }
}
</script>
