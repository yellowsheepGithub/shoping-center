//引入二次封装的axios函数
import requests from "./requests";
import mockRequests from "./mockAjax";

//三级联动请求后台数据函数封装，分别暴露，在别的地方引入这个函数并调用就可以向后台请求三级联动的数据
//axios函数的result返回的是一个promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//获取banner（Home首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const getFloorList = () => mockRequests.get('/floor')

//获取搜索模块数据 请求方式：post 参数：需要带参数
//当前这个接口传参数的时候至少是一个空对象
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取商品detail数据
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中（或者更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表数据接口
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//从购物车中删除商品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改商品的选中状态
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
export const reqRegister = (data) => requests({ url: `/user/passport/register`, method: 'post', data })

//登录
export const reqLogin = (data) => requests({ url: `/user/passport/login`, method: 'post', data })

//带着用户token向服务器索要用户信息
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })