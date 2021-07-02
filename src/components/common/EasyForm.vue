<template>
  <div>
    <form action="" @submit="submitForm">
      <div v-for="(item, index) in formList" :key="index">
        <div v-if='isText(item, "a")' >
          <span>{{item.text}}:</span>
          <input type="text" ref="a">  
        </div>
      </div>
    </form>
    <div class="hit">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        type: 'text',
        text: '用户名',
        placeholder: 'some text.',
        value: '',
        autofocus: true,
        required: true,
        eventType: 'blur',
        eventDo: () => {
          console.log('未输入值');
          if(this.value) {
            console.log('未输入值');
          }
        },
        finish: false
      }]
    }
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
    },
    isText(item, el) {
        setTimeout(() => {
          console.log(this.$refs[el][0]);
          this.$refs[el][0].setAttribute("placeholder", item.placeholder);
          this.$refs[el][0].addEventListener(item.eventType, item.eventDo);   
        }, 0)
        return true;
    }
  }
}
</script>

<style lang="less">
.hit {
  width: 30px;
  height: 30px;
  border: 1px solid skyblue;
  p {
    color: red;
  }
}
</style>