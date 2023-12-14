import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(VueRouter)

import store from '@/store';


//重写push方法和replace方法以解决在编程式导航中多次传递同一params参数时浏览器控制台报错问题
//可选重写，不会对程序造成影响
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;


VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})

//全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
    next()
    let token = store.state.user.token

    let name = store.state.user.userInfo.name
    //如果登录了
    if (token) {
        //登陆了不能跳转到login页
        if (to.path === '/login') {
            next('/home')
        } else {
            //登陆了想跳转到除了login以外的其他组件
            if (name) {
                next()
            } else {
                //解决除了首页以外刷新页面用户信息丢失问题
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //用户token失效了
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //如果没有登录
        next()
    }
})

export default router