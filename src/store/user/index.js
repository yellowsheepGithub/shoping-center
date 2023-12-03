import { reqGetCode } from "@/api"
const state = {
    code: ''
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.data === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}