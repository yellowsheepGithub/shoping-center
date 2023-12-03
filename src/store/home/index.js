import { reqCategoryList, reqGetBannerList, getFloorList } from "@/api";
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
}
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    //因为请求函数返回的是一个promise对象，我们需要拿到请求成功的结果，所以需要用到await，而有await就必须有async，之后学
    //获取三级联动数据
    async categoryList(context) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            context.commit('CATEGORYLIST', result.data)
        }
    },

    //获取首页轮播图的数据
    async reqGetBannerList(context) {
        //这里用的是mock模拟的数据,所以在浏览器控制台中不会显示这个网络请求
        let result = await reqGetBannerList()
        if (result.code === 200) {
            context.commit('GETBANNERLIST', result.data)
        }
    },

    //获取floor数据
    async getFloorList(context) {
        //这里用的是mock模拟的数据,所以在浏览器控制台中不会显示这个网络请求
        let result = await getFloorList()
        if (result.code === 200) {
            context.commit('GETFLOORLIST', result.data)
        }
    }
}
const mutations = {
    //三级联动
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    //轮播图
    GETBANNERLIST(state, value) {
        state.bannerList = value
    },
    //floor
    GETFLOORLIST(state, value) {
        state.floorList = value
    }

}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}