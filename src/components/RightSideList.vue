<template>
  <div class="sidebar" :class="sidebarStatus()">

  </div>
</template>
<script>

export default {
  name: 'RightSideList',
  methods: {
    sidebarStatus() {
      return this.navbarClosed ? 'sidebar-closed' : 'sidebar-open';
    },
  },
}
</script>
<style lang="scss" scoped>
.sidebar {
  height: 100%;
  position: fixed;
  top: 60px;
  right: 0px;
  background-color: rgb(240, 240, 240);
  padding-top: 20px;
  width: 100px;
}

.sidebar-closed {
  width: 0px;
}

.sidebar-open {
  width: 100px;
}

.nav-link {
  padding-left: 10px;
  color: rgb(116, 116, 116);
}
</style>