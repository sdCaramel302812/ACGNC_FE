<template>
  <div>
    <SearchBar placeholder="test" @payload="search" />
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
    console.log(this.tags);
  },
}
</script>
<style lang="scss" scoped>

</style>