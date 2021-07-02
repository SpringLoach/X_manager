<template>
  <div>
    <div class="list-body">
      <slot name="option"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.list-body {
  .list-tabel {
    border: 1px solid rgb(216, 211, 211);
    color: #909399;
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
    font-size: 12px;
    th, td {
      border: 1px solid rgb(216, 211, 211);
      padding: 12px;
    };
    th {
      text-align: left;
    }
    td {
      color: #606266;
    }
    tr:nth-of-type(2n+1) {
      background-color: #f7f7f7;
    };
    tr:nth-of-type(1) {
      background-color: #fff;
    }
  }
}

</style>