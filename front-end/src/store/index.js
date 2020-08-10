import Vue from 'vue'
import Vuex from 'vuex'
import comments from '../views/comment/store/'
import home from '../views/home/store/'
import company from '../views/company/store/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    comments,
    home,
    company
  }
})
