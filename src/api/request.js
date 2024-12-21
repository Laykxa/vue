import axios from "axios"
import config from '@/config'
import { ElMessage } from "element-plus";
const service=axios.create({
    baseURL:config.baseApi,
});
const NETWORK_ERROR='网络错误'
//添加请求拦截器
service.interceptors.request.use(
    function(config){
        //在发送请求之前做些什么
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

//添加响应拦截器
service.interceptors.response.use(
    (res)=>{
        console.log(res.data)
        const {code,data,msg}=res.data
        if(code===200){
            return data
        }else{
            ElMessage.error(data.message||NETWORK_ERROR);
            return Promise.reject(msg||NETWORK_ERROR);
        }
    }
)

function request(options){
    options.method=options.method ||"get";
    //关于get请求参数的调整
    if(options.method.toLowerCase()==="get"){
        options.params=options.data;
    }
    //对mock的开关做一个处理
    let isMock=config.isMock;
    if(typeof options.mock!=="undefined"){
        isMock=options.mock;
    }
    //不能用mock
    if(config.env==="prod"){
        service.defaults.baseURL=config.baseApi;
    }else{
        service.defaults.baseURL=isMock? config.mockApi:config.baseApi;
    }
    return service(options);
}
export default request;