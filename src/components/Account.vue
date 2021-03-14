<template>
  <div>
    <b-dropdown right variant="link" no-caret class="test-btn">
      <template #button-content class="inner-button">
        <b-img src="@/assets/person-24px.svg"></b-img>
      </template>
      <b-dropdown-item @click="logout">
        Logout
      </b-dropdown-item>
    </b-dropdown>  
  </div>  
</template>
<script>
export default {
  name: 'Account',
  methods: {
    logout() {
      this.$cookie.set('jwt', '');
      this.$router.push('/login');
    }
  },
}
</script>
<style lang="scss" scoped>
.test-btn {
  background-color: transparent;
  border-radius: 50%;
}

::v-deep #__BVID__11__BV_toggle_ {
  box-shadow: none;
  border-radius: 50%;
  padding: 5px;
  &:hover {
    background-color: rgba(99, 177, 153, 0.7);
  }
}
</style>