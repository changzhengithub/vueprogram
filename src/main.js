// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
//引入数据交互axios 
import axios from 'axios'

//引入mint-ui 
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
//vue滑块
import VueAwesomeSwiper from 'vue-awesome-swiper'

//300ms点击延迟事件
import fastclick from 'fastclick'

//引入css reset
import '@/assets/css/base.css'
//引入flexible.js
import 'lib-flexible/flexible.js'
//引入vue-touch
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})
VueTouch.config.swipe = {            //配置滑动区域为左滑动，解决和滚动事件的冲突
	direction: 'horizontal',
  	threshold: 200
}
fastclick.attach(document.body);
//
Vue.use(MintUi);
Vue.use(VueAwesomeSwiper);
//挂载在Vue原型上
Vue.prototype.http=axios;
//引入mock.js文件
require('../mock');
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
