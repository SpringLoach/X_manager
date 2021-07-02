<template>
  <div>
    <data-list>
      <table class="list-tabel" slot="option">
        <tr>
          <th v-for="(item, index) in titles" :key="index">
              {{item}}
          </th>
        </tr>
        <tr v-for="(item, index) in usersData.usersInfo" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.username}}</td>
          <td>{{item.email}}</td>
          <td>{{item.mobile}}</td>
          <td>{{item.role_name}}</td>
          <td @click="changeState(index)">{{item.mg_state}}</td>
          <td class="control">
            <img @click="editorUsers(item.id)" src="~assets/img/编辑.png" alt="">
            <img @click="deleteUsers(item.id)" src="~assets/img/删除.png" alt="">
            <img @click="setUsers(item)" src="~assets/img/设置.png" alt="">
          </td>
        </tr>
      </table>
    </data-list>
    <users-editor :getUsersdata="getUsersdata"></users-editor>
    <delete-form v-if="showDeleteForm" @closeForm="closeDeleteForm" @sureDelete="sureDelete"/>
    <users-set v-if="showUsersSet" :setUser="setUser" :RolesList="RolesList" @closeForm="closeUsersSet" />
  </div>
</template>

<script>
import DataList from './DataList.vue'
import UsersEditor from '@/views/home/childComps/maincontent/users/UsersEditor'
import UsersSet from '@/views/home/childComps/maincontent/users/UsersSet'

import DeleteForm from 'components/common/DeleteForm'

import {putUsersState,editorUser,deleteUsers,getRolesList} from '@/network/home'

export default {
  components: {
    DataList,
    UsersEditor,
    DeleteForm,
    UsersSet
  },
  props: {
    usersData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      titles: ['#', '姓名', '邮箱', '电话', '角色', '状态', '操作'],
      changeIndex: -1,
      getUsersdata: {},
      showDeleteForm: false,
      readyDeleteId: 0,
      showUsersSet: false,
      setUser: {},
      RolesList: []
    }
  },
  methods: {
    getIndex(index) {
      let uId = this.usersData.usersInfo[index].id;
      let type = !this.usersData.usersInfo[index].mg_state;
      this.changeIndex = index;
      putUsersState(uId, type).then(res => {
        if (res.meta.status !== 200) {
          this.$toast.show('更改状态失败');
          this.changeIndex = index;
        }  
      })
    },
    changeState(index) {
      let uId = this.usersData.usersInfo[index].id;
      let type = !this.usersData.usersInfo[index].mg_state;
      this.usersData.usersInfo[index].mg_state = !this.usersData.usersInfo[index].mg_state;
      putUsersState(uId, type).then(res => {
        if (res.meta.status !== 200) {
          this.$toast.show('更改状态失败');
          // 失败就改回来
          this.usersData.usersInfo[index].mg_state = !this.usersData.usersInfo[index].mg_state;
        }  
      })
    },
    editorUsers(id) {
      editorUser(id).then(res => {
        this.getUsersdata = res.data;
      })
      console.log(this.getUsersdata);
      this.$store.commit('changeUserEditorForm');
    },
    deleteUsers(id) {
      this.readyDeleteId = id;
      this.showDeleteForm = true;
    },
    closeDeleteForm() {
      this.readyDeleteId = 0;
      this.showDeleteForm = false;
    },
    sureDelete() {
      deleteUsers(this.readyDeleteId).then(res => {
        if(res.meta.status === 200) {
          this.$toast.show('删除用户成功');
          this.closeDeleteForm();
          this.$bus.$emit('updateUsersData');
        }
      })
    },
    setUsers(item) {
      this.showUsersSet = !this.showUsersSet;
      this.setUser = item;
      getRolesList().then(res => {
        this.RolesList = res.data
      })
    },
    closeUsersSet() {
      this.showUsersSet = !this.showUsersSet;
    }
  }
}
</script>

<style lang="less" scoped>
.list-tabel tr {
  .control {
    width: 170px;
    padding: 9.9px;
    img {
      color: #fff;
      display: inline-block;
      padding: 5px 13px;
      border-radius: 3px;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
      margin-right: 7px;
      &:nth-child(1){
        background-color: #409eff;
        &:hover {
          background-color: #64b1fd;
        }
      }
      &:nth-child(2){
        background-color: #f85b5b;
        &:hover {
          background-color: #f77878;
        }
      }
      &:nth-child(3){
        background-color: #e6a23c;
        &:hover {
          background-color: #f8b858;
        }
      }
    }
  }
}
</style>