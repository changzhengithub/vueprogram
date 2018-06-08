<template>
	<v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
	<transition name="fade2">
	<div class="all" v-show="show">
		<!--没有数据-->
		<div class="noneData" v-show="nodataShow">
			<img src="/static/img/github.png"/>
			<p class="title">暂无数据，请前往添加</p>
		</div>
		<!--/没有数据-->
		<!--数据传入-->
		<div class="recepData" v-show="recepData">
			<div class="shopItem" v-for="(item,index) in orderItem">
				<div class="orderNumbox">
					<p class="orderNum">订单号xxxxx</p>
					<p class="payOnoff">已支付</p>
				</div>
				<div class="shopCom">
					<img :src="item.GoodsImage"/>
					<div class="orderItem_detail">
						<p class="orderItem_title">{{item.GoodsName}}</p>
						<p class="orderItem_Num">x{{item.GoodsNum}}</p>
						<p class="orderItem_Price">{{item.GoodsPrice | currency}}</p>
					</div>
				</div>
			</div>
		</div>
		<!--/数据传入-->
	</div>
	</transition>
	</v-touch>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default{
		data(){
			return{
				show:false,
				nodataShow:false,
				recepData:false,
			}
		},
		mounted(){
			this.show=true;
			if(this.orderItem.length==0){
				this.nodataShow=true;
				this.recepData=false;
			}else{
				this.recepData=true;
				this.nodataShow=false;
			}
		},
		methods:{
			//左滑动
			onSwipeLeft(){
				this.$router.push({name:"waitpay"});
				this.changOrderIndex(1);
			},
			//又滑动
			onSwipeRight(){
				this.$router.push({name:"complete"});
				this.changOrderIndex(4);
			},
			...mapMutations(['changOrderIndex']),
		},
		computed:{
			...mapState(['orderItem','toAllPrice','AddressDetail'])
		},
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
.all{
	height: 100%;
	width: 100%;
}
.noneData{
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
.recepData{
	width: 100%;
	.orderNumbox{
		.flex;
		height: 100/@rem;
		align-items: center;
		justify-content: space-between;
		padding: 20/@rem 30/@rem 0 30/@rem;
		border-bottom:1px solid #CCCCCC ;
		color: #333;
		.font-dpr(14px);
	}
}
.shopCom{
		.flex;
		height: 260/@rem;
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
</style>