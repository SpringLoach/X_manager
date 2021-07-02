<template>
  <div class="show-delete-box">
    <div class="form-box">
      <span class="close" @click="closeClick">×</span>
      <h3>提示</h3>
      <form action="">
        <img src="~assets/img/warning.svg" alt="">
        <span><slot>此操作将永久删除该用户信息，是否继续?</slot></span>
        <div class="form-bottom">
          <button type="button" @click="closeClick">取消</button>
          <button type="button" @click="sureDelete">确定</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeClick() {
      this.$emit('closeForm')
    },
    sureDelete() {
      this.$emit('sureDelete')
    }
  }
}
</script>

<style lang="less" scoped>
.show-delete-box {
  display: block;
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .form-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 33%;
    background-color: #fff;
    padding: 16px 16px 10px 16px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: #303133;
    }
    form {
      margin-top: 20px;
      img {
        margin-right: 10px;
        vertical-align: middle; 
      }
      span{
        vertical-align: middle; 
        font-size: 14px;
        color: #606266;
      }
      .form-bottom {
        text-align: right;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        margin-top: 20px;
        button {
          padding: 8px 13px;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
        }
        & button:first-child {
          border: 1px solid #dcdfe6;
          color: #606266;
          background-color: #fff;
          &:hover {
            color: #409eff;
            background-color: #ecf5ff;
            border: 1px solid #c6e2ff;
          }
        }
        & button:last-child {
          margin-left: 10px;
          color: #fff;
          background-color: #51a2fa;
          border: 1px solid #51a2fa;
          &:hover {
            background-color: #66b1ff;
            border: 1px solid #66b1ff;
          }
        }
      }
    }
  }
  .close {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #999ca0;
  font-size: 24px;
  font-family: sans-serif;
  cursor: pointer;
  }
}
</style>