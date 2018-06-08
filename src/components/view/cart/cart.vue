<template>
  <div class="cart">
    <!--删除-->
    <div class="delAllbtn">
      <p class="btn" @click="BtnShow">管理</p>
    </div>
    <!--/删除-->
    <mt-header fixed title="购物车"></mt-header>
    <!--内容-->

    <transition name="fade">
      <div class="cartCon" v-show="cartShow">
        <div class="main" :class="{cartMainActive:active}">
          <!--删除按钮-->
          <transition name="delFade">
            <div class="delAlert" v-show="active">
              <p class="btn delBtn" @click="delBtn">删除</p>
              <p class="btn canBtn" @click="canBtn">取消</p>
            </div>
          </transition>
          <!--/删除按钮-->
          <div class="shopItem" v-for="(item,index) in cartItem">
            <input type="checkbox" :checked="item.checkRadio" @click="checked(index)" />
            <img class="shopItem_img" :src="item.GoodsImage" />
            <div class="shopItem_detail">
              <p class="shopItem_title">{{item.GoodsName}}</p>
              <div class="buyNum">
                <img @click="NumPlus(index)" src="/static/img/icon/shop_add.png" />
                <span>{{item.GoodsNum}}</span>
                <img @click="NumReduce(index)" src="/static/img/icon/shop_cut.png" />
              </div>
              <p class="shopItem_price">{{item.GoodsPrice | currency}}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--/内容-->

    <!--价格订单-->
    <div class="costOrder">
      <div class="Allcost">
        <!--<div class="imgBox costImg" @click="changeAllSelected">
					<img v-show="AllselectShow" src="/static/img/icon/radio.png"/>
					<img v-show="!AllselectShow" src="/static/img/icon/radio_select.png"/>
				</div>-->
        <input type="checkbox" :checked="Allcheck" @click="allChecked" />
        <p class="allTotal">合计：{{total | currency}}</p>
      </div>
      <p class="submitOrder" @click="toOrder">提交订单</p>
    </div>
    <!--/价格订单-->
    <Foot :urlRouter="$route.path" :cartNum="cartItem.length"></Foot>
  </div>
</template>

<script>
  import Foot from '@/components/common/foot/foot'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import {
    MessageBox
  } from 'mint-ui';
  import {
    Toast
  } from 'mint-ui';
  import '@/components/api/filter'
  export default {
    data() {
      return {
        cartShow: false,
        selectShow: false,
        AllselectShow: true,
        total: 0,
        Allcheck: false,
        active: false,
      }
    },
    mounted() {
      this.cartShow = true;
	  this.getStorage();
      this.clearRadio();
      this.AllTotal();
    },
    methods: {
      //计算总价格
      AllTotal() {
        this.total = 0;
        this.cartItem.forEach((ele) => {
          if (ele.checkRadio) {
            this.total += (ele.GoodsPrice * ele.GoodsNum);
          }
        });
        this.AllPrice(this.total);
      },
      //单个商品被选中
      checked(index) {
        this.changeCheck(index);
        //判断是否全部选中
        let bool = this.cartItem.every((ele) => {
          return ele.checkRadio == true;
        });
        if (bool) {
          this.Allcheck = true;
        } else {
          this.Allcheck = false;
        }

        this.AllTotal();
      },
      //全部选中
      allChecked() {
        this.Allcheck = !this.Allcheck;
        this.checkAll(this.Allcheck);
        this.AllTotal();
        var storage = localStorage.getItem("shopItem");

      },
      //增加减少商品个数
      NumPlus(index) {
        this.addShop(index);
        this.AllTotal();
      },
      NumReduce(index) {
        this.reduceShop(index);
        this.AllTotal();
      },
      //管理显示
      BtnShow() {
        this.active = !this.active;
      },
      //删除取消
      canBtn() {
        this.active = false;
      },
      //删除商品
      delBtn() {

        if (this.Allcheck) {
          let that = this;
          MessageBox.confirm('确定要删除全部商品?').then(action => {
            that.delAllShop();
			this.setStorage();
			this.getStorage();
            that.AllTotal();
            that.Allcheck = false;
            that.active = false;
          });
          Toast("选中商品已删除");
        } else {
          let bool2 = this.cartItem.some((ele) => {
            return ele.checkRadio == true;
          });
          if (bool2) {
            let that = this;
            MessageBox.confirm('确定要删除选中商品?').then(action => {
              that.delSomeShop();
			  this.setStorage();
			  this.getStorage();
              that.AllTotal();
              that.active = false;
            });
            Toast("选中商品已删除");
          } else {
            Toast("请选择要删除的商品");
          }
        }
      },
      //到订单页面
      toOrder() {
        let bool2 = this.cartItem.some((ele) => {
          return ele.checkRadio == true;
        });
        if (bool2) {
          this.toOrderItem();
          this.$router.push({
            name: 'order'
          });
        } else {
          Toast("你还未选中商品");
        }
      },
      //获取缓存
      getStorage(){
		var shopItem = localStorage.getItem('shopItem');
		console.log(shopItem);
	 },
      ...mapMutations(['changeCheck', 'checkAll', 'AllPrice', 'addShop', 'reduceShop', 'delAllShop', 'delSomeShop',
        'toOrderItem', 'clearRadio','setStorage','getStorage'
      ]),
    },
    computed: {
      ...mapState(['cartItem', 'orderItem'])
    },
    components: {
      Foot,
    }
  }

</script>

<style scoped="scoped" lang="less">
  @import '../../../assets/common.less';
  .cart {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .head {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .cartCon {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .main {
    width: 100%;
    padding-top: 40px;
    padding-bottom: 180/@rem;
    transition: margin-top .5s;
  }

  .cartMainActive {
    margin-top: 80/@rem;
  }

  .shopItem {
    .flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 30/@rem;
    height: 300/@rem;
    .shopItem_img {
      width: 280/@rem;
      height: 280/@rem;
    }
    .shopItem_detail {
      flex: 1;
      height: 100%;
      .shopItem_title {
        height: 80/@rem;
        line-height: 80/@rem;
        .font-dpr(14px);
        color: #333;
        font-weight: bold;
        margin-top: 20/@rem;
      }
      .shopItem_price {
        height: 60/@rem;
        line-height: 60/@rem;
        .font-dpr(14px);
        color: red;
        padding-left: 15/@rem;
      }
      .buyNum {
        .flex;
        align-items: center;
        height: 80/@rem;
        img {
          width: 40/@rem;
          height: 40/@rem;
          margin: 0 15/@rem;
        }
      }
    }
  }

  .imgBox {
    width: 40/@rem;
    height: 40/@rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  /*价格订单*/

  .costOrder {
    .flex;
    padding: 0 30/@rem;
    position: fixed;
    bottom: 100/@rem;
    left: 0;
    justify-content: space-between;
    align-items: center;
    height: 80/@rem;
    background: #6495ED;
    color: #fff;
    .font-dpr(14px);
    .Allcost {
      display: flex;
      align-items: center;
      input {
        margin-right: 20/@rem;
      }
      /*.costImg{
				width: 40/@rem;
				height: 40/@rem;
				margin-right: 20/@rem;
			}*/
    }
  }

  /*删除按钮*/

  .delAllbtn {
    position: absolute;
    top: 25/@rem;
    right: 50/@rem;
    z-index: 12;
  }

  .btn {
    width: 100/@rem;
    height: 50/@rem;
    .font-dpr(12px);
    color: #fff;
    background: #ef4f4f;
    text-align: center;
    line-height: 55/@rem;
    border-radius: 3px;
  }

  .delBtn {
    margin-right: 10/@rem;
  }

  .canBtn {
    background: #CCCCCC;
    margin-left: 10/@rem;
    color: #333;
  }

  .delAlert {
    text-align: center;
    border: 1px solid darksalmon;
    height: 80/@rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 99%;
    margin: 0 auto;
    border-radius: 5px;
    .mint-button {
      margin: 0 10/@rem;
    }
    position:fixed;
    left:0;
    right:0;
    z-index: 0;
    top:40px;
    background: #fff;
  }

  .delFade-enter-active,
  .delFade-leave-active {
    transition: all .5s;
  }

  .delFade-enter,
  .delFade-leave-to {
    transform: translateY(-40px);
  }

</style>
