<template>
	<div class="solts">
		<Head headName="添加地址"></Head>
		<!--<mt-header fixed title="添加地址"></mt-header>-->
		<!--三级联动-->
		<transition name="fade2">
			<div class="alertSolt" v-show="soltShow">
				<div class="address_name">
					<p class="selectName_title">请选择地址：</p>
				</div>
				<mt-picker class="picker_solt" :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
				<textarea class="detailAdd" v-model="detail" name="detailAdd" rows="3" cols="30" placeholder="请输入详细地址"></textarea>
				<p class="selectName_title">详细地址：</p>
				<p class="selectName">{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}} {{detail}}</p>
				<div class="addressBtn" @click="canelbtn">确认地址</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import Head from '@/components/common/head/head'
	import myaddress from '@/assets/json/solts.json';
	import {mapState,mapMutations} from 'vuex'
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				detail:"",
				soltShow:false,
				detailAddress:{},
				myAddressSlots: [
				   {
				   flex: 1,
				   defaultIndex: 1, 
				   values: Object.keys(myaddress), //省份数组
				   className: 'slot1',
				   textAlign: 'center'
				   }, {
				   divider: true,
				   content: '--',
				   className: 'slot2'
				   }, {
				   flex: 1,
				   values: [],
				   className: 'slot3',
				   textAlign: 'center'
				   },
				   {
				   divider: true,
				   content: '--',
				   className: 'slot4'
				   },
				   {
				   flex: 1,
				   values: [],
				   className: 'slot5',
				   textAlign: 'center'
				   }
				  ],
				  myAddressProvince:'省',
				  myAddressCity:'市',
				  myAddresscounty:'区/县',
			}
		},
		mounted(){
			this.soltShow=true;
			//三级联动
			this.$nextTick(() => { 
			    this.myAddressSlots[0].defaultIndex = 0 
			});
		},
		methods:{
			//三级联动
			onMyAddressChange(picker, values) {
			    if(myaddress[values[0]]){
				    picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
				    picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
				    this.myAddressProvince = values[0];
				    this.myAddressCity = values[1];
				    this.myAddresscounty = values[2];
			    }
			},
			canelbtn(){
				if(this.detail==""){
					Toast("请添加详细地址");
				}else{
					let that=this;
					this.detailAddress.province=this.myAddressProvince;
					this.detailAddress.city=this.myAddressCity;
					this.detailAddress.country=this.myAddresscounty;
					this.detailAddress.details=this.detail;
					MessageBox.confirm('确认添加地址').then(action => {
						that.toAddress(that.detailAddress);
						that.$router.go(-1);
					});
				}
			},
			back(){
				this.$router.go(-1);
			},
			...mapMutations(['toAddress']),
		},
		components:{
			Head
		},
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
	.solts{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.detailAdd{
		display: block;
		width: 96%;
		margin: 50/@rem auto;
		height: 180/@rem;
		border: 1px solid #ccc;
		box-sizing: border-box;
		padding: 10/@rem 20/@rem;
		line-height: 50/@rem;
		border-radius: 3px;
		
	}
	/*三级联动*/
	.alertSolt{
		width: 100%;
		margin-top: 40px;
		padding:0 50/@rem;
		background: #fff;
		position: fixed;
		top: 0px;
		left: 0;
		.address_name{
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			background: #fff;
			z-index: 99;
			padding: 0 80/@rem;
		}
	}
	.selectName{
		padding-left: 30/@rem;
		height: 240/@rem;
		line-height: 80/@rem;
		.font-dpr(14px);
	}
	.selectName_title{
		height: 100/@rem;
		line-height: 100/@rem;
		.font-dpr(16px);
		font-weight: bold;
		color: #333;
	}
	.addressBtn{
		width: 96%;
		height: 80/@rem;
		background: #ccc;
		color: #333;
		text-align: center;
		line-height: 80/@rem;
		.font-dpr(16px);
		margin: 0 auto;
		border-radius: 5px;
		/*margin-top: 50/@rem;*/
	}
	div.picker-slot{
		font-size: 12px;
	}
</style>