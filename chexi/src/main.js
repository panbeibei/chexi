// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelazyload from 'vue-lazyload'
import './scss/_reset.css';
import store from './store/index'
Vue.config.productionTip = false
Vue.use(Vuelazyload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
