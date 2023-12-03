import { reqGetSearchInfo } from '@/api'
const state = {
    //这里的初始值不能乱写，要看服务器返回的数据形式决定初始值
    searchList: {}
}
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
//计算属性
// 项目当中getters主要的作用是：简化仓库中的数据
const getters = {
    //形参是当前仓库中的state，而不是大仓库中的那个state
    goodsList(state) {
        //如果网络不给力或者没有网，goodsList返回的是undefined，所以要给个空数组的保障
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}