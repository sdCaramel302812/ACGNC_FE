<template>
  <div id="tool-bar" class="sidebar" :class="sidebarStatus()">
    <b-navbar-nav>
      <b-nav-item 
        class="nav-link"
        @click="$router.push({ path: '/acgn-search' })"  
      >ACGN Search</b-nav-item>
        <b-nav-item 
        class="nav-link"
        @click="$router.push({ path: '/' })"  
      >Home</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 3</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 4</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 5</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 6</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 7</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 8</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 9</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 10</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 11</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 12</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 13</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 14</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 15</b-nav-item>
        <b-nav-item class="nav-link">ACGN Category 16</b-nav-item>
    </b-navbar-nav>
        

  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'LeftNavigation',
  computed: {
    ...mapState('home', ['navbarClosed']),
  },
  methods: {
    sidebarStatus() {
      return this.navbarClosed ? 'sidebar-closed' : 'sidebar-open';
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  height: calc(100vh - 60px);
  position: fixed;
  z-index: 1;
  top: 60px;
  left: 0;
  background-color: rgb(240, 240, 240);
  overflow-x: hidden;
  padding-top: 20px;
}

.sidebar-closed {
  width: 0px;
}

.sidebar-open {
  width: 240px;
}

.nav-link {
  padding-left: 10px;
  color: rgb(116, 116, 116);
}
</style>