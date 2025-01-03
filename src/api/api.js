/*整个项目api的统一管理*/
import request from "./request";

//请求数据

export default{
    getPieData(params){
        return request({
            url:"/electricity-record/querybydayofweek",
            method:"get",
            params:{
                userId:params.userId
            }
        })
    },
    getChartData(params){
        return request({
            url:"/electricity-record/querybyrange",
            method:"get",
            params:{
                startDate:params.startDate,
                endDate:params.endDate,
                userId:params.userId
            }
        })
    },
    getAttentionData(){
        return request({
            url:"/user/getAttentionData",
            method:"get",
        })
    },
    getAimData(){
        return request({
            url:"/aim/getAimData",
            method:"get"
        })
    },
    getUserData(data){
        return request({
            url:"/home/getUserData",
            method:"get",
            data,
        })
    },
    getLoginData(data){
        return request({
            url:"/login/",
            method:"post",
            data,
        })
    },
    getsignupData(data){
        return request({
            url:"/sign-up/",
            method:"post",
            data
        })
    },
    /* deleteUser(data){
        return request({
            url:"/user/deleteUser",
            method:"get",
            data,
        })
    },
    addUser(data){
        return request({
            url:"/user/addUser",
            method:"post",
            data,
        })
    },
    editUser(data){
        return request({
            url:"/user/editUser",
            method:"post",
            data,
        })
    },*/
};