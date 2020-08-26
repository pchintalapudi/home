<template>
  <article class="search">
    <section class="search-controls">
      <input
        type="text"
        name="tag-search"
        id="tag-search"
        v-model="inputText"
        @keydown.enter="inputText && possibilities.length ? filter=possibilities[0] : undefined"
      />
      <p class="guide">Filter By:</p>
      <filters-vue
        :filterType="'Type'"
        :options="['Course', 'Work Experience', 'Personal Project']"
        :colors="['--blue', '--green', '--yellow']"
        @select="filteringBy = $event"
        @deselect="filteringBy = null"
      ></filters-vue>
      <filters-vue
        :filterType="'Major'"
        :options="['Bioengineering', 'Computer Science']"
        :colors="['--green', '--red']"
        :noshow="!(filteringBy && filteringBy.filter === 'Course')"
        @select="major = $event"
        @deselect="major = null"
      ></filters-vue>
    </section>
    <ul class="results">
      <result-vue v-for="result in results" :key="`result-${result.id}`" v-bind="result"></result-vue>
    </ul>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import FiltersVue from "../search/Filters.vue";
import ResultVue from "../search/Result.vue";
enum PayloadType {
  CLASS,
  WORK,
  PROJECT,
}

class Trie<V> {
  private readonly links: Map<string, Trie<V>> = new Map();
  private value: V | undefined = undefined;

  private drainTo(key: string, index: number, out: Set<V>) {
    if (index === key.length) {
      if (this.value !== undefined) {
        out.add(this.value);
      }
      this.links.forEach((trie) => trie.drainTo(key, index, out));
    } else {
      let subtrie = this.links.get(key[index]);
      if (subtrie != null) {
        subtrie.drainTo(key, index + 1, out);
      }
    }
  }
  public drain(key: string): V[] {
    let out = new Set<V>();
    this.drainTo(key, 0, out);
    return Array.from(out);
  }
  private insertInto(key: string, value: V, index: number) {
    if (key.length === index) {
      this.value = value;
    } else {
      this.links.set(key[index], new Trie());
      this.links.get(key[index])!.insertInto(key, value, index + 1);
    }
  }
  public insert(key: string, value: V) {
    this.insertInto(key, value, 0);
  }

  private containsKey(key: string, index: number): boolean {
    if (index === key.length) {
      return this.value !== undefined;
    } else {
      let subtrie = this.links.get(key[index]);
      if (subtrie != null) {
        return subtrie.containsKey(key, index + 1);
      }
      return this.links.size === 0;
    }
  }

  public contains(key: string) {
    return this.containsKey(key, 0);
  }
}

export default Vue.extend({
  components: { FiltersVue, ResultVue },
  data() {
    return {
      filteringBy: null as { type: string; filter: string } | null,
      major: null as { type: string; filter: string } | null,
      inputText: "",
      filter: { id: "", payload: {}, payloadType: PayloadType.CLASS },
    };
  },
  computed: {
    courses(): Array<{
      id: string;
      payload: any;
      tags: string[];
      payloadType: PayloadType.CLASS;
    }> {
      return this.$store.state.classes.flatMap(
        (year: {
          semesters: Array<{
            classes: Array<{
              id: string;
              classification: string;
              tags: string[];
            }>;
          }>;
        }) =>
          year.semesters.flatMap(
            (sem: {
              classes: Array<{
                id: string;
                classification: string;
                tags: string[];
              }>;
            }) =>
              sem.classes
                .filter(
                  (course: {
                    id: string;
                    classification: string;
                    tags: string[];
                  }) =>
                    !this.filteringBy ||
                    this.filteringBy.filter !== "Course" ||
                    this.major === null ||
                    this.major.filter === course.classification ||
                    course.classification === "Both"
                )
                .map((cls) => ({
                  id: cls.id,
                  payload: cls,
                  tags: cls.tags,
                  payloadType: PayloadType.CLASS,
                }))
          )
      );
    },
    projects(): Array<{
      id: string;
      payload: any;
      tags: string[];
      payloadType: PayloadType.PROJECT;
    }> {
      return this.$store.state.projects.map(
        (project: { id: string; tags: string[] }) => ({
          id: project.id,
          payload: project,
          tags: project.tags,
          payloadType: PayloadType.PROJECT,
        })
      );
    },
    works(): Array<{
      id: string;
      payload: any;
      tags: string[];
      payloadType: PayloadType.WORK;
    }> {
      return this.$store.state.work.map((w: { id: string; tags: string }) => ({
        id: w.id,
        payload: w,
        tags: w.tags,
        payloadType: PayloadType.WORK,
      }));
    },
    tagTrie(): Trie<boolean> {
      let out = new Trie<boolean>();
      for (const word of this.inputText.split(" ")) {
        out.insert(word.toLowerCase(), true);
      }
      return out;
    },
    results(): Array<{ id: string; payload: any; payloadType: PayloadType }> {
      let source: Array<{
        id: string;
        payload: any;
        payloadType: PayloadType;
        tags: string[];
      }>;
      if (this.filteringBy == null) {
        source = [...this.courses, ...this.works, ...this.projects];
      } else {
        switch (this.filteringBy.filter) {
          case "Course":
            source = this.courses;
            break;
          case "Work Experience":
            source = this.works;
            break;
          case "Personal Project":
            source = this.projects;
            break;
          default:
            source = [];
            break;
        }
      }
      return source
        .map((result) => ({
          result,
          matches: result.tags
            .map((tag) => this.tagTrie.contains(tag))
            .reduce((a, b) => a + (b ? 1 : 0), 0),
        }))
        .filter((arr) => arr.matches > 0)
        .sort((a, b) =>
          a.matches < b.matches ? -1 : a.matches > b.matches ? 1 : 0
        )
        .map((arr) => arr.result);
    },
  },
});
</script>
<style scoped>
#tag-search {
  background-color: rgba(var(--fore-color), var(--level-2));
  font-size: 1.25em;
  padding: 5px;
  border-radius: 5px;
  width: 50%;
}
.results {
  overflow: auto;
  flex-flow: row nowrap;
}
.search-controls {
  flex-flow: row nowrap;
  align-items: center;
  padding: 10px;
  justify-content: center;
}
.guide {
  padding: 10px;
}
.search {
  padding: 20px;
}
[noshow] {
    visibility: hidden;
}
</style>