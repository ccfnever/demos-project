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
          on: {
            click: () => {
              this.clickHandler(params)
            }
          }
        }, [
            h('a', {
              attrs: {
                href: 'javascript:;'
              }
            }),
            '按钮'
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
    clickHandler(node) {
      console.log(node)
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
