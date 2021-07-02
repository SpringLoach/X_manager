<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="rolesRightdialogVisible" width="50%"  
      :before-close="closeRolesRight">
    <!-- 树形控条 -->
    <el-tree :data="RolesRightList" :props="TreeProps" ref="rolesRightTree"
      node-key="id" show-checkbox default-expand-all :default-checked-keys="defaultCheckedList">
    </el-tree>
    <!-- {{RolesRightList}} -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeRolesRight">取 消</el-button>
      <el-button type="primary" @click="sureSetRolesRight">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import ShowForm from 'components/common/ShowForm'

import {setRightsList} from '@/network/home'

export default {
  components: {
    ShowForm
  },
  data() {
    return {
      rolesRightdialogVisible: true,
      TreeProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  props: {
    RolesRightList: {
      type: Array,
      default() {
        return []
      }
    },
    defaultCheckedList: {
      type: Array,
      default() {
        return []
      }
    },
    setRolesRightID: {
      type: Number,
      default: -1
    }
  },
  methods: {
    closeRolesRight() {
      this.rolesRightdialogVisible = false;
      this.$emit('closeRolesRight');
    },
    sureSetRolesRight() {
      let arr = [
        ...this.$refs.rolesRightTree.getCheckedKeys(),
        ...this.$refs.rolesRightTree.getHalfCheckedKeys()
      ]
      let str = arr.join(',');
      // 发送设置权限请求
      setRightsList(this.setRolesRightID, {rids: str}).then(res => {
        if(res.meta.status === 200) {
          this.$toast.show('更改权限成功');
          this.$emit('sureSetRolesRight');
          this.closeRolesRight();
        } else {
          this.$toast.show('更改权限失败');
          this.closeRolesRight();
        }
      })
    }   
  }
}
</script>

<style lang="less" scoped>

</style>