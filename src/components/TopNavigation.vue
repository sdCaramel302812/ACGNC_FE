<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="main-nav">
      <b-button class="nav-button" @click="toggleLeftNav">
        <b-img src="@/assets/list-24px.svg"></b-img>
      </b-button>
      <b-navbar-brand href="#" style="float: left;">ACGN Category</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <Account class="account-button" />
      </b-navbar-nav>
      
    </b-navbar>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import Account from '@/components/Account.vue';

export default {
  name: 'TopNavigation',
  components: {
    Account,
  },
  computed: {
    ...mapState('home', ['navbarClosed']),
  },
  methods: {
    ...mapMutations('home', ['setNavbarClosed']),
    toggleLeftNav() {
      console.log(this.navbarClosed);
      this.setNavbarClosed(!this.navbarClosed);
    }
  },
}
</script>
<style lang="scss" scoped>
.main-nav {
  padding: 8px;
  width: 100vw;
}

.nav-button {
  background-color: transparent;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 0px;
  outline: 0px;
  box-shadow: none;
}

.account-button {
  margin-right: 15px;
}
</style>