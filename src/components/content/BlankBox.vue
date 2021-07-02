<template>
  <div class="blank">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.blank {
    background-color: #fff;
    width: 100%;
    // max-height: 500px;
    max-height: calc(100vh - 60px - 74px);
    overflow: auto;
    margin: 12px 0;
    border-radius: 2px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
    padding: 18.2px;
}
</style>