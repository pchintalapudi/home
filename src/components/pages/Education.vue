<template>
  <article id="education">
    <icon-vue :icon-scale="3">
      <i class="graduation-cap"></i>
    </icon-vue>
    <h2>Education</h2>
    <h3 id="undergrad">Massacusetts Institute of Technology</h3>
    <article class="classes">
      <section class="headers">
        <h3 class="bio">Bioengineering</h3>
        <h3 class="both">Both</h3>
        <h3 class="cs">Computer Science</h3>
      </section>
      <article class="courses">
        <section v-for="year in correctedClasses" :key="year.year" class="empty">
          <section
            v-for="{term, classes} in year.terms"
            :key="`${year.year}-${term}`"
            class="row"
            :upcoming="upcoming(year.year, term)"
          >
            <section class="bio">
              <class-card-vue
                v-for="cls in classes.bio"
                :key="cls.id"
                :year="year.year"
                :term="term"
                :id="cls.id"
                @describe-class="descriptorProps = {...$event, theme:upcoming(year.year, term)?'upcoming':'bio'}"
              ></class-card-vue>
            </section>
            <section class="both">
              <class-card-vue
                v-for="cls in classes.both"
                :key="cls.id"
                :year="year.year"
                :term="term"
                :id="cls.id"
                @describe-class="descriptorProps = {...$event, theme:upcoming(year.year, term)?'upcoming':'both'}"
              ></class-card-vue>
            </section>
            <section class="cs">
              <class-card-vue
                v-for="cls in classes.cs"
                :key="cls.id"
                :year="year.year"
                :term="term"
                :id="cls.id"
                @describe-class="descriptorProps = {...$event, theme:upcoming(year.year, term)?'upcoming':'cs'}"
              ></class-card-vue>
            </section>
          </section>
        </section>
        <transition name="descriptor">
          <class-descriptor-vue
            :class="descriptorProps.theme"
            v-bind="descriptorProps"
            @close-descriptor="descriptorProps.id=''"
            v-if="descriptorProps.id && descriptorProps.title"
          ></class-descriptor-vue>
        </transition>
      </article>
    </article>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "../utils/Icon.vue";
import ClassCardVue from "../classes/ClassCard.vue";
import ClassDescriptorVue from "../classes/ClassDescriptor.vue";
export default Vue.extend({
  components: { IconVue, ClassCardVue, ClassDescriptorVue },
  data() {
    return {
      descriptorProps: {
        title: "",
        description: "",
        id: "",
        term: "",
        year: 0,
        theme: "",
      },
    };
  },
  computed: {
    classes(): any[] {
      return this.$store.state.classes;
    },
    correctedClasses(): any[] {
      console.log(this.classes);
      return this.classes.map((year_obj) => {
        let terms = [];
        let year = year_obj.Year;
        for (const term in year_obj) {
          if (term != "Year") {
            terms.push({ term, classes: this.typeSplit(year_obj[term]) });
          }
        }
        return { year, terms };
      });
    },
  },
  methods: {
    typeSplit(classes: any[]): { bio: any[]; both: any[]; cs: any[] } {
      const out = { bio: [] as any[], both: [] as any[], cs: [] as any[] };
      for (const cls of classes) {
        switch (cls.classification) {
          case "Bioengineering":
            out.bio.push(cls);
            break;
          case "Both":
            out.both.push(cls);
            break;
          case "Computers":
            out.cs.push(cls);
            break;
        }
      }
      return out;
    },
    upcoming(year: number, term: string) {
      let current = new Date();
      let compare = new Date();
      switch (term) {
        case "Spring":
          compare.setFullYear(year, 6, 1);
          break;
        case "IAP":
          compare.setFullYear(year, 2, 1);
          break;
        case "Fall":
          compare.setFullYear(year + 1, 1, 1);
          break;
        case "Summer":
          compare.setFullYear(year, 9, 1);
          break;
        default:
          return false;
      }
      return current < compare;
    },
  },
});
</script>
<style scoped>
h2 {
  padding: 10px;
}
.headers {
  flex-flow: row nowrap;
  align-self: stretch;
  padding: 10px 0;
}
.headers > * {
  width: 33%;
  text-align: center;
  color: rgb(var(--link-color));
  transition: color 300ms;
}
.classes {
  align-self: stretch;
  position: relative;
}
.courses {
  flex-flow: column-reverse nowrap;
  padding: 10px 0;
}
#education {
  align-items: center;
}
.empty {
  display: contents;
}
.row {
  flex-flow: row nowrap;
  align-self: stretch;
  justify-content: space-evenly;
}
.row > * {
  width: 33%;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  padding: 5px;
}
.row > * > .class-card {
  flex-basis: 50%;
  min-width: 150px;
}
.bio {
  --link-color: var(--green);
}
.both {
  --link-color: var(--yellow);
}
.cs {
  --link-color: var(--red);
}
.upcoming,
[upcoming] > * {
  --link-color: var(--blue);
}
.descriptor {
  position: fixed;
  width: 30vw;
  min-width: 500px;
  height: 300px;
  right: 2.5vw;
  bottom: 2.5vh;
  transition: opacity 300ms;
  z-index: 1;
}
@media (max-width:700px) {
    .descriptor {
        width: 100vw;
        min-width: 100vw;
        bottom:0;
        right:initial;
    }
}
@media (max-height: 500px) {
    .descriptor {
        height: 100vh;
    }
}
.descriptor-enter, .descriptor-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.courses > * > [upcoming] {
  background-color: rgba(var(--blue), 0.125);
}
</style>