<template>
  <show-form  @closeForm="closeForm" :class="{addUsersList: $store.state.showUsersAddForm}">
    <h3 slot="title">添加用户</h3>
    <form slot="form" action="" @submit="submitForm">
      <div class="text">
        <span class="requireSpan">用户名</span>
        <input type="text" v-model="userInfo.username" @blur="checkUserName" :class="{err: errVertify.username}">
      </div>
      <div class="text">
        <span class="requireSpan">密码</span>
        <input type="password" v-model="userInfo.password" @blur="checkPassWord" :class="{err: errVertify.password}">
      </div>
      <div class="text">
        <span class="requireSpan">邮箱</span>
        <input type="email" v-model="userInfo.email" @blur="checkEmail" :class="{err: errVertify.email}">
      </div>
      <div class="text">
        <span class="requireSpan">手机号</span>
        <input type="tel" v-model="userInfo.mobile" @blur="checkMobile" :class="{err: errVertify.mobile}">
      </div>
      <div class="form-bottom">
        <button @click="closeForm" type="button">取消</button>
        <button>确定</button>
      </div>
    </form>
  </show-form>
</template>

<script>
import ShowForm from 'components/common/ShowForm'

import {addUser} from '@/network/home.js'

export default {
  data() {
    return {
      userInfo: {
        username: '',	
        password: '',	
        email: '',	
        mobile: '',	
      },
      errVertify: {
        username: false,
        password: false,
        email: false,	
        mobile: false,	
      }  
    }
  },
  components: {
    ShowForm
  },
  methods: {
    checkUserName() {
      this.errVertify.username = !this.userInfo.username;
    },
    checkPassWord() {
      this.errVertify.password = (this.userInfo.password.length < 6)  || (this.userInfo.password.length > 11);
      if(this.errVertify.password) {
        this.$toast.show('请输入6-11位的密码');
      }
    },
    checkEmail() {
      this.errVertify.email = (this.userInfo.email.indexOf('@') === -1);
      if(this.errVertify.email) {
        this.$toast.show('请输入正确的邮箱');
      }
    },
    checkMobile() {
      this.errVertify.mobile = !(this.userInfo.mobile.length === 11);
      if(this.errVertify.mobile) {
        this.$toast.show('请输入正确的手机号');
      }
    },
    submitForm(event) {
      event.preventDefault();
      let vertify = true;
      /* 检查填写情况 */
      for (let value in this.errVertify) {
        if(this.errVertify[value]) {
          vertify = false;
        }   
      }
      /* 考虑直接提交情况 */
      if (!this.userInfo.username) {
        vertify = false;
      }
      if (!vertify) {
        this.$toast.show('请正确填写所有信息');
      } else {
        addUser(this.userInfo).then(res => {
          if(res.meta.status === 201) {
            this.$toast.show('添加用户成功');
            this.clean();
            this.$store.commit('changeUsersAddForm');
          }
        })
      }
    },
    closeForm() {
      this.clean();
      this.$store.commit('changeUsersAddForm');
    },
    clean() {
      this.userInfo.username = '';
      this.userInfo.password = '';
      this.userInfo.email = '';
      this.userInfo.mobile = '';
      this.errVertify.username = false;
      this.errVertify.password = false;
      this.errVertify.email = false;
      this.errVertify.mobile = false;
    }
  }
}
</script>

<style lang="less" scoped>
.addUsersList {
  display: block;
}
</style>