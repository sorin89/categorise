export const state = () => ({
  list: [],
  error: null
})

export const mutations = {
  add(state, categories) {
    state.list = categories
  },
  addError(state, error) {
    state.error = error
  },
  emptyError(state) {
    state.error = null
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  },
  error: state => {
    return state.error
  },

}