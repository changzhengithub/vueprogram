const mutations={
	//清空所有checkRadio
	clearRadio(state){
		state.cartItem.forEach((ele)=>{
			ele.checkRadio=false;
		});
	},
	//点击把某个商品添加到购物车
	addShopTo(state,shop){
		state.cartItem.push(shop);
	},
	//改变checkRadio值
	changeCheck(state,index){
		state.cartItem[index].checkRadio=!state.cartItem[index].checkRadio;
	},
	//全部选中
	checkAll(state,n){
		if(n){
			state.cartItem.forEach((ele)=>{
				ele.checkRadio=true;
			});
		}else{
			state.cartItem.forEach((ele)=>{
				ele.checkRadio=false;
			});
		}
	},
	//总价格
	AllPrice(state,n){
		state.toAllPrice=n;
	},
	//增加减少商品个数
	addShop(state,index){
		state.cartItem[index].GoodsNum++;
	},
	reduceShop(state,index){
		state.cartItem[index].GoodsNum--;
		if(state.cartItem[index].GoodsNum<=1){
			state.cartItem[index].GoodsNum=1;
		}
	},
	//删除全部商品
	delAllShop(state){
		state.cartItem=[];
	},
	//删除商品
	delSomeShop(state){
		let arr=state.cartItem.filter((ele)=>{
			return ele.checkRadio !=true;
		});
		state.cartItem=arr;
	},
	//把商品添加到orderItem
	toOrderItem(state){
		state.orderItem=[];
		state.orderItem=state.cartItem.filter((ele)=>{
			return ele.checkRadio==true;
		});
	},
	//详情页添加到订单
	addOrderItem(state,shop){
		state.orderItem=[];
		state.orderItem.push(shop);
		state.toAllPrice=shop.GoodsNum*shop.GoodsPrice;
	},
	//地址
	toAddress(state,detailAddress){
		state.addressItem.push(detailAddress.province+"  "+detailAddress.city+"  "+detailAddress.country+"  "+detailAddress.details);
	},
	//添加地址到订单页
	addtoOrder(state,index){
		state.AddressDetail=state.addressItem[index];
	},
	//改变路由
	changeRoute(state,path){
		state.pathRoute=path;
	},
	//改变购物车
//	changecartNum(state){
//		state.cartBool==true;
//	},
	//改变订单下标
	changOrderIndex(state,n){
		state.orderIndex=n;
	},
	// 设置缓存
	setStorage(state){
		localStorage.setItem("shopItem",JSON.stringify(state.cartItem));
	},
	// 获取缓存
	getStorage(state){
		var shopItem = localStorage.getItem('shopItem');
		console.log(JSON.parse(shopItem));
		if(shopItem == null){
			var shopInfo = [];
			localStorage.setItem('shopItem',JSON.stringify(shopInfo));
		}else{
			state.cartItem = JSON.parse(shopItem);
		}
		
	}
}
export default mutations;
