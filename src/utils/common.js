import axios from 'axios'
axios.defaults.baseURL = 'https://conduit.productionready.io/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.delete['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

export const ApiService = {
  get (url, slug = '') {
    return axios.get(`${url}/${slug}`)
      .catch((error) => console.log(error))
  },

  query (url, params) {
    return axios.get(url, { params })
      .catch((error) => console.log(error))
  },

  post (url, params) {
    return axios.post(`${url}`, params)
  },

  update (url, params) {
    return axios.put(`${url}`, params)
  },

  delete (url, params) {
    return axios.delete(`${url}`, params)
  },

  getToken (key) {
    return window.localStorage.getItem(key)
  },

  saveToken (key, token) {
    window.localStorage.setItem(key, token)
  },

  destroyToken (key) {
    window.localStorage.removeItem(key)
  },

  setHeader () {
    axios.defaults.headers.common['Authorization'] = `Token ${this.getToken('id_token')}`
  }
}
