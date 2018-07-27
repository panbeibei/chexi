import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Detail from '../components/component/detail'
import ImgList from '../components/component/imgList'
import CarQuestion from '../components/component/CarQuestion'
import Official from '../components/component/official'
import ImgList_detail from '../components/component/imgList_detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/imgList',
      name: 'imgList',
      component: ImgList
    },
    {
      path: '/carQuestion',
      name: 'CarQuestion',
      component: CarQuestion
    },
    {
      path: '/official',
      name: 'official',
      component: Official
    },
    {
      path: '/imgList_detail',
      name: 'imgList_detail',
      component: ImgList_detail
    }
  ]
})
