<template>
  <b-container class="acgn-search">
    <SearchBar placeholder="作品名" @payload="search" :tagsList="tags" />
    
    <!--1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>
    1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br>1<br><!- -->
  </b-container>
</template>
<script>
import SearchBar from '@/components/SearchBar.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ACGNSearch',
  components: {
    SearchBar,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('acgn', ['tags']),
  },
  methods: {
    ...mapActions('acgn', ['fetchTags']),
    search(payload) {
      console.log(payload);
    }
  },
  async mounted() {
    await this.fetchTags();
  },
}
</script>
<style lang="scss" scoped>
.acgn-search {
  background-color: rgb(228, 228, 228);
}
</style>