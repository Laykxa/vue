<template>
  <div>
    <el-row gutter={20}>
      <!-- 左侧好友列表 -->
      <el-col :span="6" class="left-panel" style="height:calc(100vh - 120px);background:#e5e5e5;">
        
          <div v-if="users && users.length > 0">
            <div v-for="user in users" :key="user.id" @click="viewMessages(user.id)" class="user-item">
              <div>{{ user.username }}</div>
            </div>
          </div>
          <div v-else>No users available</div>
        
      </el-col>

      <!-- 右侧聊天区域 -->
      <el-col :span="18">
        <el-card v-if="selectedUserId"
          style="border-radius: 10px; padding: 20px; background-color: #f9f9f9; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <div ref="messagesContainer" style="height: calc(100vh - 300px); overflow-y: auto;">
            <div v-for="msg in currentMessages" :key="msg.id"
              :style="msg.senderId == userId ? 'display: flex; justify-content: flex-end; width: 100%; text-align: right; margin-bottom: 15px;' : 'display: flex;justify-content: flex-start; width: 100%;text-align: left; margin-bottom: 15px;'">
              <div
                :style="{ padding: '10px', borderRadius: '10px', backgroundColor: msg.senderId == userId ? '#C5D8EB' : '#C5D8EB' }">
                <div style="font-weight: bold; color: #3366CC; margin-bottom: 5px">{{ msg.senderId == userId ? 'You' :
                  msg.senderName }}:</div>
                <div style="color: #333;margin-bottom: 5px">{{ msg.content}}</div>
                <div style="font-size: 12px; color: #999;">{{ formatDate(msg.sentAt) }}</div>
              </div>
            </div>
          </div>

          <!-- 消息输入框 -->
          <el-input type="textarea" v-model="newMessage" placeholder="Type a message" @keyup.enter="sendMessage"
            style="margin-top: 10px; border-radius: 5px;" clearable></el-input>

          <!-- 发送按钮 -->
          <el-button type="primary" @click="sendMessage" style="margin-top: 10px; border-radius: 5px;">Send</el-button>
        </el-card>
        <div v-else>Select a user to start a conversation.</div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';
import { useUserStore } from '../stores/user'
import api from '@/api/api';
const userStore = useUserStore()
const users = ref([]);
const currentMessages = ref([]);
const currentConversations = ref([]);
const newMessage = ref('');
const messagesContainer = ref(null);
const selectedUserId = ref('');
const username=userStore.username;
const userId1=userStore.userId;
//console.log(userId)
const userId = ref(userId1);
let conversationInterval = null; // 定义计时器变量

const params={
  userId:userStore.userId
}
// 获取用户列表
const fetchFollowers = async (userId) => {
  users.value = (await api.getFollowers(userId)).data;
  selectedUserId.value = users.value[0]??""
};

// 查看某个用户的消息
const viewMessages = async (id) => {
  if (conversationInterval) {
    clearInterval(conversationInterval); // 清除之前的计时器
  }
  await fetchConversation(id);
  selectedUserId.value = id;
  startConversationPolling(); // 启动轮询
};

// 获取对话
// const fetchConversation = async (id) => {

//   currentMessages.value = (
//     await api.getConversation(userId.value, id)).data.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
// };
const fetchConversation = async (id) => {
  let messages = (await api.getConversation(userId.value, id)).data.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));
  messages.forEach(async msg => {
    msg.senderName =(await api.getUser(msg.senderId)).data.username;
  });
  currentMessages.value = messages;
};

// 启动对话轮询
const startConversationPolling = () => {
  conversationInterval = setInterval(async () => {
    await fetchConversation(selectedUserId.value);
  }, 100000);
};



// 发送消息
const sendMessage = async () => {
  if (newMessage.value.trim()) {
    //console.log(selectedUserId.value,userId.value,newMessage.value)
    await api.sendMessage({ 
      receiverId: selectedUserId.value,
      senderId: userId.value,
      content: newMessage.value,
    });
    newMessage.value = '';
    await fetchConversation(selectedUserId.value); // Refresh messages after sending
  }
};

// 格式化日期
const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()} ${d.getDate()}/${d.getMonth() + 1}`;
};

// 监听 currentMessages 的变化，自动滚动到底部
watch(currentMessages, async () => {
  await nextTick(); // 确保 DOM 更新完成
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
});

// 在组件卸载前清除计时器
onBeforeUnmount(() => {
  if (conversationInterval) {
    clearInterval(conversationInterval);
  }
});
// 加载用户和消息
onMounted(async () => {
  await fetchFollowers(userId.value);
  // 默认加载最新对话
  // const route = useRoute();
  // if (route.query.userId) {
  //   await fetchConversation(route.query.userId);
  // }
});
</script>

<style scoped>
.left-panel {
  border-right: 1px solid #ddd;
  height: 100%;
  padding: 20px;
}

.message-input {
  margin-top: 20px;
}

.send-button {
  margin-top: 10px;
}

.message-item {
  margin-bottom: 10px;
}

.user-item>div {
  margin-bottom: 10px;
  cursor: pointer;
}

.user-item:hover {
  background-color: #f4f4f4;
}
</style>