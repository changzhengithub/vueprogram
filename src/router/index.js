import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Cart from '@/components/view/cart/cart'
import Category from '@/components/view/category/category'
import Mine from '@/components/view/mine/mine'
import Detail from '@/components/view/detail/detail'
import Order from '@/components/view/order/order'
import Solts from '@/components/view/solts/solts'
import Address from '@/components/view/address/address'
import Myinfor from '@/components/view/myinfor/myinfor'
import Myorder from '@/components/view/myorder/myorder'
import All from '@/components/view/allorder/all'
import Complete from '@/components/view/allorder/complete'
import Waitpay from '@/components/view/allorder/waitPay'
import Waitrecep from '@/components/view/allorder/waitrecep'
import Waitsend from '@/components/view/allorder/waitsend'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
    	path:'/home',
    	name:'home',
    	component:Index
    },
    {
    	path:'/category',
    	name:'category',
    	component:Category
    },
    {
    	path:'/cart',
    	name:'cart',
    	component:Cart
    },
    {
    	path:'/mine',
    	name:'mine',
    	component:Mine
    },
    {
    	path:'/detail/:id1/:id2',
    	name:'detail',
    	component:Detail,
    },
    {
    	path:'/order',
    	name:'order',
    	component:Order
    },
    {
    	path:'/solts',
    	name:'solts',
    	component:Solts
    },
    {
    	path:'/address',
    	name:'address',
    	component:Address
    },
    {
    	path:'/myinfor',
    	name:'myinfor',
    	component:Myinfor
    },
    {
    	path:'/myorder',
    	name:'myorder',
    	component:Myorder,
    	children:[
			{
				path:'/all',
				name:'all',
				component:All
			},
			{
				path:'/complete',
				name:'complete',
				component:Complete
			},
			{
				path:'/waitpay',
				name:'waitpay',
				component:Waitpay
			},
			{
				path:'/waitrecep',
				name:'waitrecep',
				component:Waitrecep
			},
			{
				path:'/waitsend',
				name:'waitsend',
				component:Waitsend
			},
			]
    },
  ]
})
