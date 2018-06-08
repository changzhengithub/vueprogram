<template>
	<v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
	<transition name="fade2">
	<div class="complete" v-show="show">
		<img src="/static/img/github.png"/>
		<p class="title">已完成页面</p>
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
				this.$router.push({name:"all"});
				this.changOrderIndex(0);
			},
			//又滑动
			onSwipeRight(){
				this.$router.push({name:"waitrecep"});
				this.changOrderIndex(3);
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
.complete{
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