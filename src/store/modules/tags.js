import { ApiService } from '@/utils/common'

export default {
  namespaced: true,
  state: {
    tags: []
  },
  mutations: {
    setTags (state, tags) {
      state.tags = tags
    }
  },
  actions: {
    getTags (context) {
      ApiService.get('tags', '').then(({ data }) => {
        context.commit('setTags', data.tags)
      })
    }
  }
}
