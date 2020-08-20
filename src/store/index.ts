import Vue from 'vue';
import Vuex from 'vuex';
import classes from './classes.json';

class ClassData {

}

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        darkMode: localStorage.getItem('darkMode') === 'dark',
        classes,
        classCache: {}
    },
    mutations: {
        darkMode(state, darkMode: boolean) {
            state.darkMode = darkMode;
            localStorage.setItem("darkMode", darkMode ? 'dark' : 'light');
        },
        cacheClass(state, { id, cls }: { id: string, cls: ClassData }) {
            (state.classCache as any)[id] = cls;
        }
    },
    actions: {
        async getClassData({ state, commit }, id: string) {
            if (!(state.classCache as any)[id])
                commit("cacheClass", { id, cls: await (await window.fetch(`https://fireroad-dev.mit.edu/courses/lookup/${id}`)).json() });
        }
    },
    modules: {
    }
})
