<template>
  <div>
    <h2>{{title}}</h2>
  
    <tree :treeData="treeData" :extendRender="extendRender"></tree>
  
  </div>
</template>
<script>
import Tree from '../tree';

export default {
  components: { Tree },
  data() {
    return {
      title: 'tree 组件示例',
      vm: null,
      extendRender: (h, params) => {
        return h('span', {
          class: {
            foo: true
          },

        }, [
            h('button',
              {
                class: {
                  'tree-btn': true
                },
                on: {
                  click: () => {
                    this.clickHandler(params)
                  }
                },
              },
              '编辑'
            ),
            h('button',
              {
                class: {
                  'tree-btn': true,
                  'tree-btn-delete': true,
                },
                on: {
                  click: () => {
                    this.clickHandlerDelete(params)
                  }
                },
              },
              '删除'
            ),
            h('button',
              {
                class: {
                  'tree-btn': true,
                  'tree-btn-add': true,
                },
                on: {
                  click: () => {
                    this.clickHandlerAdd(params)
                  }
                },
              },
              '插入'
            ),
          ])
      },

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
  methods: {
    clickHandler(ctx) {
      ctx.vm.node.name = '哈哈哈哈哈哈哈哈哈哈'
    },
    clickHandlerDelete(ctx) {
    
      let vm = ctx.vm;
      const index = vm.index;

      if(!vm.$parent.node){
        this.treeData.splice(index,1)
      }else{
        vm.$parent.node.children.splice(index, 1)
      }
      
    },
    clickHandlerAdd(ctx) {
    
      let vm = ctx.vm;
      const index = vm.index + 1;
      const text = { name: 'lalala,我是卖报的小行家' };

      if(!vm.$parent.node){
        this.treeData.splice(index, 0, text)
      }else{
        vm.$parent.node.children.splice(index, 0, text)
      }

      
    }
  }
}
</script>
<style lang="scss" >
.tree-btn {
  border: 0;
  padding: 3px;
  margin-left: 10px;
  background: deepskyblue;
  color: #fff;
  border-radius: 2px;
  outline-style: none;
  font-size: 10px;
}

.tree-btn-delete {
  background: deeppink;
}

.tree-container {
  margin-left: 100px;
  margin-top: 50px;
}
.tree-node{
  span{
    display: none;
  }
  &.tree-node-hover>span{

    display: inline;
  
  }
}
</style>
