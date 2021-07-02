<template>
  <show-form  :class="{editorUsersList: $store.state.showUsersEditorForm}" @closeForm="closeForm">
    <h3 slot="title">编辑用户</h3>
    <form slot="form" action="" @submit="submitForm">
      <div class="text">
        <span>用户名</span>
        <input disabled type="text" v-model="getUsersdata.username" class="disabled">
      </div>
      <div class="text">
        <span class="requireSpan">邮箱</span>
        <input type="email" v-model="getUsersdata.email" @blur="checkEmail" :class="{err: errVertify.email}">
      </div>
      <div class="text">
        <span class="requireSpan">手机号</span>
        <input type="tel" v-model="getUsersdata.mobile" @blur="checkMobile" :class="{err: errVertify.mobile}">
      </div>
      <div class="form-bottom">
        <button type="button" @click="closeForm">取消</button>
        <button>确定</button>
      </div>
    </form>
  </show-form>
</template>

<script>
import ShowForm from 'components/common/ShowForm'
import {editorUsered} from '@/network/home'

export default {
  components: {
    ShowForm
  },
  data() {
    return {
      errVertify: {
        email: false,	
        mobile: false	
      }  
    }
  },
  props: {
    getUsersdata: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    userInfo() {
      return {
        email: this.getUsersdata.email,	
        mobile: this.getUsersdata.mobile
      }
    }
  },
  methods: {
    closeForm() {
      this.clean();
      this.$store.commit('changeUserEditorForm');
    },
    clean() {
      this.errVertify.email = false;
      this.errVertify.mobile = false;
      this.getUsersdata.email = "",
      this.getUsersdata.mobile = ""
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
      if (!this.userInfo.email) {
        vertify = false;
      }  
      if (!vertify) {
        this.$toast.show('请正确填写所有信息');
      } else {
        editorUsered(this.getUsersdata.id, this.userInfo).then(res => {
          console.log(res);
          if(res.meta.status === 200) {
            this.$toast.show('编辑用户信息成功');
            this.clean();
            this.$store.commit('changeUserEditorForm');
            this.$bus.$emit('updateUsersData')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.editorUsersList {
  display: block;
}
</style>