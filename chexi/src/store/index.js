import Vue from 'vue';
import Vuex from 'vuex';
import ImageList_detail from './module/imgList_detail';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        ImageList_detail
    }
})