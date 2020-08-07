import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        darkMode: localStorage.getItem('darkMode') === 'dark'
    },
    mutations: {
        darkMode(state, darkMode: boolean) {
            state.darkMode = darkMode;
            localStorage.setItem("darkMode", darkMode ? 'dark' : 'light');
        }
    },
    actions: {
    },
    modules: {
    }
})
