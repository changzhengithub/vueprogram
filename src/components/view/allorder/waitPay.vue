<template>
	<v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
	<transition name="fade2">
	<div class="waitpay" v-show="show">
		<img src="/static/img/github.png"/>
		<p class="title">待支付页面</p>
	</div>
	</transition>
	</v-touch>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				show:false,
			}
		},
		methods:{
			onSwipeLeft(){
				this.$router.push({name:"waitsend"});
				this.changOrderIndex(2);
			},
			//又滑动
			onSwipeRight(){
				this.$router.push({name:"all"});
				this.changOrderIndex(0);
			},
			...mapMutations(['changOrderIndex']),
		},
		mounted(){
			this.show=true;
		}
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
.waitpay{
	width: 100%;
	height: 100%;
	/*box-sizing: border-box;*/
	padding-top:100/@rem ;
	text-align: center;
	img{
		width:200/@rem;
		height: 200/@rem;
		margin:0 auto;
	}
	.title{
		height: 80/@rem;
		line-height: 80/@rem;
		.font-dpr(14px);
		color: #333;
	}
}
</style>