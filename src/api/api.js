/*整个项目api的统一管理*/
import request from "./request";

//请求数据

export default{
    getChartData(){
        return request({
            url:"/home/getChartData",
            method:"get",
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
    getLoginData(){
        return request({
            url:"/home/getLoginData",
            method:"get",
            data,
        })
    },
    getRegisterData(){
        return request({
            url:"/home/getRegisterData",
            method:"post",
            data,
        })
    },
    getMenu(params){
        return request({
            url:"/permission/getMenu",
            method:"post",
            data:params,
        });
    }
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