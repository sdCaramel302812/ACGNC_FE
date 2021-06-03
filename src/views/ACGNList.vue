<template>
  <div>
    <SearchBar placeholder="作品名" @payload="search" :tagsList="tags" />

    <div class="list-block">
      <b-pagination align="center"></b-pagination>
      <ItemCard :rate="5" :media="['動畫', '漫畫']" title="少女歌劇" />
    </div>
    
    <b-button class="add-button" @click="addACGN">
      +
    </b-button>
  </div>
</template>
<script>
import SearchBar from '@/components/SearchBar.vue';
import ItemCard from '@/components/ItemCard.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ACGNSearch',
  components: {
    SearchBar,
    ItemCard,
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
    },
    addACGN() {
      this.$router.push('/acgn-search/add');
    },
  },
  async mounted() {
    await this.fetchTags();
  },
}
</script>
<style lang="scss" scoped>
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

.list-block {
  margin: auto;
  margin-top: 20px;
  min-width: 500px;
  width: 85%;
}
</style>