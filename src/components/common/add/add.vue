<template>
	<div class="alertBox">
		<div class="alertBox_con">
			<div class="alertBox_top">
				<img class="alertBox_pic" :src="item.GoodsImage"/>
				<div class="aleretBox_detail">
					<div class="titleClose">
						<p class="alertBox_title">{{item.GoodsName}}</p>
						<img @click="close" src="/static/img/icon/close.png"/>
					</div>
					<p class="alertBox_price">{{item.GoodsPrice | currency}}</p>
				</div>
			</div>
			<div class="alertBox_middle">
				<p class="buyNum_intro">购买数量</p>
				<div class="buyNum">
					<img @click="addNum" src="/static/img/icon/shop_add.png"/>
					<span>{{item.GoodsNum}}</span>
					<img @click="reduceNum" src="/static/img/icon/shop_cut.png"/>
				</div>
			</div>
			<div class="alertBtm" @click="changOnoff">{{btmName}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['item','btmName'],
		methods:{
			close(){
				this.$emit("close");
			},
			changOnoff(){
				this.$emit("changOnoff");
			},
			addNum(){
				this.$emit("addNum");
			},
			reduceNum(){
				this.$emit("reduceNum");
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
@import '../../../assets/common.less';
.alertBox{
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
	left: 0;
	bottom: 0;
	z-index: 10;
}
.alertBox_con{
	position:relative;
	width: 100%;
	height: 100%;
	.alertBox_top{
		position: absolute;
		bottom: 180/@rem;
		left: 0;
		background: #fff;
		.flex;
		height: 350/@rem;
		justify-content: space-between;
		.alertBox_pic{
			width: 300/@rem;
			height: 300/@rem;
			margin-top: 20/@rem;
			margin-right: 20/@rem;
		}
		.aleretBox_detail{
			flex: 1;
			padding-top: 20/@rem;
			.titleClose{
				.flex;
				justify-content: space-between;
				align-items: center;
				height: 80/@rem;
				padding-right: 50/@rem;
				.alertBox_title{
					color: #333;
					.font-dpr(14px);
					height: 80/@rem;
					line-height: 80/@rem;
				}
				img{
					width: 40/@rem;
					height: 40/@rem;
				}
			}
			.alertBox_price{
				color: red;
				.font-dpr(14px);
				height: 60/@rem;
				line-height: 60/@rem;
			}
		}
	}
	.alertBox_middle{
		.flex;
		background: #fff;
		justify-content: space-between;
		padding: 0 30/@rem;
		align-items: center;
		color: #333;
		.font-dpr(12px);
		position: absolute;
		bottom: 90/@rem;
		left: 0;
		height: 90/@rem;
		border-top:1px solid #ccc;
		.buyNum{
			margin-right: 20/@rem;
			display: flex;
			align-items: center;
			img{
				width: 40/@rem;
				height: 40/@rem;
				margin: 0 15/@rem;
			}
		}
	}
	.alertBtm{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		height: 90/@rem;
		background:#6495ED ;
		text-align: center;
		line-height: 90/@rem;
		color: #fff;
		.font-dpr(14px);
	}
}	
</style>