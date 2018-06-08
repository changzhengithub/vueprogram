<template>
	<mt-header fixed :title="headName">
	  <router-link to="/" slot="left">
	    <mt-button @click="back" icon="back">返回</mt-button>
	  </router-link>
	</mt-header>
</template>

<script>
	export default{
		props:['headName'],
		methods:{
			back(){
				this.$router.go(-1);
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
	
</style>