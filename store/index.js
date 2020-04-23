import Cookies from 'js-cookie'
import { cookieFromRequest } from '@/utils'

export const state = () => ({
  news: {},
})

export const getters = {}

export const mutations = {
  setNews(state, value) {
    state.news = value;
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const token = cookieFromRequest(req, 'token')
    if (token) {
      commit('auth/SET_TOKEN', token)
      this.$axios.setToken(token, 'Bearer')
    }
  },
  nuxtClientInit({ commit, dispatch }) {
    const token = Cookies.get('token')
    if (!token) return

    commit('auth/SET_TOKEN', token)
    this.$axios.setToken(token, 'Bearer')
  },
  isMobile() {
    return /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
  }
}
