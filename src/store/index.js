import Vue from 'vue'
import Vuex from 'vuex'
import sample from "./sample";
import axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wines : sample.data,
    fetchCount : 0,
    posts : {}

  },
  mutations: {
    incrementFetchCount(state){
      state.fetchCount++
    },
    updatePost(state,posts){
      state.posts = posts
    },
  },
  actions: {
    doExampleFetch(context){
      axios.get(`http://jsonplaceholder.typicode.com/posts`)
      .then(response => {
        // JSON responses are automatically parsed.
        context.commit('updatePost',response.data)

      })
      .catch(e => {
        this.errors.push(e)
      })
      context.commit('incrementFetchCount')
    }
  },
  modules: {
  }
})
