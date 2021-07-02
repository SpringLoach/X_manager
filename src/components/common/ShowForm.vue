<template>
  <div class="show-form-box">
    <div class="form-box">
      <span class="close" @click="closeClick">×</span>
      <slot name="title"></slot>
      <slot name="other"></slot>
      <slot name="form"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeClick() {
      this.$emit('closeForm')
    }
  }
}
</script>

<style lang="less">
.show-form-box {
  display: none;
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
    width: 50%;
    background-color: #fff;
    padding: 18px;
    border-radius: 2px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), -1px -1px 1px rgba(0, 0, 0, 0.2);
    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
      color: #303133;
    }
    form {
      margin-top: 40px;
      .text {
        display: flex;
        margin-bottom: 20px;
        align-items: center;
        span {
          width: 80px;
          text-align: right;
          color: #606266;
          font-size: 14px;
          font-family: Arial, Helvetica, sans-serif;
          padding: 0 12px 0 0;
        }  
        .requireSpan {
          &::before {
            content: "*";
            color: red;
            margin-right: 4px;
          }
        }
        input {
          flex: 1;
          border: 1px solid #dcdfe6;
          outline: none;
          border-radius: 4px;
          color: #606266;
          font-size: 14px;
          font-family: serif;
          padding: 15px;
          &:hover {
            border: 1px solid #c2c4c9;
          }
          &:focus {
            border: 1px solid #51a2fa;
          }
        }
        .err {
          border: 1px solid red;
        }
        .disabled {
          background-color: #f5f7fa;
          color: #c0c4cc;
          &:hover {
            cursor: not-allowed;
          }
        }
        ::-webkit-input-placeholder {
          color: #b3b6be;
          font-size: 12px;
        }
      };
      .form-bottom {
        text-align: right;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        margin-top: 60px;
        button {
          padding: 12px 20px;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
        }
        & button:first-child {
          background-color: #fff;
          border: 1px solid #e6ebf8;
          color: #606266;
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