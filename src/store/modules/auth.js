
import { ApiService } from '@/utils/common'

export default {
  namespaced: true,
  state: {
    user: {
      username: null,
      email: null,
      password: null,
      bio: null,
      image: null
    },
    errors: null,
    loading: true,
    currentUser: {}
  },

  getters: {
    currentUser (state) {
      if (ApiService.getToken('user')) {
        state.currentUser = JSON.parse(ApiService.getToken('user'))
      }
      return state.currentUser
    }
  },

  mutations: {
    setAuth (state, user) {
      state.currentUser = user
    },
    setError (state, errors) {
      state.errors = errors
    }
  },

  actions: {
    doLogin (context, credentials) {
      return new Promise((resolve) => {
        ApiService.post('users/login', {user: credentials})
          .then(({ data }) => {
            context.commit('setAuth', data.user)
            ApiService.saveToken('id_token', data.user.token)
            ApiService.saveToken('user', JSON.stringify(data.user))
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('setError', response.data.errors)
          })
      })
    },
    doRegister (context, credentials) {
      return new Promise((resolve) => {
        ApiService.post('users', {user: credentials})
          .then(({ data }) => {
            context.commit('setAuth', data.user)
            ApiService.saveToken('id_token', data.user.token)
            ApiService.saveToken('user', JSON.stringify(data.user))
            resolve(data)
          })
          .catch(({ response }) => {
            context.commit('setError', response.data.errors)
          })
      })
    },
    setAuth ({ commit }) {
      const user = JSON.parse(ApiService.getToken('user'))
      commit('setAuth', user)
    },
    logout ({ commit }) {
      ApiService.destroyToken('id_token')
      ApiService.destroyToken('user')
      commit('setAuth', {})
    },
    updateUser (context, dataUser) {
      ApiService.setHeader()
      ApiService.update('user', dataUser)
        .then(({ data }) => {
          context.commit('setAuth', data.user)
          ApiService.saveToken('user', JSON.stringify(data.user))
        })
        .catch(({response}) => {
          context.commit('setError', response.data.errors)
        })
    }
  }
}
