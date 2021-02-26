<template>
  <div>
    <SearchBar placeholder="作品名" @payload="search" :tagsList="tags" />
    123<br>345<br>jkhjk<br>hk<br>kjhk<br>mh<br>ghj<br>jhg<br>jhg<br>jhg<br>jhg<br>
  </div>
</template>
<script>
import SearchBar from '@/components/SearchBar.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ACGNSearch',
  components: {
    SearchBar,
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

</style>