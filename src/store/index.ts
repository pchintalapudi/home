import Vue from 'vue';
import Vuex from 'vuex';
import classes from './classes.json';
import projects from "./projects.json";
import work from "./work.json";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        darkMode: localStorage.getItem('darkMode') === 'dark',
        classes,
        classCache: {},
        projects,
        work,
        loading: 0
    },
    mutations: {
        darkMode(state, darkMode: boolean) {
            state.darkMode = darkMode;
            localStorage.setItem("darkMode", darkMode ? 'dark' : 'light');
        },
        cacheClass(state, { id, cls }: { id: string, cls: any }) {
            (state.classCache as any)[id] = cls;
        },
        startLoad(state) {
            state.loading++;
        },
        finishLoad(state) {
            state.loading--;
        }
    },
    actions: {
        async getClassData({ state, commit }, id: string) {
            if (!(state.classCache as any)[id]) {
                commit("startLoad");
                commit("cacheClass", { id, cls: await (await window.fetch(`https://fireroad-dev.mit.edu/courses/lookup/${id}`)).json() });
                commit("finishLoad");
            }
        }
    },
    modules: {
    }
})
