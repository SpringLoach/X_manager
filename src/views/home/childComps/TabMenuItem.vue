<template>
  <div class="list-item" :class="{changeSize: changeSize}">
    <div class="main-title" @click="titleClick" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <div class="title-left">
        <img src="~assets/logo.png" alt="">
        <span>{{listItem.authName}}</span>
      </div>
      <span class="title-right" :class="{arrRotate: arrRotate}">></span>
    </div>
    <div class="sub-title-box" :class="{mouseEnter: isEnter,mouseEnters:isEnters, mouseLeave: isLeave,mouseLeaves: isLeaves}" 
      @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="sub-title" v-for="(item, index) in listItem.children"
      :key="item.id" v-show="isShow || changeSize" 
      :class="{activeSub: subSelect && (index === currentIndex)}"  
      @click="subClick(index, item)">
      <img src="~assets/logo.png" alt="">
      <span>{{item.authName}}</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      currentIndex: -1,
      arrRotate: false,
      isEnter: false,
      isLeave: false,
      isLeaves: false,
      isEnters: false
    }
  },
  props: {
    listItem: {
      type: Object,
      default() {
        return {};
      }
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    subSelect: {
      type: Boolean,
      default: false
    },
    changeSize: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    titleClick() {
      if (!this.changeSize) {
        this.isShow = !this.isShow;
        this.arrRotate = !this.arrRotate;
      }   
    },
    subClick(index, item) {
      let path = item.path;
      this.currentIndex = index;
      this.$emit('sec-content');
      if (this.$route.path !== ('/home/' + path)) {
        this.$router.push('/home/' + path);
      }   
    },
    mouseEnter() {
      if (this.changeSize) {
        window.clearTimeout(this.timerLeave);
        this.isEnter = true;
        this.isLeave = false;
        this.isLeaves = false;
        this.timerEnter = setTimeout(() => {
          this.isEnters = true
        }, 160)
      }  
    },
    mouseLeave() {
      if (this.changeSize) {
        window.clearTimeout(this.timerEnter);
        this.isLeave = true;
        this.timerLeave = setTimeout(() => {
          this.isLeaves = true
          this.isEnters = false;
        }, 160)
      }  
    }
  }
}
</script>

<style lang="less" scoped>
@color: #fff;

.list-item {
  font-size: 14px;
  .main-title,.sub-title {
    color: @color;
    padding: 20px 0;
    padding-left: 50px;
    transition: background-color 0.5s;
    &:hover {
      background-color: #222530;
    };
    img {
      width: 14px;
      vertical-align: middle;
      margin-right: 8px;
    };
  }
  .main-title {
    display: flex;
    justify-content: space-between;
    padding: 20px 25px;
    .title-right {
      font-family: serif;
      transform: rotate(90deg);
      color: rgba(255, 255, 255, 0.5);
      transition: transform 0.5s;
    };
    .arrRotate {transform: rotate(-90deg);}
  };
  .activeSub {color: #66ccff}
}
.changeSize {
  position: relative;
  .main-title span {display: none;}
  .sub-title-box {
    z-index: 90;
    display: none;
    position: absolute;
    width: 200px;
    left: 64px;
    top: 0;
    border-radius: 2px;
    background-color: #333744;
    margin-left: 5px;
    transition: all 0.5s;
    opacity: 0;
    .sub-title {
      padding: 20px;
      padding-left: 20px;
    }
  }
  // &:hover .sub-title-box {
  //   display: block; 
  // }
  .mouseEnter {
    display: block; 
  }
  .mouseEnters {
    opacity: 1;
  }
  .mouseLeave {
    opacity: 0;
  }
  .mouseLeaves {
    display: none; 
  }
}

</style>