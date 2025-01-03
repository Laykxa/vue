import { defineStore } from "pinia";
import {ref,watch} from 'vue';
import api from '../api/api.js';
import axios from 'axios'

function initState(){
    return {
        isCollapse: false,
        tags:[{
            path:'/home',
            name:'home',
            label:'首页',
            icon:'home',
        },],
        currentMenu:null,
        menuList:[],
        token:"",
        routerList:[],
    };
}
export const useAllDataStore=defineStore('allData',()=>{
    const state=ref(initState());
    watch(state,(newObj)=>{
        if(!newObj.token)return;
        localStorage.setItem("store",JSON.stringify(newObj));
    },
    {deep:true}
);
    function selectMenu(val){
        if(val.name==='home'){
            state.value.currentMenu=null;
        }else{
            state.value.currentMenu=val;
           let index=state.value.tags.findIndex(item=>item.name===val.name)
            index===-1? state.value.tags.push(val) : "";
        }
    }
    function updateTags(tag){
        let index=state.value.tags.findIndex(item=>item.name===tag.name)
        state.value.tags.splice(index,1);
    }
    function updateMenuList(val){
        state.value.menuList=val;
    }
    function addMenu(router,type){
        if(type==='refresh'){
            if(JSON.parse(localStorage.getItem('store'))){
                state.value=JSON.parse(localStorage.getItem('store'))
                state.value.routerList=[];
            }else{
                return
            }
        }
        const menu=state.value.menuList;
        const module=import.meta.glob('../views/**/*.vue');
        const routeArr=[];
        menu.forEach((item)=>{
            if(item.children){
                item.children.forEach(val=>{
                    let url=`../views/${val.url}.vue`;
                    val.component=module[url];
                    routeArr.push(...item.children);
                });
            }else{
                let url=`../views/${item.url}.vue`;
                item.component=module[url];
                routeArr.push(item);
            }
        });
        state.value.routerList=[];
        let routers=router.getRoutes();
        routers.forEach((item)=>{
            if(item.name=='main'||item.name=='login'||item.name=='register'){
                return;
            }else{
                router.removeRoute(item.name);
            }
        });
        routeArr.forEach(item=>{
            state.value.routerList.push(router.addRoute("main",item))
        })
    }
    function clean(){
        state.value.routerList.forEach((item)=>{
            if(item)item();
        });
        state.value=initState();
        //删除本地缓存
        localStorage.removeItem("store");
    }
    async function fetchUsers(name = '', page = 1, limit = 10) {
        try {
          // 发送请求并获取返回结果
          const response = await api.getUserList({
            name,      // 用户名过滤
            page,      // 当前页码
            limit      // 每页显示的数量
          });
    
          // 确保返回的 data 和 list 存在
          if (response && response.list) {
            // 成功获取到数据，更新 state
            state.value.users = response.list;
            console.log(`Fetched ${response.list.length} users`);
          } else {
            console.error("No users data found", response);
          }
        } catch (error) {
          // 捕获任何错误并打印详细信息
          console.error("Full error object:", error);
          if (error.response) {
            console.error("Error response:", error.response);
            if (error.response.data && error.response.data.message) {
              console.error("Error message from response:", error.response.data.message);
            }
          } else {
            console.error("Error message:", error.message);
          }
        }
      }
    
    
      
      async function fetchFollowers(userId) {
        axios.get("http://localhost:8080/follow/getfollowers?userId="+userId, {
            userId
          }).then(res => {
          
            state.value.users = res.data.data??[]
    
          })
        
      }
    
    
    
      async function fetchConversation(receiver_id, sender_id) {
        try {
          axios.get("http://localhost:8080/messages/conversation", {
            receiver_id, sender_id
          }).then(res => {
    
            state.value.currentMessages = res.data??[];
    
          })
          // const response = await api.getConversation( receiver_id,sender_id);
          // state.value.currentMessages = response.data.list;
          // //模拟数据
          // state.value.currentMessages = [
          //   { id: 1, sender_id: sender_id, sender_name: 'John Doe', receiver_id: receiver_id, receiver_name: 'Jane Smith', content: 'Hello!', sent_at: new Date().toISOString().slice(0, 19).replace('T', ' ') },
          //   { id: 2, sender_id: receiver_id, sender_name: 'Jane Smith', receiver_id: sender_id, receiver_name: 'John Doe', content: 'Hi there!', sent_at: new Date().toISOString().slice(0, 19).replace('T', ' ') },
          //   { id: 3, sender_id: sender_id, sender_name: 'John Doe', receiver_id: receiver_id, receiver_name: 'Jane Smith', content: 'How are you?', sent_at: new Date().toISOString().slice(0, 19).replace('T', ' ') }
          // ];
        } catch (error) {
          console.error("Error fetching conversation:", error);
        }
      }
    
      async function sendMessage(receiver_id, sender_id, content) {
        try {
          //const response = await api.sendMessage({ receiver_id, content })
          // if (response.code === 200) {
          //   state.value.currentMessages.push(response.data)
          // }
          axios.get("http://127.0.0.1:8080/api/messages/send", {
            receiver_id, sender_id, content
          }).then(res => {
            debugger
          })
          state.value.currentMessages.push({
            id: state.value.currentMessages.length + 1,
            sender_id: sender_id,
            receiver_id: receiver_id,
            content: content,
            sent_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            is_read: false
          });
          console.log(`Message sent from ${sender_id} to ${receiver_id}: ${content}`);
    
        } catch (error) {
          console.error("Error sending message:", error)
        }
      }
    
      async function markMessageAsRead(message_id) {
        try {
          const response = await api.markMessageAsRead(message_id);
          if (response.code === 200) {
            const message = state.value.currentMessages.find(m => m.id === message_id);
            if (message) message.is_read = true
          }
        } catch (error) {
          console.error("Error marking message as read:", error)
        }
      }
    
      async function deleteMessage(message_id) {
        try {
          const response = await api.deleteMessage({ message_id });
          if (response.code == 200) {
            const index = state.value.currentMessages.findIndex(m => m.id === message_id);
            if (index !== -1) {
              state.value.currentMessages.splice(index, 1);
            }
          }
        } catch (error) {
          console.error("Error deleting message:", error);
        }
      }
      return {
        state, selectMenu, updateTags, updateMenuList, addMenu, clean,
        fetchUsers, fetchConversation, sendMessage, markMessageAsRead, deleteMessage,fetchFollowers
      };
    
})