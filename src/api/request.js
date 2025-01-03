import axios from "axios"
import config from '@/config'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";
const service = axios.create({
    baseURL: '/api',
    timeout: 10000,
});
const NETWORK_ERROR = '网络错误'
//添加请求拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
            //config.headers['token'] = token; // 在每个请求中添加token
        }
        return config;
    }, error => {
        return Promise.reject(error);
    }
);

//添加响应拦截器
service.interceptors.response.use(

    (res) => {
        //console.log('---',res);
        
        if (res.data.code === 200) {
            return res.data
        } else {
            // 检查响应状态
            if (error.response.status === 400) {
                const router = useRouter();
                // 如果未授权，则跳转到登录界面
                localStorage.removeItem('token'); // 清除token
                router.push('/login') // 跳转到登录页面
            }
            return Promise.reject(error);
        }
    }
)

function request(options) {
    options.method = options.method || "get";
    //关于get请求参数的调整
    /*if (options.method.toLowerCase() === "get") {
        options.params = options.data;
    }*/
    //对mock的开关做一个处理
    let isMock = config.isMock;
    if (typeof options.mock !== "undefined") {
        isMock = options.mock;
    }
    //不能用mock
    if (config.env === "prod") {
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
    }
    return service(options);
}
export default request;

