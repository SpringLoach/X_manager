<template>
  <show-form :class="{rolesEditorForm: $store.state.showRolesEditorForm}" @closeForm="closeForm">
    <h3 slot="title">修改角色</h3>
    <form action="" slot="form" @submit='submitForm'>
      <div class="text">
        <span class="requireSpan">角色名称</span>
        <input type="text" v-model="getRolesInfo.roleName" @blur="checkRoleName" :class="{err: errVertify.roleName}">
      </div>
      <div class="text">
        <span>角色描述</span>
        <input type="text" v-model="getRolesInfo.roleDesc">
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

import {editorRolesed} from '@/network/home'

export default {
  components: {
    ShowForm
  },
  data() {
    return {
      errVertify: {
        roleName: false
      }
    }
  },
  props: {
    RolesInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    getRolesInfo() {
      return {
        roleName: this.RolesInfo.roleName,
        roleDesc: this.RolesInfo.roleDesc
      }
    }
  },
  methods: {
    editorRolesed() {
      editorRolesed(this.RolesInfo.roleId, this.getRolesInfo).then(res => {
        if(res.meta.status == 200) {
          this.$toast.show('编辑角色成功');
          this.$emit("updateRolesList")
          this.$store.commit('changeRolesEditorForm');
        }  
      })
    },
    checkRoleName() {
      this.errVertify.roleName = !this.getRolesInfo.roleName;
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
      this.editorRolesed();
    },
    clean() {
      this.RolesInfo.roleName = '';
      this.RolesInfo.roleDesc = '';
      this.errVertify.roleName = false;
    },
    closeForm() {
      this.clean();
      this.$store.commit('changeRolesEditorForm');
    }
  }
}
</script>

<style>
.rolesEditorForm {
  display: block;
}
</style>