<template>
  <div id="login">
      <div class="login-box">
        <div class="img-box">
            <img src="@/assets/logo.png" alt="">
        </div>
        <form class="login-form" action="" method="get" @submit="submitForm">
          <div class="input-box">
            <input class="form-text" type="text" v-model="loginData.username" 
            autofocus placeholder="请输入您的用户名" required @blur="blurCheck(loginData.username, 0)" :class="{blank:isBlank[0]}">
            <img src="@/assets/img/profile/mine.png" alt="">
          </div>
          <div class="input-box">
            <input class="form-text" type="password" v-model="loginData.password" required 
            @blur="blurCheck(loginData.password, 1)" :class="{blank:isBlank[1]}"> 
            <img src="@/assets/img/profile/mine.png" alt="">
          </div> 
          <div class="form-option">
            <input type="submit" value="登录">
            <input type="reset" value="重置" @click="resetClick">
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import {getLogin} from '@/network/login.js'

export default {
  data() {
    return {
      loginData: {
        username: 'admin',
        password: '123456'
      },
      isBlank: [false, false]
    }
  },
  methods: {
    blurCheck(data, num) { 
      if (!data) {
        this.isBlank.splice(num, 1, true);
      } else {
        this.isBlank.splice(num, 1, false);
      }
    },
    resetClick() {
      this.isBlank = this.isBlank.map(() => false)
      this.loginData.username = '';
      this.loginData.password= ''; 
    },
    submitForm(event) {
      event.preventDefault();
      getLogin(this.loginData)
        .then(res => {
          if(res.meta.status !== 200) {
            this.$toast.show('用户名或密码错误');
          } else {
            console.log('登录成功')
            sessionStorage.setItem("token", res.data.token);
            this.$router.push('/home');
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1); 

#login {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 500px;
  height: 280px;
  background-color: #ffffff;
  border-radius: 5px;
  position: relative;
  .img-box {
      position: absolute;
      width: 120px;
      height: 120px;
      padding: 6px;
      border: 1px solid #eee;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;   
      background-color: #fff;
      box-shadow: @box-shadow;
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;   
    }
  }
  .login-form {
    margin: 20% 15px 0;
    .input-box {
      position: relative;
      img {
        position: absolute;
        top: 10px;
        left: 10px;
        width: 20px;
      }
      .form-text {
      width: 100%;
      margin-bottom: 15px;
      font-size: 15px;
      padding: 12px 12px 12px 35px;
      &:focus {
        outline: none;
      }
    }
  }
    .form-option {
      text-align: right;
      input {
        padding: 10px 25px;
        color: #fff;
        border: none;
        border-radius: 5px;
        box-shadow: @box-shadow;  
      }
      & input:first-child {
        margin-right: 15px; 
        background-color: skyblue;
        outline: 0;
        &:hover {
          background-color: rgb(79, 166, 238);
        }
      }
      & input:last-child {
        background-color: #bbb;
        &:hover {
          background-color: rgb(116, 111, 111);
        }
      }
    }
  }
}
.blank {outline: 1px solid rgb(161, 6, 6);}
</style>