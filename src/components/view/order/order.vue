<template>
	<div class="order">
		<!--头部-->
		<mt-header fixed title="订单详情">
		  <router-link to="/" slot="left">
		    <mt-button @click="back" icon="back">返回</mt-button>
		  </router-link>
		</mt-header>
		<!--/头部-->
		<transition name="fade2">
			<div class="orderMain" v-show="aaa">
				<div class="orderCon">
					<!--内容-->
					<div class="address" @click="toPicker">
						<img class="address_Imgleft" src="/static/img/icon/item_address.png"/>
						<p class="address_orgin">{{AddressDetail}}</p>
						<img  src="/static/img/icon/arrowRight.png"/>
					</div>
					<div class="orderItem" v-for="(v,index) in orderItem">
						<img :src="v.GoodsImage"/>
						<div class="orderItem_detail">
							<p class="orderItem_title">{{v.GoodsName}}</p>
							<p class="orderItem_Num">x{{v.GoodsNum}}</p>
							<p class="orderItem_Price">{{v.GoodsPrice | currency}}</p>
						</div>
					</div>
				</div>
				<!--/内容-->
			</div>
		</transition>
		<!--底部-->
		<div class="order_foot">
			<p class="AllPrice">总金额: <span>{{total | currency}}</span></p>
			<p class="clac" @click="toMyorder">结算</p>
		</div>
		<!--/底部-->
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import { Picker } from 'mint-ui';
	import { Toast } from "mint-ui";
	export default{
		data(){
			return{
				total:0,
				aaa:false,
			}
		},
		mounted(){
			if(this.orderItem.length>0){
				this.total=this.toAllPrice;
				this.aaa=true;
			}
		},
		methods:{
			toPicker(){
				this.$router.push({name:"address"});
			},
			toMyorder(){
				this.$router.push({name:"myorder"});
			},
			back(){
				this.$router.go(-1);
			}
		},
		computed:{
			...mapState(['orderItem','toAllPrice','AddressDetail'])
		},
		components:{
		},
	}
</script>

<style scoped="scoped" lang="less">
	@import '../../../assets/common.less';
	.order{
		height: 100%;
		width: 100%;
	}
	.orderMain{
		width: 100%;
		height: 100%;
	}
	.orderCon{
		width: 100%;
		height: auto;
		padding-top: 40px;
		padding-bottom: 80/@rem;
	}
	.address{
		.flex;
		height: 100/@rem;
		margin-top: 15/@rem;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #ccc;
		align-items: center;
		padding:30/@rem;
		img{
			width: 48/@rem;
			height: 48/@rem;
		}
		.address_orgin{
			flex: 1;
			.font-dpr(14px);
			color: #333;
		}
		.address_Imgleft{
			margin-right: 30/@rem;
		}
	}
	.orderItem{
		.flex;
		height: 260/@rem;
		border-bottom: 1px solid #ccc;
		align-items: center;
		img{
			height: 255/@rem;
			width: 255/@rem;
			margin-right: 20/@rem;
		}
		.orderItem_detail{
			flex: 1;
			height: 80%;
			.orderItem_title{
				height: 80/@rem;
				line-height: 80/@rem;
				.font-dpr(12px);
				font-weight: bold;
				color: #333;
			}
			.orderItem_Num{
				height: 50/@rem;
				line-height: 50/@rem;
				.font-dpr(12px);
				color: #666;
				padding-left: 20/@rem;
			}
			.orderItem_Price{
				height: 50/@rem;
				line-height: 50/@rem;
				.font-dpr(12px);
				color: red;
				padding-left: 20/@rem;
			}
		}
	}
	.order_foot{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 80/@rem;
		background: #26A2FF;
		.flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30/@rem;
		.font-dpr(12px);
		color: #fff;
	}
</style>