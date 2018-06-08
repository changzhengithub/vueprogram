<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	import {mapMutations} from 'vuex'
export default {
  name: 'App',
  data(){
  	return{
  	}
  },
  mounted(){
  },
  methods:{
  	...mapMutations(['changeRoute']),
  },
  watch:{  
    '$route'(to, from){
    	this.changeRoute(from.path);
    }  
	},
	
}
</script>
<style scoped="scoped" lang="less">
@import 'assets/common.less';
#app {
	height: 100%;
}
</style>
