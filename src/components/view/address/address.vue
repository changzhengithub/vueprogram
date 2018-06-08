<template>
	<div class="address">
		<!--头部-->
		<Head headName="选择地址"></Head>
		<!--/头部-->
		<transition name="fade">
			<div class="addressMain" v-show="addItemShow">
				<div class="addressItem" v-for="(item,index) in addressItem" @click="selectAddress(index)">{{item}}</div>
			</div>
		</transition>
		<!--底部-->
		<div class="addressAdd" @click="toSolts">
			新增地址
		</div>
		<!--/底部-->
	</div>
</template>

<script>
	import Head from '@/components/common/head/head'
	import {mapState,mapMutations} from 'vuex';
	export default{
		data(){
			return{
				addItemShow:false
			}
		},
		mounted(){
			this.addItemShow=true;
		},
		methods:{
			toSolts(){
				this.$router.push({name:"solts"});
			},
			selectAddress(index){
				if(this.orderItem.length>0){
					this.addtoOrder(index);
					this.$router.push({name:"order"});
				}else{
					return
				}
			},
			...mapMutations(['addtoOrder']),
		},
		computed:{
			...mapState(['orderItem','AddressDetail','addressItem'])
		},
		components:{
			Head,
		},
	}
</script>

<style scoped="scoped" lang="less">
	@import '../../../assets/common.less';
	.address{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.addressMain{
		width: 100%;
		height: 100%;
		padding-top: 40px;
		overflow: auto;
	}
	.addressItem{
		line-height: 60/@rem;
		padding: 20/@rem 50/@rem;
		.font-dpr(14px);
		color: #333;
		border-bottom: 1px solid #ccc;
		margin-top: 30/@rem;
	}
	.addressAdd{
		width: 100%;
		height: 80/@rem;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		line-height: 80/@rem;
		.font-dpr(14px);
		color: #fff;
		background: #26A2FF;
	}
</style>