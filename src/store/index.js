import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showUsersAddForm: false,
    showUsersEditorForm: false,
    showRolesAddForm: false,
    showRolesEditorForm: false
  },
  mutations: {
    changeUsersAddForm(state) {
      state.showUsersAddForm = !state.showUsersAddForm;
    },
    changeUserEditorForm(state) {
      state.showUsersEditorForm = !state.showUsersEditorForm;
    },
    changeRolesAddForm(state) {
      state.showRolesAddForm = !state.showRolesAddForm;
    },
    changeRolesEditorForm(state) {
      state.showRolesEditorForm = !state.showRolesEditorForm;
    }
  },
  actions: {
  },
  modules: {
  }
})
