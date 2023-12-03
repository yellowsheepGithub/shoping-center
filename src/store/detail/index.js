import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    //储存用户id
    uuid_token: getUUID()
};
const actions = {
    //获取商品的信息
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    //将商品添加到购物车中
    //加了async的方法的返回值是一个promise对象
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //点击加入购物车按钮后发请求，前台将参数带给服务器，服务器根据参数渲染购物车里展示的内容
        //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        //因为服务器没有其余数据，因此不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        //成功就返回ok，失败返回提示
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
};
const getters = {
    categoryView(state) {
        //如果不写右边这个空对象，浏览器控制台就会有个不影响程序运行的假报错
        //刚开始state.goodsInfo是一个空对象，所以这个返回值是一个undefined
        //在页面中会出现{{categoryView.xxx}}，所以一开始会报错
        //套路，记下来
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {}
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}