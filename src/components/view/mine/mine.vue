<template>
	<div class="mine">
		<!--头部-->
	  	<mt-header fixed title="我的"></mt-header>	
	  	<!--/头部-->
	  	<transition name="fade">
	  		<div class="mineMain" v-show="mineShow">
	  			<div class="HeadIcon">
	  				<img src="/static/img/github.png"/>
	  				<p class="HeadIcon_title">Open Free Share</p>
	  			</div>
	  			<div class="mineCommon myIntro" @click="toMyinfor">
	  				我的信息
	  			</div>
	  			<div class="mineCommon myOrder" @click="toMyorder">
	  				我的订单
	  			</div>
	  			<div class="mineCommon myAddress" @click="toMyaddress">
	  				我的地址
	  			</div>
	  		</div>
	  	</transition>
		<Foot :urlRouter="$route.path" :cartNum="cartItem.length"></Foot>
	</div>
</template>

<script>
	import Foot from '@/components/common/foot/foot'
	import '@/components/api/filter'
	import {mapState,mapMutations} from 'vuex'
	import { Toast } from "mint-ui";
	export default{
		data(){
			return{
				mineShow:false,
			}
		},
		mounted(){
			this.mineShow=true;
		},
		methods:{
			toMyinfor(){
				this.$router.push({name:"myinfor"});
			},
			toMyorder(){
				this.$router.push({name:"myorder"});
			},
			toMyaddress(){
				this.$router.push({name:"address"});
			}
		},
		computed:{
  			...mapState(['cartItem'])
  		},
		components:{
			Foot
		}
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
.mine{
	width: 100%;
	height: 100%;
}
.mineMain{
	width: 100%;
	height: 100%;
	background: #F5F5F5;
	box-sizing: border-box;
	padding-top: 40px;
}
.HeadIcon{
	width: 100%;
	background: #26A2FF;
	height: 480/@rem;
	text-align: center;
	box-sizing: border-box;
	padding-top: 60/@rem;
	img{
		width: 220/@rem;
		height: 220/@rem;
		margin: 0 auto;
	}
	.HeadIcon_title{
		height: 100/@rem;
		line-height: 100/@rem;
		color: #F5F5F5;
		.font-dpr(14px);
	}
}
.mineCommon{
	width: 100%;
	background: #fff;
	height: 90/@rem;
	line-height: 90/@rem;
	color: #333;
	.font-dpr(14px);
	text-align: left;
	padding-left: 30/@rem;
	margin-bottom: 50/@rem;
}
</style>