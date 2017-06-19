import Vue from 'vue';
import Router from 'vue-router';
import DemoList from '@/components/demo-list';
import CanvasGeyser from '@/components/canvas-geyser/CanvasGeyser.vue';
import CanvasGlint from '@/components/canvas-glint/CanvasGlint.vue';
import Box3d from '@/components/css3-3dbox/Box3d.vue';
import Phone3d from '@/components/css3-3d-phone/Phone3d.vue';
import ThreeGeometry from '@/components/three-geometry';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/canvas-geyser',
      name: 'CanvasGeyser',
      component: CanvasGeyser,
    },
    {
      path: '/canvas-glint',
      name: 'CanvasGlint',
      component: CanvasGlint,
    },
    {
      path: '/css3-3dbox',
      name: 'Box3d',
      component: Box3d,
    },
    {
      path: '/css3-3d-phone',
      name: 'Phone3d',
      component: Phone3d,
    },
    {
      path: '/three-geometry',
      name: 'ThreeGeometry',
      component: ThreeGeometry,
    },
    {
      path: '/',
      name: 'DemoList',
      component: DemoList,
    },
  ],
});
