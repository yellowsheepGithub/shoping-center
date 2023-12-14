import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from "@/api"
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
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
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code === 200) {
            commit('USERLOGOUT')
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
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    USERLOGOUT(state) {
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN')
    }

}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}