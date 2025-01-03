<script setup>
import { reactive, getCurrentInstance,ref } from 'vue'
import { useAllDataStore } from '@/stores';
import { useRouter } from 'vue-router'
import {getMenu} from '../api/mockData/permission'
import { useUserStore } from '../stores/user'
//import {  generateSalt, encryptPassword } from '@/utils/crypto'
const userStore = useUserStore()

const loginForm = reactive({
    username: '',
    password: ''
})
const { proxy } = getCurrentInstance()
const store = useAllDataStore()
const router = useRouter()
/*const getLoginData=async()=>{
    response=await proxy.$api.getLoginData(loginForm);
}*/
const handleLogin = async () => {
   // const salt = generateSalt()
    //const encryptedData = encryptPassword(loginForm.password, salt)
    const res = await proxy.$api.getLoginData(loginForm);
    //router.push('/home');
    console.log('---',res);
    
    if(res.code===200)
    {
        const menuData = await getMenu();
    //console.log(menuData);
     //拿到菜单以后在哪里显示
     store.updateMenuList(menuData.data.menuList)
    store.state.token = menuData.data.token
    store.addMenu(router)
    userStore.setUserId(res.data.id)
    userStore.setUsername(res.data.username)
    //console.log(res.data.username)
    router.push('/home')
    }
    else {
      ElMessage.error(res.message || '登录失败')
    }
}
const handleregister=()=>{
    router.push('/register')
}

</script>

<template>
    <div class="body-login">
        <el-form :model="loginForm" class="login-container">
            <h1>用户登录</h1>
            <el-form-item>
                <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
                <div style="margin-top: 15px;">
                    没有账号？<span @click="handleregister" class="to-register">去注册</span>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>


<style scoped lang="less">
.body-login {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/background.png");
    background-size: 100%;
    overflow: hidden;
}

.login-container {
    width: 300px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    box-shadow: 0 0 25px #cacaca;
    margin: 250px auto;

    h1 {
        text-align: center;
        margin-bottom: 20px;
        color: #505450;
    }

    .el-button {
        width: 300px;
        height: 35px;
    }
    .to-register {
            text-decoration: underline;
            cursor: pointer;
        }

        .to-register:hover {
            color: #80808a;
        }
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>