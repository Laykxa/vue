import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    username:null
  }),
  actions: {
    setUserId(id) {
      this.userId = id
    },
    setUsername(name){
      this.username=name
    }
  }
})