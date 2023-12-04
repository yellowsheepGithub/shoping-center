import { reqGetCode, reqRegister, reqLogin } from "@/api"
const state = {
    code: '',
    token: ''
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //注册
    async userRegister({ commit }, data) {
        let result = await reqRegister(data)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录
    async userLogin({ commit }, data) {
        let result = await reqLogin(data)
        if (result.code === 200) {
            commit('USERLOGIN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}