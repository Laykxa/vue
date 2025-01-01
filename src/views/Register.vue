<script>
import { reactive } from 'vue';
const registerForm = reactive({
    username: '',
    password: ''
})
export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        login() {
            this.$router.push('/login');
        },
        register() {
            // 怎么发? 使用 axios 发
            this.$axios.post('/user/register', this.user).then(response => {
                const { data } = response;
                if(data.code === 200){
                    // 注册成功
                    alert('注册成功');
                    this.$router.push('/login');
                }else{
                    alert(data.message);
                }
                console.log(response);
            }).catch(error => {
                console.log("注册请求出错了:", error);
            })
        },
    }
}

</script>
<template>
    <div class="body-register">
        <el-form :model="loginForm" class="register-container">
            <h1>用户注册</h1>
            <el-form-item>
                <el-input type="input" placeholder="请输入账号" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="请输入密码"  ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">注册</el-button>
                <div style="margin-top: 15px;">
                    已有账号？<span @click="login" class="to-login">去登录</span>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>


<style scoped lang="less">
.body-register {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/background.png");
    background-size: 100%;
    overflow: hidden;
}

.register-container {
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
    .to-login {
            text-decoration: underline;
            cursor: pointer;
        }

        .to-login:hover {
            color: #80808a;
        }
    :deep(.el-form-item__content) {
        justify-content: center;
    }
}
</style>