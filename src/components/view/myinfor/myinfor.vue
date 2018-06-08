<template>
	<div class="myinfor">
		<Head class="head" headName="个人信息"></Head>
		<transition name="fade2">
		<div class="myinforMain" v-show="show">
			<div class="myHead">
				<img src="/static/img/github.png"/>
				<p class="userName">会员名：chang辰</p>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
	import Head from '@/components/common/head/head'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		data(){
			return{
				show:false
			}
		},
		mounted(){
			this.show=true;
		},
		computed:{
		},
		components:{
			Head
		},
		
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
.myinfor{
	width: 100%;
	height: 100%;
}
.myinforMain{
	width: 100%;
	height: 100%;
	text-align: center;
	background: #F2F2F2;
	padding-top: 200/@rem;
}
.myHead{
	width: 100%;
	img{
		width: 150/@rem;
		height: 150/@rem;
		margin:0 auto;
	}
}
</style>