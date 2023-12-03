import { reqCartList, reqDeleteCartById, reqUpdateChecked } from "@/api"
const state = {
    cartList: [],

}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code === 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    async deleteCart({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async updateChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCARTLIST(state, value) {
        state.cartList = value
    },

}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }

}
export default {
    state,
    actions,
    mutations,
    getters
}