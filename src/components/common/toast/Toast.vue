<template>
  <div v-show="isShow" class="toast">
      {{message}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=1200) {
      this.isShow = true;
      this.message = message;
        
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration)
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  z-index: 22;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0,0,0,0.6);
  padding: 5px 10px;
  border-radius: 20px;
  animation-name: out;
  animation-duration: 1.4s;
}
@keyframes out {
  from {background-color: rgba(0,0,0,0.6); color: rgba(255, 255, 255, 0.9)}
  to {background-color: rgba(0,0,0,0.01); color: rgba(255, 255, 255, 0.01)}
}
</style>