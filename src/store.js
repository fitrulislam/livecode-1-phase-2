import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: []
  },
  mutations: {
    addImageFromDB (state, payload) {
      state.images = payload
    },
    addNewImage (state, payload) {
      state.images.map(image => {
        if (image._id === payload._id) {
          image.url = payload.url
        }
      })
    }
  },
  actions: {
    getImage ({commit}) {
      axios.get('http://35.198.212.156/api/image', {
        headers: {Authorization: localStorage.getItem('token')}
      })
        .then(response => {
          commit('addImageFromDB', response.data.images)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addImage ({commit}, payload) {
      axios.post('http://35.198.212.156/api/image', payload, {
        headers: {Authorization: localStorage.getItem('token')}
      })
        .then(response => {
          commit('addNewImage', response.data.image)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
