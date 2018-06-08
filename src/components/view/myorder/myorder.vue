<template>
	<div class="myorder">
		<mt-header title="我的订单">
		  <router-link to="/" slot="left">
		    <mt-button icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<div class="myorderMain">
			<div class="myorderTab">
				<div class="tabCart" @click="tabCart(index)" :class="{active:index==orderIndex}" v-for="(item,index) in tabcon" :key="index">{{item}}</div>
			</div>
				<transition name="fade">
				<div class="children" v-show="show">
					<!--<transition :name="transitionName">-->
						<router-view></router-view>
					<!--</transition>-->
				</div>
				</transition>
		</div>
	</div>
</template>

<script>
	import Head from '@/components/common/head/head'
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				show:false,
				tabcon:["全部","待付款","待发货","待收货","已完成"],
				pathName:["all","waitpay","waitsend","waitrecep","complete"],
				transitionName:'slide-go',
			}
		},
		mounted(){
			this.show=true;
			this.$router.push({name:"all"});
			this.changOrderIndex(0);
		},
		methods:{
			tabCart(index){
				this.changOrderIndex(index);
				this.$router.push({name:this.pathName[this.orderIndex]});
			},
			...mapMutations(['changOrderIndex']),
		},
//		watch:{  
//		    orderIndex(newNum, oldNum){
//		    	console.log(newNum,oldNum);
//			    this.transitionName = newNum > oldNum ? 'slide-go' : 'slide-back';
//		    }  
//		},
		computed:{
		  	...mapState(['orderIndex','orderIndexBool'])
		},
		components:{
			Head,
		},
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
/*@import '../../../assets/css/swiper-3.4.2.min.css';*/
.myorder{
	width: 100%;
	height: 100%;
}
.myorderMain{
	height: 100%;
	width: 100%;
	margin-top: -40px;
	padding-top: 40px;
	display: flex;
	flex-direction: column;
}
.myorderTab{
	.flex;
	justify-content: space-around;
	align-items: center;
	height:80/@rem;
	.tabCart{
		padding: 0 10/@rem;
		height: 100%;
		line-height: 100/@rem;
		.font-dpr(14px);
		color: #333;
	}
	.active{
		border-bottom:1px solid #26A2FF ;
		color: #26A2FF;
	}
}
.children{
	width: 100%;
	flex: 1;
	overflow: auto;
}
</style>