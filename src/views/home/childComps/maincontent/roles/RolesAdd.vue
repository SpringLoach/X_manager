<template>
  <show-form :class="{rolesAddForm: $store.state.showRolesAddForm}" @closeForm="closeForm">
    <h3 slot="title">添加角色</h3>
    <form action="" slot="form" @submit='submitForm'>
      <div class="text">
        <span class="requireSpan">角色名称</span>
        <input type="text" v-model="RolesInfo.roleName" @blur="checkRoleName" :class="{err: errVertify.roleName}">
      </div>
      <div class="text">
        <span>角色描述</span>
        <input type="text" v-model="RolesInfo.roleDesc">
      </div>
      <div class="form-bottom ">
        <button type="button" @click="closeForm">取消</button>
        <button>确定</button>
      </div>
    </form>
  </show-form>
</template>

<script>
import ShowForm from 'components/common/ShowForm'

import {addRoles} from '@/network/home'

export default {
  components: {
    ShowForm
  },
  data() {
    return {
      RolesInfo: {
        roleName: '',
        roleDesc: ''
      },
      errVertify: {
        roleName: false
      }
    }
  },
  methods: {
    addRoles() {
      addRoles(this.RolesInfo).then(res => {
        if(res.meta.status == 201) {
          this.$toast.show('添加角色成功');
          this.$emit("updateRolesList")
          this.$store.commit('changeRolesAddForm');
        }  
      })
    },
    checkRoleName() {
      this.errVertify.roleName = !this.RolesInfo.roleName;
      if(this.errVertify.roleName) {
        this.$toast.show('角色名称不能为空');
      }
    },
    submitForm(event) {
      event.preventDefault();
      if(this.errVertify.roleName) {
        this.$toast.show('角色名称不能为空');
        return
      }
      this.addRoles();
    },
    clean() {
      this.RolesInfo.roleName = '';
      this.RolesInfo.roleDesc = '';
      this.errVertify.roleName = false;
    },
    closeForm() {
      this.clean();
      this.$store.commit('changeRolesAddForm');
    }
  }
}
</script>

<style>
.rolesAddForm {
  display: block;
}
</style>