<template>
  <b-container class="acgn-search">
    <router-view />
    <!--1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br> -->
  </b-container>
</template>
<script>
export default {
  name: 'ACGNSearch',
}
</script>
<style lang="scss" scoped>
.acgn-search {
  background-color: rgb(228, 228, 228);
}

.add-button {
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 0px;
  color: white;
  font-size: 38px;
  font-weight: 600;
  padding: 0px;
  line-height: 1.5;
  background-color: rgba(158, 201, 74, 0.5);

  &:hover {
    background-color: rgba(158, 201, 74, 1);
  }
}

.btn-secondary.focus, .btn-secondary:focus {
  box-shadow: none;
}

.btn-secondary:not(:disabled):not(.disabled).active,
.btn-secondary:not(:disabled):not(.disabled):active,
.show>.btn-secondary.dropdown-toggle {
  background-color: rgba(158, 201, 74, 0.5);
}
</style>