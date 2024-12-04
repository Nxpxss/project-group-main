// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    accountName: '',  // กำหนด state สำหรับเก็บ accountName
  },
  getters: {
    accountName(state) {
      return state.accountName;  // ให้ดึงค่า accountName จาก state
    },
  },
  mutations: {
    setAccountName(state, accountName) {
      state.accountName = accountName;  // การเปลี่ยนแปลงค่า accountName ใน state
    },
  },
  actions: {
    updateAccountName({ commit }, accountName) {
      commit('setAccountName', accountName);  // ใช้ mutation เพื่ออัปเดต accountName
    },
  },
  modules: {
  },
})
