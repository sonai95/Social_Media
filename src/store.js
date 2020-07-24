/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userInfo: {
      name: null,
      mobile: null,
      email: null,
      age: null,
      userId: null,
      friends: [],
      userProfilePic: null,
      received: [],
      requested: []
    },
    currProfile: {
      name: null,
      mobile: null,
      email: null,
      age: null,
      userId: null,
      friends: [],
      userProfilePic: null,
      received: [],
      requested: []
    },
    userLoggedIn: false
  },
  mutations: {
    addAccepted(state, payload) {
      state.userInfo.received.splice(state.userInfo.received.indexOf(payload), 1)
      state.userInfo.friends.push(payload)
    },
    removeReceived(state, payload) {
      state.userInfo.received.splice(state.userInfo.received.indexOf(payload),1)
    },
    addToRequested(state, payload) {
      state.userInfo.requested.push(payload)
    },
    setCandidateList (state, payload) {
      state.candidate = payload
    },
    setTimer (state, payload) {
      state.timer = payload
    },
    setCurrProfile(state, payload) {
      state.currProfile.name = payload.name
      state.currProfile.mobile = payload.mobile
      state.currProfile.email = payload.email
      state.currProfile.age = payload.age
      state.currProfile.userId = payload.userId
      state.currProfile.friends = payload.friends
      state.currProfile.received = payload.received
      state.currProfile.requested = payload.requested
    },
    logOut(state, payload) {
      state.userInfo.name = null
      state.userInfo.mobile = null
      state.userInfo.email = null
      state.userInfo.age = null
      state.userInfo.userId = null
      state.userInfo.friends = []
      state.userInfo.userProfilePic = null
      state.userInfo.received = []
      state.userInfo.requested = [],
      state.userLoggedIn = false
    },
    setUserInfo(state, payload) {
      state.userInfo.name = payload.name
      state.userInfo.mobile = payload.mobile
      state.userInfo.email = payload.email
      state.userInfo.age = payload.age
      state.userInfo.userId = payload.userId
      state.userInfo.friends = payload.friends
      state.userInfo.userProfilePic = payload.userProfilePic
      state.userInfo.received = payload.received
      state.userInfo.requested = payload.requested,
      state.userLoggedIn = true
    },
    setAdminInfo(state, payload) {
      state.adminTrue = true
      state.userInfo.username = payload.username
      state.candidate = payload.candidate
      state.isLogedin = true
    },
    storeAnwser(state, payload) {
      if (state.anwsers.length > 0) {
        for (var i = 0; i < state.anwsers.length; i++) {
          if (state.anwsers[i].questionId === payload.questionId) {
            state.anwsers[state.questionCounter].anwser = payload.anwser
            return;
          }
        }
        state.anwsers.push(payload)
      } else {
        state.anwsers.push(payload)
      }
    },
    questions(state, payload) {
      state.questionStore = payload
    },
    setCurrentPage(state, payload) {
      state.currentpage = payload
    },
    setquestionCounter(state, payload) {
      if (payload === "login") {
        state.questionCounter = 0
      } else if (payload === "add") {
        state.questionCounter = state.questionCounter + 1
      } else if (payload === "sub") {
        state.questionCounter = state.questionCounter - 1
      }
    },
    gotoquestionCounter(state, payload) {
      state.questionCounter = payload
    },
    setStartTime(state) {
      var date = new Date();
      var time = date.getTime()
      state.StartTime = time
    }

  },
  actions: {
    logUserOut({ store, commit },payload) {
      commit('logOut')
    },
    getMutualFriendDetails({ store, commit },payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/getMutualFriendDetails', {
          payload
        }).then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    rejectRequest({ store, commit },payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/rejectRequest', {
          payload
        }).then(response => {
          commit('removeReceived', payload.request)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    setCurrProfile({ store, commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('setCurrProfile', payload)
        resolve()
      })
    },
    accepRequest({ store, commit },payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/accepRequest', {
          payload
        }).then(response => {
          commit('addAccepted', payload.request)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    getRequestDetails({ store, commit },payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/getRequestDetails', {
          payload
        }).then(response => {
          resolve(response.data)
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    addFriend({ store, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/addFriend', {
          payload
        }).then(response => {
          commit('addToRequested', payload.friend)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    searchFriend({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/searchFriend', {
          payload
        }).then(response => {
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    register({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/register', payload).then(response => {
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },
    login({
      commit
    }, payload) {
      // eslint-disable-next-line no-console
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/login', payload).then(response => {
          commit('setUserInfo', response.data)
          resolve()
        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    }
  }
})