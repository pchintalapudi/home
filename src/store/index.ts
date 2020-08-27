import Vue from 'vue';
import Vuex from 'vuex';
import classes from './classes.json';
import projects from "./projects.json";
import work from "./work.json";

Vue.use(Vuex);

const classMap = new Map(classes.flatMap(year => year.semesters.flatMap(semester => semester.classes.map(cls => [cls.id, cls]))));

export default new Vuex.Store({
    state: {
        darkMode: localStorage.getItem('darkMode') === 'dark',
        classes,
        classCache: {},
        projects,
        work,
        loading: 0,
        highlighted: ""
    },
    mutations: {
        darkMode(state, darkMode: boolean) {
            state.darkMode = darkMode;
            localStorage.setItem("darkMode", darkMode ? 'dark' : 'light');
        },
        cacheClass(state, { id, cls }: { id: string, cls: any }) {
            (state.classCache as any)[id] = cls;
            let clz = classMap.get(id)!;
            for (const keyword of cls.title.split(" ")) {
                clz.tags.push(keyword.toLowerCase());
            }
            clz.tags = Array.from(new Set(clz.tags));
        },
        startLoad(state) {
            state.loading++;
        },
        finishLoad(state) {
            state.loading--;
        },
        highlight(state, highlighted) {
            state.highlighted = highlighted;
            console.log("highlighted " + highlighted);
        },
        dehighlight(state, highlighted) {
            if (state.highlighted === highlighted) {
                console.log("dehighlighted " + highlighted);
                state.highlighted = "";
            }
        }
    },
    actions: {
        async getClassData({ state, commit }, id: string) {
            if (!(state.classCache as any)[id]) {
                commit("startLoad");
                commit("cacheClass", { id, cls: await (await window.fetch(`https://fireroad-dev.mit.edu/courses/lookup/${id}`)).json() });
                commit("finishLoad");
            }
        },
        highlight({ commit }, highlighted) {
            commit("highlight", highlighted);
            window.setTimeout(() => commit("dehighlight", highlighted), 1000);
        }
    },
    modules: {
    }
})
