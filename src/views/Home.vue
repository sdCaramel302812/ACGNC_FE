<template>
  <div class="home">
    <TopNavigation />
    <LeftNavigation />
    <div :class="mainAreaStatus()">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNavigation from '@/components/TopNavigation.vue';
import LeftNavigation from '@/components/LeftNavigation.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    TopNavigation,
    LeftNavigation,
  },
  computed: {
    ...mapState('home', ['navbarClosed']),
  },
  methods: {
    mainAreaStatus() {
      return this.navbarClosed ? 'main-area-full' : 'main-area-left-nav';
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  background-color: rgb(228, 228, 228);
  width: 100vw;
  height: 100vh;
}

.main-area-full {
  margin-left: 0px;
}

.main-area-left-nav {
  margin-left: 240px;
}
</style>
