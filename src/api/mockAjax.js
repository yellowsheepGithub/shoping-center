//对于axios很不熟的时候可以看axios文档一步步跟着敲

//对于axios进行二次封装，主要是给axios加上请求拦截器和响应拦截器
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'



//axios.create方法执行,其实返回一个axios和mockRequests一样的，mockRequests是axios的一个实例
let mockRequests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/mock",
    //超时的设置，当一次请求超过一定时间后就当此次请求失败
    timeout: 5000
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
mockRequests.interceptors.request.use(config => {
    //请求拦截器:请求头【header】,请求头能否给服务器携带参数
    //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数

    //进度条开始
    nprogress.start()
    return config;
});


//响应拦截器：请求数据返回会执行
mockRequests.interceptors.response.use((res) => {
    //res:实质就是项目中发请求、服务器返回的数据

    //进度条结束
    nprogress.done()
    //res是一个promise对象
    return res.data;
}, (err) => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return new Promise();
});

//最后需要暴露:暴露的是添加新的功能的axios,即为mockRequests
export default mockRequests;



