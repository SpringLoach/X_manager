<template>
  <div class="tab-menu" :class="{isChange: isChange}">
    <div class="menu-size" @click="changeSize">|||</div>
    <div v-for="(item, index) in menuList" :key="index" >
      <tab-menu-item :listItem="item" ref="menuContent" :changeSize="isChange"
        @click.native="itemClick(index)" @sec-content="secContent(index)" :subSelect="(index === secIndex)" />
    </div>
  </div>
</template>

<script>
import TabMenuItem from './TabMenuItem'

export default {
  data() {
    return {
      currentIndex: -1,
      preIndex: -1,
      secIndex: -1,
      isChange: false
    }
  },
  components: {
    TabMenuItem
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      this.preIndex = this.currentIndex;
      this.currentIndex = index;
      if (this.preIndex !== -1 && this.preIndex !== this.currentIndex) {
        this.$refs.menuContent[this.preIndex].isShow = false;
        this.$refs.menuContent[this.preIndex].arrRotate = false;
      }
    },
    secContent(index) {
      this.secIndex = index;
    },
    changeSize() {
      this.isChange = !this.isChange;
    }
  }
}
</script>

<style lang="less" scoped>
@color: #fff;

.tab-menu {
  background-color: #333744;
  width: 200px;
  .menu-size {
    background-color: #999;
    color: @color;
    text-align: center;
    font-size: 12px;
    padding: 5.2px 0;
    letter-spacing: 2px;
  }
}
.isChange { width: 64px; }
</style>