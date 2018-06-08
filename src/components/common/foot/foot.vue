<template>
	<div class="footMain">
		<div class="item item_home" :class="{active:urlRouter == '/' || urlRouter == '/home'}" @click="toHome">
			<i class="home" :class="{active:urlRouter == '/' || urlRouter == '/home'}"></i>
			<p class="item_name">首页</p>
		</div>
		<div class="item item_category" :class="{active:urlRouter == '/category'}" @click="toCategory">
			<i class="category" :class="{active:urlRouter == '/category'}"></i>
			<p class="item_name">分类</p>
		</div>
		<div class="item item_cart" :class="{active:urlRouter == '/cart'}" @click="toCart">
			<i class="cart" :class="{active:urlRouter == '/cart'}"></i>
			<p class="item_name">购物车</p>
			<transition name="cartfade">
				<div class="badge" v-show="cartNum_show">
					<mt-badge type="error" size="small">{{cartNum}}</mt-badge>
				</div>
			</transition>
		</div>
		<div class="item item_mine" :class="{active:urlRouter == '/mine'}" @click="toMine">
			<i class="mine" :class="{active:urlRouter == '/mine'}"></i>
			<p class="item_name">会员</p>
		</div>
	</div>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				cartNum_show:false,
			}
		},
		props:['urlRouter','cartNum'],
		mounted(){
		},
		watch:{
			cartNum(){
				if(this.cartNum>0){
					this.cartNum_show=true;
				}else{
					this.cartNum_show=false;
				}
			},
			cartNum_show(){
				if(this.cartNum_show){
					setTimeout(() => {
						this.cartNum_show = false;
					},2000)
				}
			}
		},
		methods:{
        	toHome(){
        		this.$router.push({name:'home'});
        	},
        	toCategory(){
        		this.$router.push({name:'category'})
        	},
        	toCart(){
        		this.$router.push({name:'cart'})
        	},
        	toMine(){
        		this.$router.push({name:'mine'})
        	},
       },
		computed:{
		  	...mapState(['cartItem'])
		},
	}
</script>
<style scoped="scoped" lang="less">
	@import '../../../assets/common.less';
	.footMain{
		position: fixed;
		left: 0;
		bottom: 0;
		background: #F2F2F2;
		height: 100/@rem;
		padding:0;
		.flex;
		justify-content: space-around;
		align-items: center;
		.active{
			background:#D1D1D1;
			.item_name{
				color:#6495ED;
			}
		}
	}
	.item{
		width:25%;
		height:100/@rem;
		position: relative;
		text-align: center;
		i{
			display: block;
			width: 48/@rem;
			height: 48/@rem;
			margin:9/@rem auto 9/@rem auto;
		}
		.item_name{
			height: 34/@rem;
			line-height: 36/@rem;
			.font-dpr(8px);
			color: #333;
		}
	}
	.home{
		background: url(/static/img/icon/tab_home.png) no-repeat;
		background-size: 100% 100%;
	}
	.category{
		background: url(/static/img/icon/tab_category.png) no-repeat;
		background-size: 100% 100%;
	}
	.cart{
		background: url(/static/img/icon/tab_activity.png) no-repeat;
		background-size: 100% 100%;
	}
	.mine{
		background: url(/static/img/icon/tab_member.png) no-repeat;
		background-size: 100% 100%;
	}
	.item_home i.active{
		background: url(/static/img/icon/tab_home_select.png) no-repeat;
		background-size: 100% 100%;
	}
	.item_category i.active{
		background: url(/static/img/icon/tab_category_select.png) no-repeat;
		background-size: 100% 100%;
	}
	.item_cart i.active{
		background: url(/static/img/icon/tab_activity_select.png) no-repeat;
		background-size: 100% 100%;
	}
	.item_mine i.active{
		background: url(/static/img/icon/tab_member_select.png) no-repeat;
		background-size: 100% 100%;
	}
	.badge{
		position: absolute;
		top: 10/@rem;
		right: 30/@rem;
	}
</style>