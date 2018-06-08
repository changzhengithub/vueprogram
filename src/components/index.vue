<template>
  <div class="index">
  	<!--头部-->
  	<mt-header fixed title="零食商品店"></mt-header>	
  	<!--/头部-->
		<transition name="fade">
			<!--主体内容-->
	  	<div class="main" v-show="mainShow">
	  		<!--轮播图-->
	  		<div class="banner">
	  			<mt-swipe :auto="4000">
					  <mt-swipe-item v-for="(item,index) in bannerData" :key="index">
					  	<img :src="item.img"/>
					  </mt-swipe-item>
					</mt-swipe>
	  		</div>
	  		<!--/轮播图-->
	  		<!--商品列表-->
	  		<div class="shopList">
	  			<!--每一楼层-->
	  			<div class="shopItem" v-for="(item,index) in homedata" :key="index">
	  				<!--楼层头部-->
	  				<div class="shopItem_head">
	  					<p class="shopItem_head_title">{{item.Category.TopText}}</p>
	  					<p class="shopItem_head_floor">{{item.Category.Id}}F</p>
	  				</div>
	  				<!--楼层商品内容-->
	  				<div class="shopItem_mainCon">
	  					<!--每个商品-->
	  					<div class="shopItem_main" v-for="(shop,index) in item.SalesProduct" :key="index" @click="toDetail(item.Category.Id,shop.CategoryId)">
		  					<img class="shopItem_mainImg" v-lazy="shop.GoodsImage"/>
		  					<p class="shopItem_mainTitle">{{shop.GoodsName}}</p>
		  					<div class="pricecart">
		  						<p class="item_price">{{shop.GoodsPrice | currency}}</p>
		  						<img @click.stop="addShop(shop)" src="/static/img/icon/shop_addCart.png"/>
		  					</div>
		  				</div>
	  				</div>
	  			</div>
	  		</div>
	  		<!--/商品列表-->
	  	</div>
	  	<!--/主体内容-->
		</transition>
  	<!--底部-->
  	<Foot :urlRouter="$route.path" :cartNum="cartItem.length"></Foot>
  	<!--/底部-->
  </div>
</template>

<script>
	import Foot from '@/components/common/foot/foot'
	import '@/components/api/filter'
	import '@/components/api/lazy'
	import {mapState,mapMutations} from 'vuex'
	import { Toast } from "mint-ui";
export default {
  data(){
  	return{
  		mainShow:false,
  		bannerData:[],
  		homedata:[],
  	}
  },
  mounted(){
	this.getStorage();
  	this.getBannerData();
  	this.gethomeData();
  	this.mainShow=true;
	
//	this.changeRoute("/home");
  },
  methods:{
  	//获取banner数据
  	getBannerData(){
  		this.http.get('/api/bannerdata').then(res=>{
  			this.bannerData=res.data.data;
  		});
  	},
  	//获取商品数据
  	gethomeData(){
  		this.http.get('/api/homedata').then(res=>{
  			this.homedata=res.data.data;
  		});
  	},
  	//进入详情页
  	toDetail(n1,n2){
  		this.$router.push({name:"detail",params:{id1:n1,id2:n2}});
  	},
  	//添加商品到购物车
  	addShop(shop){
  		let arr=[];
  		this.cartItem.forEach((ele)=>{
  			arr.push(ele.GoodsName);
  		});
  		if (arr.includes(shop.GoodsName)) {
  			Toast("商品已添加，请勿重复添加");
  			return;
  		}else{
  			shop.checkRadio=false;
  			this.addShopTo(shop);
			this.setStorage();
			this.getStorage();
  			Toast("添加成功");
  		}
  	},
  	...mapMutations(['addShopTo','changeRoute','setStorage','getStorage']),
  },
  computed:{
  	...mapState(['cartItem'])
  },
  components:{
  	Foot
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/*引入less 文件必须用相对路径加  ；*/
@import '../assets/common.less';
.index{
	height: 100%;
	width: 100%;
}
.main{
	width: 100%;
	height: 100%;
	overflow: auto;
	padding-top: 40px;
	padding-bottom: 100/@rem;
}
.banner{
	width: 100%;
	height: 366/@rem;
	img{
		width: 750/@rem;
		height: 366/@rem;
	}
}
/*商品列表*/
.shopList{
	width: 100%;
	/*每个楼层*/
	.shopItem{
		width: 100%;
		.font-dpr(14px);
		/*楼层顶部*/
		.shopItem_head{
			height: 80/@rem;
			.flex;
			justify-content: space-between;
			align-items: center;
			padding-left:30/@rem;
			padding-right: 50/@rem;
			border-bottom: 1px solid #ccc;
			border-top: 1px solid #ccc;
			margin-top: 5/@rem;
		}
		/*楼层商品内容*/
		.shopItem_mainCon{
			padding: 30/@rem 0;
			.flex;
			flex-wrap: wrap;
			/*商品内容*/
			.shopItem_main{
				width: 50%;
				height: 428/@rem;
				border-right:1px solid #ccc;
				padding:0 20/@rem;
				.shopItem_mainImg{
					width: 328/@rem;
					height: 328/@rem;
					margin: 0 auto;
				}
				.shopItem_mainTitle{
					width: 100%;
					height: 38/@rem;
					line-height: 38/@rem;
					color: #333;
				}
				.pricecart{
					.flex;
					height: 40/@rem;
					justify-content: space-between;
					margin-top: 22/@rem;
					align-items: center;
					color: red;
					img{
						width: 40/@rem;
						height: 40/@rem;
						margin-right: 20/@rem;
					}
				}
			}
			div.shopItem_main:nth-child(2n){
				border-right:1px solid #fff;
				.shopItem_mainTitle,.pricecart{
					padding-left: 20/@rem;
				}
			}
		}
	}
}
</style>
