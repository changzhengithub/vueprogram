<template>
	<div class="detail">
		<!--头部-->
		<Head  headName="商品详情"></Head>
		<!--/头部-->
		<transition name="fade">
			<!--内容-->
			<div class="shopMain" v-show="detailShow">
				<img class="main_pic" :src="item.GoodsImage"/>
				<p class="main_title">{{item.GoodsName}}</p>
				<p class="main_price">{{item.GoodsPrice | currency}}</p>
			</div>
			<!--/内容-->
		</transition>
		<!--底部-->
		<div class="foot">
			<div class="cartNum" @click="toCart">
				<img src="/static/img/icon/cart_white.png"/>
				<div class="badge">
					<mt-badge type="error" size="small">{{cartItem.length}}</mt-badge>
				</div>
			</div>
			<div class="cart" @click="addCart">加入购物车</div>
			<div class="order" @click="rightBuy">立即购买</div>
		</div>
		<!--/底部-->
		<!--弹出框-->
		<transition name="fade3">
			<hide v-show="hideShow" :item="item" :btmName="btmName" @close="close" @changOnoff="changOnoff(item)" @addNum="addShop" @reduceNum="reduceShop"></hide>
		</transition>
		<!--/弹出框-->
	</div>
</template>

<script>
	import Head from '@/components/common/head/head'
	import '@/components/api/filter'
	import hide from '@/components/common/add/add'
	import {mapState,mapMutations} from 'vuex'
	import { Toast } from "mint-ui";
	export default{
		data(){
			return{
				detailShow:false,
				hideShow:false,
				n1:0,
				n2:0,
				item:{},
				btmName:"加入购物车",
				path:"",
			}
		},
		mounted(){
			this.detailShow=true;
			this.n1=this.$route.params.id1-1;
			this.n2=this.$route.params.id2-1;
			this.getShopData(this.pathRoute);
//			console.log(this.$route);
		},
		methods:{
			getShopData(path) {
				if(path=="/home"){
					this.http.get('/api/homedata').then((res)=>{
						this.item=res.data.data[this.n1].SalesProduct[this.n2];
					});
				}else{
					this.http.get('/api/categorydata').then((res)=>{
						this.item=res.data.data[this.n1].cart[this.n2];
					});
				}
			},
			//加入购物车
			addCart(){
				this.item.GoodsNum=1;
				this.btmName="加入购物车";
				this.hideShow=true;
			},
			rightBuy(){
				this.item.GoodsNum=1;
				this.btmName="立即购买";
				this.hideShow=true;
			},
			//关闭购物车
			close(){
				this.hideShow=false;
			},
			//点击底部按钮
			changOnoff(shop){
				if (this.btmName=="加入购物车") {
					let arr=[];
			  		this.cartItem.forEach((ele)=>{
			  			arr.push(ele.GoodsName);
			  		});
			  		if (arr.includes(shop.GoodsName)) {
			  			Toast("商品已添加，请勿重复添加");
			  			let that=this;
			  			setTimeout(function(){
			  				that.hideShow=false;
			  			},1000);
			  			return;
			  		}else{
			  			shop.checkRadio=false;
			  			this.addShopTo(shop);
						this.setStorage();
						this.getStorage();
			  			Toast("添加成功");
			  			let that=this;
			  			setTimeout(function(){
			  				that.hideShow=false;
			  			},1000);
			  		}
				} else{
					this.addOrderItem(shop);
					this.$router.push({name:"order"});
					
				}
			},
			//添加减少商品
			addShop(){
				this.item.GoodsNum++;
			},
			reduceShop(){
				this.item.GoodsNum--;
				if(this.item.GoodsNum<=1){
					this.item.GoodsNum=1;
				}
			},
			//进入购物车
			toCart(){
				this.$router.push({name:"cart"});
			},
			...mapMutations(['addShopTo','addOrderItem','setStorage','getStorage']),
		},
		computed:{
		  	...mapState(['cartItem','pathRoute'])
		},
		components:{
			Head,
			hide,
		},
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
.detail{
	width: 100%;
	height: 100%;
	position: relative;
}
.shopMain{
	width: 100%;
	padding: 40px 30/@rem 0 30/@rem;
}
.main_pic{
	width: 600/@rem;
	height: 600/@rem;
	margin: 0 auto;
}
.main_title{
	height: 60/@rem;
	line-height: 60/@rem;
	.font-dpr(14px);
	color:#333;
}
.main_price{
	height: 60/@rem;
	line-height: 60/@rem;
	.font-dpr(14px);
	color:red;
}
.foot{
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 2;
	height: 80/@rem;
	padding: 0 80/@rem;
	.flex;
	background:#6495ED ;
	justify-content: space-between;
	align-items: center;
	color: #fff;
	.font-dpr(12px);
	.cartNum{
		width: 100/@rem;
		position: relative;
		img{
			width: 48/@rem;
			height: 48/@rem;
			margin: 0 auto;
		}
		.badge{
			position: absolute;
			top: -10/@rem;
			right: -10/@rem;
		}
	}
}
/*弹出框*/

</style>