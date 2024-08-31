import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShotCart from '@/pages/ShopCart'
//路由配置信息
export default [
    {
        path: '/shopcart',
        name: 'ShopCart',
        // component: () => import(/*webpackChunkName: "shopCart"*/'@/pages/ShopCart/index.vue'),
        component: ShopCart,
        meta: { isShow: true }
    },
    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: AddCartSuccess,
        meta: { isShow: true }
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { isShow: true }
    },
    {
        path: '/home',
        component: Home,
        meta: { isShow: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { isShow: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { isShow: false }
    },
    {
        //keyword后面的问号代表这params参数可传可不传
        path: '/search/:keyword?',
        component: Search,
        meta: { isShow: true },
        name: 'search'
    },
    //重定向,能够确保启动时的URL就是首页
    {
        path: '*',
        redirect: '/home'
    }
]