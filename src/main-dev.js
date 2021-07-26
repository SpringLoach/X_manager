import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import './plugins/element.js'
import {Dialog, Tree, Select, Option, Message, Card, Button, Icon, Tag, Pagination, Form, FormItem, 
  Input, Cascader, MessageBox, Alert, Tabs, TabPane, Table, TableColumn, Row, Col, Step, Steps,
  Checkbox, CheckboxGroup, Upload, Timeline, TimelineItem} from 'element-ui'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

/* 富文本编辑器样式 */
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(Dialog);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.use(Card);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Cascader);
Vue.use(Alert);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Upload);
Vue.use(Timeline);
Vue.use(TimelineItem);

Vue.component('tree-table', TreeTable)
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(toast)
Vue.use(VueQuillEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
