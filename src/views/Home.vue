<template>
  <div class="home">
    <b-row no-gutters>
      <b-col>
        <TopNavigation />
      </b-col>
    </b-row>
    
    <LeftNavigation />
    <div :class="mainAreaStatus()" class="main-area">
        <router-view />
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

.main-area {
  height: calc(100vh - 60px);
  position: fixed;
  overflow-y: auto;
}

.main-area-full {
  margin-left: 0px;
  width: 100%;
}

.main-area-left-nav {
  margin-left: 240px;
  width: calc(100% - 240px);
}
</style>
