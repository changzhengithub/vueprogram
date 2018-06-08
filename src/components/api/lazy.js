import Vue from "vue"
import VueLazyload from 'vue-lazyload'


Vue.use(VueLazyload,{
    preLoad: 1.3,
    error: '../static/img/github.png',
    loading: '../static/img/github.png',
});