
import { ApiService } from '@/utils/common'

export default {
  namespaced: true,
  state: {
    articles: [],
    currentPage: 1,
    article: {
      author: {
        username: null,
        bio: null,
        image: null,
        following: null
      },
      title: null,
      description: null,
      body: null,
      tagList: []
    },
    isLoading: true,
    articlesCount: null,
    comments: [],
    profile: {
      username: null,
      bio: null,
      image: null,
      following: null
    }
  },

  getters: {
    article (state) {
      return state.article
    },
    currentPage (state) {
      return state.currentPage
    },
    comments (state) {
      return state.comments
    },
    profile (state) {
      return state.profile
    }
  },

  mutations: {
    setArticles (state, articles) {
      state.articles = articles
      state.isLoading = false
    },
    detailArticle (state, article) {
      state.article = article
      state.isLoading = false
    },
    updateArticles (state, article) {
      const list = state.articles.map(item => {
        if (item.slug === article.slug) {
          return article
        }
        return item
      })
      state.articles = list
    },
    resetArticle (state) {
      state.article = {
        author: {
          username: null,
          bio: null,
          image: ''
        },
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    },
    setTag (state, tag) {
      state.article.tagList = state.article.tagList.concat([tag])
    },
    removeTag (state, tag) {
      state.article.tagList = state.article.tagList.filter(tg => tg !== tag)
    },
    articlesCount (state, articlesCount) {
      state.articlesCount = articlesCount
    },
    currentPage (state, currentPage) {
      state.currentPage = currentPage
    },
    getComments (state, comments) {
      state.comments = comments
    },
    getProfile (state, profile) {
      state.profile = profile
    }
  },

  actions: {
    getArticles (context, config) {
      ApiService.query('articles', config)
        .then(({ data }) => {
          context.commit('setArticles', data.articles)
          context.commit('articlesCount', data.articlesCount)
        })
    },
    getArticlesTag (context, tag) {
      ApiService.setHeader()
      ApiService.get('articles', {tag: tag})
        .then(({ data }) => {
          context.commit('setArticles', data.articles)
        })
    },
    createArticle (context, article) {
      ApiService.setHeader()
      return ApiService.post('articles', { article })
        .then(({ data }) => {
          context.commit('detailArticle', data.article)
          return data
        })
    },
    updateArticleDetail (context, article) {
      ApiService.setHeader()
      return ApiService.update(`articles/${article.slug}`, { article })
        .then(({ data }) => {
          context.commit('detailArticle', data.article)
          return data
        })
    },
    resetArticle (context) {
      context.commit('resetArticle')
    },
    detailArticle (context, slug) {
      ApiService.get('articles', slug)
        .then(({ data }) => {
          context.commit('detailArticle', data.article)
        })
    },
    deleteArticleAct (context, slug) {
      ApiService.setHeader()
      return ApiService.delete(`articles/${slug}`, '')
    },
    addTag (context, tag) {
      context.commit('setTag', tag)
    },
    removeTag (context, tag) {
      context.commit('removeTag', tag)
    },
    addFavorite (context, slug) {
      ApiService.setHeader()
      ApiService.post(`articles/${slug}/favorite`, '').then(({ data }) => {
        context.commit('updateArticles', data.article)
        context.commit('detailArticle', data.article)
      })
    },
    removeFavorite (context, slug) {
      ApiService.setHeader()
      ApiService.delete(`articles/${slug}/favorite`, '').then(({ data }) => {
        context.commit('updateArticles', data.article)
        context.commit('detailArticle', data.article)
      })
    },
    getComments (context, slug) {
      ApiService.setHeader()
      ApiService.get(`articles/${slug}/comments`, '').then(({ data }) => {
        context.commit('getComments', data.comments)
      })
    },
    postComment (context, payload) {
      ApiService.setHeader()
      return ApiService.post(`articles/${payload.slug}/comments`, { body: payload.body }).then(({ data }) => {
        context.dispatch('getComments', payload.slug)
      })
    },
    deleteComment (context, payload) {
      ApiService.setHeader()
      return ApiService.delete(`articles/${payload.slug}/comments/${payload.id}`, '').then(({ data }) => {
        context.dispatch('getComments', payload.slug)
      })
    },
    getProfile (context, username) {
      ApiService.get(`profiles/${username}`, '').then(({ data }) => {
        context.commit('getProfile', data.profile)
      })
    },
    addFollow (context, username) {
      ApiService.setHeader()
      return ApiService.post(`profiles/${username}/follow`, '').then(({ data }) => {
        context.commit('getProfile', data.profile)
      })
    },
    unFollow (context, username) {
      ApiService.setHeader()
      return ApiService.delete(`profiles/${username}/follow`, '').then(({ data }) => {
        context.commit('getProfile', data.profile)
      })
    }
  }
}
