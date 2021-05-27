<template>
  <article id="education">
    <icon-vue :icon-scale="3">
      <i class="graduation-cap"></i>
    </icon-vue>
    <h2>Education</h2>
    <h3 id="undergrad">Massacusetts Institute of Technology</h3>
    <article class="classes">
      <section class="headers">
        <h3 class="cs" id="computers">Computer Science</h3>
        <h3 class="both">Interdisciplinary</h3>
        <h3 class="bio" id="bioengineering">Bioengineering</h3>
      </section>
      <article class="courses">
        <section class="cs">
          <class-card-vue
            v-for="cls in csClasses"
            :key="cls.id"
            :year="cls.year"
            :term="cls.sem"
            :id="cls.id"
            @describe-class="
              descriptorProps = {
                ...$event,
                theme: upcoming(cls.year, cls.term) ? 'upcoming' : 'cs',
              }
            "
          ></class-card-vue>
        </section>
        <section class="both">
          <class-card-vue
            v-for="cls in bothClasses"
            :key="cls.id"
            :year="cls.year"
            :term="cls.sem"
            :id="cls.id"
            @describe-class="
              descriptorProps = {
                ...$event,
                theme: upcoming(cls.year, cls.term) ? 'upcoming' : 'both',
              }
            "
          ></class-card-vue>
        </section>
        <section class="bio">
          <class-card-vue
            v-for="cls in bioClasses"
            :key="cls.id"
            :year="cls.year"
            :term="cls.sem"
            :id="cls.id"
            @describe-class="
              descriptorProps = {
                ...$event,
                theme: upcoming(cls.year, cls.term) ? 'upcoming' : 'bio',
              }
            "
          ></class-card-vue>
        </section>
        <transition name="descriptor">
          <class-descriptor-vue
            :class="descriptorProps.theme"
            v-bind="descriptorProps"
            @close-descriptor="descriptorProps.id = ''"
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
      return this.classes.map((year_obj) => {
        return {
          year: year_obj.year,
          terms: year_obj.semesters.map((sem: any) => ({
            term: sem.name,
            courses: this.typeSplit(sem.classes),
          })),
        };
      });
    },
    bioClasses(): any[] {
      return this.correctedClasses.flatMap((yr) =>
        yr.terms.flatMap((sem: any) => sem.courses.bio.map((c:any) => ({...c, year:yr.year, sem:sem.term})))
      ).reverse();
    },
    csClasses(): any[] {
      return this.correctedClasses.flatMap((yr) =>
        yr.terms.flatMap((sem: any) => sem.courses.cs.map((c:any) => ({...c, year:yr.year, sem:sem.term})))
      ).reverse();
    },
    bothClasses(): any[] {
      return this.correctedClasses.flatMap((yr) =>
        yr.terms.flatMap((sem: any) => sem.courses.both.map((c:any) => ({...c, year:yr.year, sem:sem.term})))
      ).reverse();
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
          case "Computer Science":
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
          compare.setFullYear(year, 5, 1);
          break;
        case "IAP":
          compare.setFullYear(year, 1, 1);
          break;
        case "Fall":
          compare.setFullYear(year + 1, 0, 1);
          break;
        case "Summer":
          compare.setFullYear(year, 8, 1);
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
#undergrad {
  padding-bottom: 20px;
}
.headers {
  flex-flow: row nowrap;
  align-self: stretch;
  padding: 10px 0;
  font-size: 1.25em;
}
.headers > * {
  width: 33%;
  text-align: center;
  color: rgb(var(--link-color));
  transition: color 300ms;
}
.courses {
  flex-flow: row nowrap;
  padding: 10px 20px;
}
#education {
  align-items: center;
}
.empty {
  display: contents;
}
.class-card {
  flex: 1;
  flex-basis: calc(50% - 20px);
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
.courses > section {
  flex-flow: row wrap;
  flex-basis: 33%;
  padding: 0 20px;
  gap: 10px;
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
@media (max-width: 700px) {
  .descriptor {
    width: 100vw;
    min-width: 100vw;
    bottom: 0;
    right: initial;
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
.courses [upcoming] {
  background-color: rgba(var(--blue), 0.125);
}
</style>