<template>
  <div id="home">
    <nav-bar class="nav-bar"></nav-bar>
    <div class="home-main">
      <tab-menu :menuList="menuList"></tab-menu>
      <div class="content-box">
        <router-view class="content" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './childComps/NavBar'
import TabMenu from './childComps/TabMenu'
import MainShow from './childComps/maincontent/MainShow'

import {getMenuList} from '@/network/home'

export default {
  data() {
    return {
      menuList: []
    }
  },
  components: {
    NavBar,
    TabMenu,
    MainShow
  },
  created() {
    this.getMenuList();
  },
  methods: {
    /* 请求数据 */
    getMenuList() {
      getMenuList().then(res => {
        this.menuList = res.data;
      })
    }
  }
}
</script>

<style lang="less" scoped>
#home{
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-bar {
    height: 60px;
  }
  .home-main {
    display: flex;
    // height: calc(100% - 60px);
    flex: 1;
    .content-box {
      background-color: #eaedf1;
      flex: 1;
      // text-align: center;
      padding: 15px 20px 15px 20px;
      .content {
        margin: 0 auto;
      }
    }
  }
}

</style>