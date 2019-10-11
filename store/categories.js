export const state = () => ({
  list: []
})

export const mutations = {
  add(state, categories) {
    state.list = categories
  },
  emptyList(state) {
    state.list = []
  }
}

export const getters = {
  list: state => {
    return state.list
  }
}