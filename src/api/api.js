/*整个项目api的统一管理*/
import request from "./request";

//请求数据

export default{
    getfollowData(params){
        return request({
            url:"/follow/getfollowers",
            method:"get",
            params:{
                userId:params.userId
            }
        })
    },
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
            url:"/api/home",
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
    getMessages() {
        return request({
            url: "/messages/all",
            method: "get",
        });
    },

    getUserMessages(userId) {
        return request({
            url: `/messages/user/${userId}`,
            method: "get",
        });
    },

    sendMessage(data) {
        return request({
            url: "/messages",
            method: "post",
            data,
        });
    },

    markAsRead(messageId) {
        return request({
            url: `/messages/${messageId}/read`,
            method: "patch",
        });
    },
    getConversation(sender_id, receiver_id) {
        return request({
            url: "/messages/conversation",
            method: "get",
            params: {
                sender_id,
                receiver_id
            }
        });
    },

    async getUserList(params) {
        const response = await request({
            url: "/users", // 请求的接口路径
            method: "get", // 使用 GET 请求
            params, // 使用 params 参数
        });
        // 确保接口返回符合结构：{ code, data: { list, count } }
        return response;
    },

    // 获取对话
    getConversation(senderId, receiverId) {
        return request({
            url: `/messages/conversation?senderId=${senderId}&receiverId=${receiverId}`,
            method: "get",
        });
    },

    // 获取用户列表
    getFollowers(userId) {
        return request({
            url: `/follow/getfollowers?userId=${userId}`,
            method: "get",
        });
    },

    sendMessage(data) {
        return request({
            url: "/messages/send",
            method: "post",
            data,
        });
    },
    
    getUser(userId) {
        return request({
            url: `/user/${userId}`,
            method: "get",
        });
    },

};