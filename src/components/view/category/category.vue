<template>
	<div class="category">
		<!--头部-->
		<mt-header fixed class="head" title="分类"></mt-header>
		<!--内容-->
		<transition name="fade">
			<div class="categoryMain" v-show="cataShow">
				<div class="categoryMain_Nav">
					<div class="navItem" :class="{active:index==index2}" v-for="(item,index) in navData" @click="Tab(index)">{{item.cat_name}}</div>
				</div>
				<div class="categoryMain_Side">
					<div class="sideItem" v-for="(shopItem,index) in sideData" @click="toDetail(index2+1,shopItem.CategoryId)">
						<img :src="shopItem.GoodsImage"/>
						<div class="sideItem_detail">
							<p class="sideItem_title">{{shopItem.GoodsName}}</p>
							<p class="sideItem_Price">{{shopItem.GoodsPrice | currency}}</p>
							<img @click.stop="toCart(shopItem)"  src="/static/img/icon/shop_addCart.png" />
						</div>
					</div>
				</div>
			</div>
		</transition>
		<!--/内容-->
		<Foot :urlRouter="$route.path" :cartNum="cartItem.length"></Foot>
	</div>
</template>

<script>
	import Foot from '@/components/common/foot/foot'
	import '@/components/api/filter'
	import {mapState,mapMutations} from 'vuex'
	import { Toast } from 'mint-ui'
	export default{
		data(){
			return{
				cataShow:false,
				navData:[],
				sideData:[],
				index2:0,
				
			}
		},
		mounted(){
			this.cataShow=true;
			this.getNavData();
			this.getSideData();
//			this.changeRoute("/category");
		},
		methods:{
			//获取分类菜单数据
			getNavData(){
				this.http.get('/api/menudata').then((res)=>{
					this.navData=res.data.data;
				});
			},
			//获取分类详情数据
			getSideData(){
				this.http.get('/api/categorydata').then((res)=>{
					this.sideData=res.data.data[this.index2].cart;
				});
			},
			//切换不同选项卡
			Tab(index){
				this.index2=index;
				this.getSideData();
			},
			//加入购物车
			toCart(shop){
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
			//进入详情页
			toDetail(n1,n2){
				this.$router.push({name:"detail",params:{id1:n1,id2:n2}})
			},
			...mapMutations(['addShopTo','changeRoute','setStorage','getStorage']),
		},
		computed:{
			...mapState(['cartItem','toAllPrice','AddressDetail'])
		},
		components:{
			Foot
		},
	}
</script>

<style scoped="scoped" lang="less">
	@import '../../../assets/common.less';
	.category{
		width: 100%;
		height: 100%;
	}
	.categoryMain{
		width: 100%;
		height: 100%;
		padding-top: 40px;
		padding-bottom: 100/@rem;
		.categoryMain_Side{
			height: 100%;
			margin-left: 28%;
			border-left: 1px solid #ccc;
			/*margin-bottom: 80/@rem;*/
			overflow: auto;
			.sideItem{
				border-bottom: 1px solid #ccc;
				height: 240/@rem;
				align-items: center;
				.flex;
				img{
					width: 215/@rem;
					height: 215/@rem;
					margin-right: 20/@rem;
				}
				.sideItem_detail{
					flex: 1;
					img{
						width: 48/@rem;
						height: 48/@rem;
					}
					.sideItem_title{
						line-height: 50/@rem;
						.font-dpr(12px);
					}
					.sideItem_Price{
						line-height: 70/@rem;
						.font-dpr(12px);
						color: red;
					}
				}
			}
		}
	}
	.categoryMain_Nav{
		position: fixed;
		left: 0;
		top: 80/@rem;
		z-index: 1;
		width:28% ;
		text-align: center;
		.navItem{
			width: 100%;
			text-align: center;
			.font-dpr(14px);
			color: #333;
			height: 100/@rem;
			line-height: 100/@rem;
			background: #fff;
			border-bottom: 1px solid #ccc;
		}
		.active{
			background:#26A2FF;;
			color: #fff;
		}
	}
</style>