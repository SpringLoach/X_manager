<template>
  <div id="users-set">
    <el-dialog title="分配角色" :visible.sync="UsersSetVisible" 
      width="35%" :before-close="closeUsersSet" class="users-set-dialog">
      <div>当前用户：{{setUser.username}}</div>
      <div>当前角色：{{setUser.role_name}}</div>
      <div>
        <span>分配新角色：</span>
        <el-select v-model="setRoleId" placeholder="请选择">
          <el-option v-for="item in RolesList" :key="item.id"
            :label="item.roleName" :value="item.id">
          </el-option>
        </el-select>
      </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="closeUsersSet">取 消</el-button>
    <el-button type="primary" @click="sureUsersSet">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import {setUsersRole} from '@/network/home'

export default {
  data() {
    return {
      UsersSetVisible: true,
      setRoleId: ''
    }
  },
  props: {
    setUser: {
      type: Object,
      default() {
        return {}
      }
    },
    RolesList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    closeUsersSet() {
      this.UsersSetVisible = !this.UsersSetVisible;
      this.$emit('closeForm');
    },
    sureUsersSet() {
      setUsersRole(this.setUser.id, {rid: this.setRoleId}).then(res => {
        if(res.meta.status !== 200) {
          this.$message.error('更改用户角色失败');
        //   return
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#users-set {
  .users-set-dialog {
    div {
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

</style>