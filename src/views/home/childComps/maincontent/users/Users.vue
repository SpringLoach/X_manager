<template>
  <div class="users">
    <crumbs />
    <blank-box>
      <div class="users-top">
        <div class="input-box">
          <input type="text" placeholder="请输入内容" v-model="searchContent" @keyup.enter="searchUsersList">
          <a v-show="isClear" class="clear" @click="clearContent">x</a>
          <a class="submit" @click="searchUsersList">
            <img src="~assets/logo.png" alt="">
          </a>     
        </div>
        <span class="add-user" @click="addUsers">添加用户</span>
      </div>
      <div class="data-list">
        <users-data :usersData="usersData"></users-data>
      </div>
      <div class="users-bottom">
        <step :total="total" :pagenum="queryInfo.pagenum" @changPageCount="changPageCount" @changPageSize="changPageSize"
          @dePageSize="dePageSize" @addPageSize="addPageSize" :count2="initPagesSize" />
      </div>
    </blank-box>
    <users-add-form></users-add-form>
  </div>
</template>

<script>
import UsersAddForm from '@/views/home/childComps/maincontent/users/UsersAddForm'

import UsersData from 'components/content/datalist/UsersData'
import BlankBox from 'components/content/BlankBox'
import Crumbs from 'components/common/Crumbs'
import Step from 'components/common/Step'


import {getUsersList} from '@/network/home'

export default {
  components: {
    Crumbs,
    UsersData,
    Step,
    BlankBox,
    UsersAddForm
  },
  data() {
    return {
      searchContent: '',
      // 初始化展示数，与请求页码数一致
      initPagesSize: 5,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      usersData: {
        usersInfo: []
      },
      total: 0,
      isSearch: false, 
    }
  },
  props: {
    usersList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    isClear() {
      return !!this.searchContent;
    }
  },
  created() {
    this.getUsersList();
  },
  mounted() {
    this.$bus.$on('updateUsersData', () => {
      this.getUsersList();
    }) 
  },
  methods: {
    clearContent() {
      this.searchContent = '';
      this.getUsersList();
    },
    // 请求数据  
    getUsersList() {
      getUsersList(this.queryInfo).then(res => {
        if (res.meta.status !== 200) {
          this.$toast.show('请求数据失败');
        } else {
          this.usersData.usersInfo = res.data.users;
          this.total = res.data.total;
          this.usersData = {...this.usersData};
          this.$toast.show('请求数据成功');
          if (this.isSearch) {
            this.isSearch = false;
            let newArr = this.usersData.usersInfo.filter(item => {
              return item.username.indexOf(this.searchContent) !== -1;
            })
            this.usersData.usersInfo = newArr;
            this.queryInfo.pagenum = 1;
          }
        } 
      })
    },
    changPageCount(page) {
      this.queryInfo.pagenum = page;
      this.queryInfo = {...this.queryInfo};
      this.getUsersList()
    },
    changPageSize(size) {
      this.queryInfo.pagesize = size;
      this.queryInfo.pagenum = 1;
      this.queryInfo = {...this.queryInfo};
      this.getUsersList()
    },
    dePageSize() {
      this.queryInfo.pagenum -= 1;
      this.queryInfo = {...this.queryInfo};
      this.getUsersList()
    },
    addPageSize() {
      this.queryInfo.pagenum += 1;
      this.queryInfo = {...this.queryInfo};
      this.getUsersList()
    },
    searchUsersList() {
      this.isSearch = true;
      this.getUsersList();
    },
    addUsers() {
      this.$store.commit('changeUsersAddForm');
    }
  }
}
</script>

<style lang="less" scoped>
.users {
  .users-top {
    display:flex;
    align-items: center;
    .input-box {
      margin-right: 18px;
      display: flex;
      position: relative;
      input {
        padding: 10px 0 10px 15px; 
        width: 300px;
        font-size: 13px;
        color: #70737a;
        font-family: serif;
        border: 1px solid rgb(216, 211, 211);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        &:focus {border: 1px solid rgb(144, 209, 247);outline: none;}
      }  
      ::-webkit-input-placeholder {color: #95989e; font-weight: 200;}
      .clear {
        position: absolute;
        display: none;
        right: 60px;
        top: 6px;
        width: 20px;
        height: 20px;
        text-decoration: none;        
        text-align: center;
        vertical-align: middle;
        color: #cacdd1;
        font-family: sans-serif;
        cursor: pointer;
      }
      &:hover .clear {
        display: block;
      }
      .submit {
        background-color: #eaedf1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        border: 1px solid rgb(216, 211, 211);
        border-left: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        cursor: pointer;
        img {width: 15px;vertical-align: middle;}
      }
    };
    .add-user {
      display: inline-block;
      padding: 10px 20px;
      font-size: 14px;;
      background-color: #409eff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>