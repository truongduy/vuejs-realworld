import Vue from 'vue'
import Vuex from 'vuex'
import articles from './modules/articles'
import auth from './modules/auth'
import tags from './modules/tags'

Vue.use(Vuex)

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

const modules = {
  articles,
  auth,
  tags
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
