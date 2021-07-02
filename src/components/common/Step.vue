<template>
  <div class="step">
    <span class="total">共 {{total}} 条</span>
    <span class="selectCount">
        <span>{{currentCount}}条/页</span><span class="arrow">></span>
        <span class="selectList">
          <span @click="clickCount('count1')">{{count1}}条/页</span>
          <span @click="clickCount('count2')">{{count2}}条/页</span>
          <span @click="clickCount('count3')">{{count3}}条/页</span>
        </span>
    </span>
    <span class="control1">
      <button @click="backPage" :class="{disabled: clickBack}" :disabled="clickBack">></button>
      <span v-for="(item, index) in pageCount" :key="index" :class="{isActice: isActice(item)}"
        @click="changPageCount(item)">{{item}}</span>
      <button @click="forwardPage" :class="{disabled: clickGo}" :disabled="clickGo">></button>
    </span>
    <span class="control2">
      前往<input type="text" v-model.number="toPage" @keyup.enter="changPageCount(toPage)">页
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCount: 0,
      toPage: 1,
      actualPageCount: 1
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    count1: {
      type: Number,
      default: 2
    },
    count2: {
      type: Number,
      default: 5
    },
    count3: {
      type: Number,
      default: 8
    },
    pagenum: {
      type: Number,
      default: 1
    }
  },
  created() {
    this.currentCount = this.count2;
  },
  computed: {
    pageCount() {
      let x, y = [];
      this.actualPageCount = Math.ceil(this.total / this.currentCount);
      x = this.actualPageCount;
      if (x>7) {x=7;}
      for (let i=0; i<x; i++) {
        y.push(i + 1);
      }
      return y
    },
    clickBack() {
      return this.pagenum === 1;
    },
    clickGo() {
      return this.pagenum === this.actualPageCount;
    }
  },
  methods: {
    clickCount(a) {
      this.currentCount = this[a];
      this.$emit('changPageSize', this[a])
    },
    changPageCount(page) {
      if(page>0 && page<=this.actualPageCount) {
        this.$emit('changPageCount', page)
      } else {
        this.$toast.show('不存在该页码');
      }
    },
    backPage() {
      this.$emit('dePageSize')
    },
    forwardPage() {
      this.$emit('addPageSize')
    },
    isActice(item) {
      return item === this.pagenum;
    }
  }
}
</script>

<style lang="less" scoped>
.step {
   margin: 20px 0 5px;
   .total {
     margin-right: 10px;
     color: #606266;
     font-size: 13px;
   }
  .selectCount {
    vertical-align: middle;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 3px 0;
    color: #606266;
    &:hover {
      border: 1px solid #72b2fa;
    }
    &:hover .selectList {
      display: block;
    }
    &>span:first-child {
      margin-left: 15px;
      margin-right: 10px;
      font-size: 13px;
      font-family: serif;
    }
    &>span:nth-of-type(2) {
      display: inline-block;
      font-size: 14px;
      margin-left: 8px;
      margin-right: 8px;
      font-family: serif;
      transform: rotate(90deg);
      color: #c0c4cc;
      transition: transform 0.5s;
    }
    .selectList {
      position: absolute;
      display: none;
      bottom: 27px;
      left: -1px;
      width: 89px;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      box-shadow: 1px 1px 0.1px rgba(40, 91, 150, 0.1),-1px -1px 0.1px rgba(40, 91, 150, 0.1);
      span {
        text-align: center;
        display: block;
        padding: 6px 0px;
        font-size: 14px;
        &:hover {
          background: rgb(231, 235, 238);
        }
      }
    }
  }
  .control1 {
    span, button {
      display: inline-block;
      font-size: 14px;
      font-weight: 800;
      margin-left: 10px;
      text-align: center;
      line-height: 30px;
      height: 30px;
      width: 30px;
      background-color: rgb(243, 242, 247);
      color: rgb(126, 125, 125);
      cursor: pointer;
    }
    .isActice {
      color: #fff;
      background-color: #409eff;
    }
    button {
      border: none;
      outline: none;
    }
    .disabled {
      cursor: not-allowed;
    }
    &>button:nth-of-type(1) {
      margin-left: 18px;
    }
    &>button:nth-of-type(1), &>button:nth-last-of-type(1) {
      display: inline-block;
      font-family: serif;
      transform: rotate(180deg);
      color: #c0c4cc;
    }
    &>button:nth-last-of-type(1) {
      transform: rotate(0deg);
    }
  }
  .control2 {
    color: #606266;
    font-size: 13px;
    margin-left: 20px;
    input {
      width: 40px;
      text-align: center;
      padding: 2px 0px;
      border: 1px solid #dbdee5;
      border-radius: 4px;
      font-size: 14px;
      margin: 0 5px 0;
      outline: none;
    }
  }
}
</style>