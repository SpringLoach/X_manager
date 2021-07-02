<template>
  <div>
      <div class="item">
          <span class="main" @click="clickMain">首页</span>
          <span v-for="item in subTitle" :key="item">
              <span class="split">/</span>
              <span class="text">{{item}}</span>
          </span>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    subTitle() { 
      let subtitle = [];
      switch(this.$route.path) {
        case '/home/users':
            subtitle = ['用户管理', '用户列表']
            break;
        case '/home/roles':
            subtitle = ['权限管理', '角色列表']
            break;
        case '/home/rights':
            subtitle = ['权限管理', '权限列表']
            break;
        case '/home/goods':
            subtitle = ['商品管理', '商品列表']
            break;
        case '/home/params':
            subtitle = ['商品管理', '分类参数']
            break;
        case '/home/categories':
            subtitle = ['商品管理', '商品分类']
            break;
        case '/home/orders':
            subtitle = ['订单管理', '订单列表']
            break;
        case '/home/reports':
            subtitle = ['数据统计', '数据报表']
            break;
      } 
      return subtitle
    }
  },
  methods: {
    clickMain() {
      this.$router.replace('/home');
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  span {padding-right: 7px; font-size: 14px; vertical-align: middle;}
  .text, .main {color: #606366;}
  .main {cursor: pointer; font-weight: 800; color: #000; vertical-align: middle;}
  .split {color: #c0c4cc; font-weight: 600;padding-right: 10px;}
}
</style>