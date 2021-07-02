import Toast from './Toast'

const obj = {}

obj.install = function (Vue){
  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  
  // 2. 根据组件构造器创建一个组件对象
  const toast = new toastConstructor()
  
  // 3. 将组件对象，手动挂载到新建 div 元素上
  toast.$mount(document.createElement('div'))
  
  // 4. 将刚建的 div 元素添加到文档
  document.body.appendChild(toast.$el)
  
  // 5. ...添加到原型
  Vue.prototype.$toast = toast;
}

export default obj
