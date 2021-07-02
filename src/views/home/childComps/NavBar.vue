<template>
  <div class="nav-bar">
    <div class="info">
        <img src="~assets/logo.png" alt="">
      <span>商城后台管理系统</span>
    </div>
    <button @click="outLogin">退出</button>
  </div>
</template>

<script>
export default {
  methods: {
    outLogin() {
      window.sessionStorage.removeItem("token");
      this.$router.replace("/login");
    }
  }
}
</script>

<style lang="less" scoped>
@color: #fff;
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: @color;
  background-color: #666;
  .info {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-size: 18px;
    img {
      height: 80%;
      vertical-align: middle;
      margin-right: 15px;
    }
  }
  button {
    color: @color;
    background-color: #909399;
    padding: 10px 15px;
    margin-right: 20px;
    border-radius: 8px;
    border: none;
    &:hover {
      background-color: #b3b5b9;
    }
  }
}

</style>