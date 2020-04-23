import Cookies from 'js-cookie'

// state
export const state = () => ({
  user: null,
  token: null,
})

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    this.$axios.setToken(state.token, 'Bearer')
  },

  FETCH_USER_SUCCESS(state, user) {
    state.user = user
  },

  FETCH_USER_FAILURE(state) {
    state.token = null
  },

  LOGOUT(state) {
    state.user = null
    state.token = null
  },

  UPDATE_USER(state, {user}) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken({commit, dispatch}, {token, remember}) {
    commit('SET_TOKEN', token)
    Cookies.set('token', token, {expires: 365})
  },

  async fetchUser({commit, state}) {
    try {
      if (state.token) {
        this.$axios.setToken(state.token, 'Bearer')
      }
    } catch (e) {
      Cookies.remove('token')
      commit('FETCH_USER_FAILURE')
    }
  },

  updateUser({commit}, payload) {
    commit('UPDATE_USER', payload)
  },

  logout({commit}) {
    Cookies.remove('token')
    commit('LOGOUT')
  }

}
