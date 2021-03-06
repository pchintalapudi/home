<template>
  <section class="summary-page">
    <article class="summary">
      <h2 class="glance">At a Glance</h2>
      <div class="cards">
        <icon-vue
          tooltip="Education"
          :link-color="'var(--blue)'"
          href="#education"
          :description="'Go to Education'"
        >
          <i class="graduation-cap"></i>
        </icon-vue>
        <card-vue
          :card-title="'Bioengineering S.B.'"
          :content="'Massachusetts Institute of Technology'"
          href="#bioengineering"
          :linkColor="'var(--blue)'"
        ></card-vue>
        <card-vue
          :card-title="'Computer Science and Engineering S.B.'"
          :content="'Massachusetts Institute of Technology'"
          href="#computers"
          :linkColor="'var(--blue)'"
        ></card-vue>
      </div>
      <div class="cards">
        <icon-vue
          tooltip="Work Experience"
          :linkColor="'var(--green)'"
          href="#work"
          :description="'Go to Work Experience'"
        >
          <i class="laptop"></i>
        </icon-vue>
        <card-vue
          v-for="exp in work"
          :key="`summary-${exp.company}-${exp.role}`"
          :card-title="exp.role"
          :content="exp.company"
          :href="`#${exp.id}`"
          :linkColor="'var(--green)'"
        >
          <template v-slot:rich-content>
            <p class="date">{{ d2s(exp.start) }} - {{ d2s(exp.end) }}</p>
          </template>
        </card-vue>
      </div>
      <div class="cards">
        <icon-vue
          tooltip="Personal Projects"
          href="#projects"
          :linkColor="'var(--yellow)'"
          :description="'Go to Personal Projects'"
        >
          <i class="clock"></i>
        </icon-vue>
        <card-vue
          v-for="project in projects"
          :key="`summary-${project.name}`"
          :card-title="project.name"
          :content="project.tags[0]"
          :href="`#${project.id}`"
          :linkColor="'var(--yellow)'"
        >
        </card-vue>
      </div>
    </article>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "../utils/Icon.vue";
import CardVue from "../utils/Card.vue";
export default Vue.extend({
  components: { IconVue, CardVue },
  computed: {
    work(): any[] {
      return this.$store.state.work;
    },
    projects(): any[] {
      return this.$store.state.projects;
    },
  },
  methods: {
    d2s(d: string | null) {
      if (!d) {
        return "Present";
      }
      const parts = d.split("-");
      const month = +parts[0] - 1;
      const year = +parts[1];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${months[month]} ${year}`;
    },
  },
});
</script>
<style>
.date {
  font-style: italic;
  text-transform: none;
  padding: 5px;
}
nav {
  width: 100vw;
  flex-flow: row wrap;
  padding: 10px;
}
.glance {
  text-align: center;
}
.dark-mode-switcher {
  transform: scale(0.5, 0.5);
}
.laptop::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform-origin: center top;
  transform: scale(0.5625, 0.375) translateY(27.5px);
  border: 5px solid rgb(var(--green));
  border-radius: 5px;
  transition: border-color 300ms, background-color 300ms;
}
.laptop::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 9px solid rgb(var(--green));
  border-radius: 5px;
  transform: scale(0.5625, 0.5) translateY(17.5px) rotate3d(1, 0, 0, 70deg);
  transition: border-color 300ms, background-color 300ms;
}
.graduation-cap::before {
  position: absolute;
  content: "";
  background-color: rgb(var(--blue));
  transition: background-color 300ms;
  height: 10px;
  width: 19.5px;
  transform: translate(-10px, 20px);
  border-bottom-left-radius: 5px 2px;
  border-bottom-right-radius: 5px 2px;
}
.graduation-cap::after {
  position: absolute;
  content: "";
  height: 10px;
  width: 20px;
  background-color: rgb(var(--blue));
  box-shadow: -7.5px 5.5px 0 0px rgb(var(--mask-color));
  transition: background-color 300ms, box-shadow 300ms;
  transform: translate(-10px, 10px) rotate(-10deg) skewX(60deg)
    rotate3d(1, 0, 0, 45deg);
}
.clock::before {
  content: "";
  height: 27.5px;
  width: 27.5px;
  border-radius: 50%;
  border: 2.5px solid rgb(var(--yellow));
  transform: translateY(7.75px);
  box-sizing: border-box;
  transition: border-color 300ms;
}
.clock::after {
  content: "";
  height: 8px;
  width: 11px;
  box-sizing: border-box;
  border-left: 2px solid rgb(var(--yellow));
  border-bottom: 2px solid rgb(var(--yellow));
  transform: translate(7.5px, -5.5px) rotate(135deg);
  transition: border-color 300ms;
}
.hammer::before {
  content: "";
  height: 5px;
  width: 20px;
  background-color: rgb(var(--red));
  transform: translate(-2.5px, 22.5px) rotate(-45deg);
  border-radius: 1.25px;
  transition: background-color 300ms;
}
.hammer::after {
  content: "";
  height: 10px;
  width: 17.5px;
  background-color: rgb(var(--red));
  border-radius: 2.5px;
  transform: rotate(45deg) translateX(8.5px);
  transition: background-color 300ms;
}
.summary {
  justify-content: space-evenly;
  width: 100vw;
  padding: 10vh 10px;
  flex: 1;
  align-items: stretch;
}
.summary > .cards {
  flex-flow: row nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 150px;
  flex: 1;
  align-items: center;
}
.summary > .cards .icon:not([href="#skills"]) ~ .card {
  min-width: 200px;
}
.date {
  font-size: 0.75em;
}
</style>