<template>
  <div id="roles">
    <crumbs/>
    <blank-box>
      <button type="button" class="add-roles" @click="clickAdd">添加角色</button>
      <data-list>
        <table slot="option" class="list-tabel">
          <tr>
            <th>展开</th>
            <th>#</th>
            <th>角色名称</th>
            <th>角色描述</th>
            <th>操作</th>
          </tr>
          <template v-for="(item, index) in RolesList" >
            <tr :key="index">
              <td class="show" @click="showDetial(index)" :class="{arrowRotate: arrowRotate.includes(index)}">></td>
              <td>{{index+1}}</td>
              <td>{{item.roleName}}</td>
              <td>{{item.roleDesc}}</td>
              <td class="control">
                <img @click="clickEditor(item.id)" src="~assets/img/编辑.png" alt="">
                <img @click="clickDelete(item.id)" src="~assets/img/删除.png" alt="">
                <img @click="clickSet(item)" src="~assets/img/设置.png" alt="">
              </td>
            </tr>
            <tr :key="index+0.5" v-if="item.showDetial">
              <td colspan="5" class="show-detail">
                  <template v-for="(firstItem, indey) in item.children">
                  <div :key="indey" class="first-cols-box">
                  <div class="first-cols-1" :key="firstItem.id">
                    <span>{{firstItem.authName}}<img src="~assets/img/close-blue.svg" @click="clickDeleteRight(item, firstItem.id, index)"/></span>
                    <img class="arrow" src="~assets/img/选择-面性.svg" alt="">
                  </div>
                  <div class="first-cols-2" :key="indey">
                  <template v-for="(secondItem, indez) in firstItem.children">
                  <div class="second-cols-box" :key="indez">
                  <div class="second-cols-1" :key="secondItem.id">
                    <span>{{secondItem.authName}}<img src="~assets/img/close-green.svg" @click="clickDeleteRight(item, secondItem.id, index)"/></span>
                    <img class="arrow" src="~assets/img/选择-面性.svg" alt="">
                  </div>
                  <div class="second-cols-2" :key="indez">
                    <span v-for="thirdItem in secondItem.children" 
                      :key="thirdItem.id">{{thirdItem.authName}}<img src="~assets/img/close-yellow.svg" 
                        @click="clickDeleteRight(item, thirdItem.id, index)"/></span>
                  </div>
                  </div>
                  </template>
                  </div>
                  </div>
                  </template>
              </td>
            </tr>
          </template>
        </table>
      </data-list>
    </blank-box>
    <roles-add @updateRolesList="getRolesList" />
    <roles-editor :RolesInfo="RolesInfo" @updateRolesList="getRolesList" />
    <delete-form v-if="showDeleteForm" @closeForm="closeDeleteForm" @sureDelete="sureDelete" />
    <delete-form v-if="showDeleteRightForm" @closeForm="closeDeleteRightForm" 
      @sureDelete="sureDeleteRightForm">此操作将永久删除该权限, 是否继续?</delete-form>
      <!-- 有问题 -->
    <roles-right v-if="showRolesRight" :RolesRightList="RolesRightList" 
      :defaultCheckedList="defaultCheckedList" :setRolesRightID="setRolesRightID" 
      @closeRolesRight="closeRolesRight" @sureSetRolesRight="sureSetRolesRight" />
  </div>
</template>

<script>
import RolesAdd from '@/views/home/childComps/maincontent/roles/RolesAdd'
import RolesEditor from '@/views/home/childComps/maincontent/roles/RolesEditor'
import RolesRight from '@/views/home/childComps/maincontent/roles/RolesRight'

import BlankBox from 'components/content/BlankBox'
import DataList from 'components/content/datalist/DataList'
import Crumbs from 'components/common/Crumbs'
import DeleteForm from 'components/common/DeleteForm'

import {getRolesList, editorRoles, deleteRoles, deleteRolesRight, getRightsListTree} from '@/network/home'

export default {
  components: {
    Crumbs,
    BlankBox,
    DataList,
    RolesAdd,
    RolesEditor,
    DeleteForm,
    RolesRight
  },
  data() {
    return {
      RolesList: {},
      RolesInfo: {},
      showDeleteForm: false,
      readyDeleteId: 0,
      arrowRotate: [],
      showDeleteRightForm: false,
      readyDeleteRole: {},
      readyDeleteRightId: 0,
      readyDeleteRoleIndex: -1,
      showRolesRight: false,
      RolesRightList: [],
      defaultCheckedList: [],
      // 预分配角色的ID
      setRolesRightID: -1
    }
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 请求列表数据
    getRolesList() {
      getRolesList().then(res => {
        if(res.meta.status == 200) {
          this.RolesList = res.data;
          this.RolesList.map(item => {
            item.showDetial = false;
          })
          this.RolesList = [...this.RolesList]
          this.$toast.show('请求数据成功');
        }
      })
    },
    editorRoles(id) {
      editorRoles(id).then(res => {
        if(res.meta.status == 200) {
          this.RolesInfo = res.data
          this.$toast.show('请求数据成功');
        }
      })
    },
    clickAdd() {
      this.$store.commit('changeRolesAddForm');
    },
    clickEditor(id) {
      // 显示组件
      this.$store.commit('changeRolesEditorForm');
      // 请求数据
      this.editorRoles(id);
    },
    clickDelete(id) {
      this.showDeleteForm = !this.showDeleteForm;
      this.readyDeleteId = id;
    },
    closeDeleteForm() {
      this.showDeleteForm = !this.showDeleteForm;
      this.readyDeleteId = 0;
    },
    sureDelete() {
      deleteRoles(this.readyDeleteId).then(res => {
        this.$toast.show('删除成功');
        this.readyDeleteId = 0;
        // 刷新
        this.getRolesList();
      })
      this.showDeleteForm = !this.showDeleteForm;
    },
    showDetial(index) {
      this.RolesList[index].showDetial = !this.RolesList[index].showDetial;
      this.RolesList = [...this.RolesList];
      //
      if(!this.arrowRotate.includes(index)) {
        this.arrowRotate.push(index);
      } else {
        let x = this.arrowRotate.indexOf(index);
        this.arrowRotate.splice(x, 1)
      }
    },
    deleteRolesRight() {
      deleteRolesRight(this.readyDeleteRole.id, this.readyDeleteRightId).then(res => {
        if(res.meta.status === 200){
          this.$toast.show('删除权限成功');
          this.RolesList[this.readyDeleteRoleIndex].children = res.data;
          this.closeDeleteRightForm();
        }
      })
    },
    clickDeleteRight(item, rightID, index) {
      this.showDeleteRightForm = !this.showDeleteRightForm;
      this.readyDeleteRole = item;
      this.readyDeleteRoleIndex = index;
      this.readyDeleteRightId = rightID;
    },
    closeDeleteRightForm() {
      this.readyDeleteRole = {};
      this.readyDeleteRightId = 0;
      this.readyDeleteRoleIndex = -1;
      this.showDeleteRightForm = !this.showDeleteRightForm;
    },
    sureDeleteRightForm() {
      this.deleteRolesRight();
    },
    // 权限分配
    clickSet(item) {
      getRightsListTree().then(res => {
        if(res.meta.status === 200) {
          this.$toast.show('获取权限列表成功');
          this.showRolesRight = !this.showRolesRight;
          // 权限列表
          this.RolesRightList = res.data;
          // 当前项选中权限
          this.putDefaultChecked(item.children);
          // 预分配角色的ID
          this.setRolesRightID = item.id
        }
      })
    },
    closeRolesRight() {
      this.showRolesRight = !this.showRolesRight;
      this.defaultCheckedList = [];
      this.setRolesRightID = -1;
    },
    putDefaultChecked(tree) {
      tree.forEach(node => { 
        if(!node.children) {
          this.defaultCheckedList.push(node.id);
        } else {
          this.putDefaultChecked(node.children);
        }
      })    
    },
    sureSetRolesRight() {
      this.getRolesList();
      this.arrowRotate = [];
    }
  }
}
</script>

<style lang="less" scoped>
#roles {
  .add-roles {
    outline: none;
    border: none;
    display: inline-block;
    padding: 12px 20px;
    font-size: 14px;;
    background-color: #409eff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .list-tabel {
    .show {
      width: 50px;
      text-align: center;
      font-family: serif;
      transform: rotate(0deg);
      transition: transform 0.5s;
    }
    .arrowRotate {
      transform: rotate(90deg);
    }
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
    .show-detail {
      background-color: #fff;
      &::after {
        display: table;
        content: '';
        clear: both;
      }
      .first-cols-box {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        &:nth-of-type(1) {
          border-top: 1px solid #ebeef5;
        }
        .first-cols-1 {
          float: left;
          width: 20.8%;  
          &>span {
            background-color: #e6f0fc;
            border: 1px solid #d3e7fa;
            color: #409eff;
            img {
              &:hover {
                background-color: #cde6ff;
              }
            }
          }
        }
        .first-cols-2 {
          float: left;
          width: 79.2%;
          &::after {
            display: table;
            content: '';
            clear: both;
          }
          .second-cols-box {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ebeef5;
            &:nth-last-of-type(1) {
              border-bottom: none;
            }
            .second-cols-1 {
              color: green;
              float: left;
              width: 25%;
              &>span {
                background-color: #e9f7e1;
                border: 1px solid #d8ecce;
                color: #67c23a;
                img {
                  &:hover {
                    background-color: #bdf3a2;
                  }
                }
              }
            }
            .second-cols-2 {
              float: left;
              width: 75%;
              &>span {
                background-color: #f8efe3;
                border: 1px solid #f5e1f2;
                color: #e6a23c;
                img {
                  &:hover {
                    background-color: #fdd79c;
                  }
                }
              }
            }
          } 
        }
      }  
      span {
        display: inline-block;
        padding: 5px 10px;
        background-color: pink;
        border-radius: 4px;
        margin: 7px;
        font-size: 12px;
        img {
          position: relative;
          margin-left: 3px;
          top: -1px;
          left: 1.5px;
          vertical-align: middle;
          padding: 2px;
          &:hover {
            border-radius: 50%;
          }
        }
      }
      .arrow {
        transform: rotate(-90deg);
        position: relative;
        top: 2px;
      }
    }
  }
}
</style>