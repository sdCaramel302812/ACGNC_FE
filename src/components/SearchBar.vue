<template>
  <div class="search-block">
    <b-input-group
      class="text-search"
    >
      <b-form-input
        :placeholder="placeholder"
        @keyup.enter="search()"
        v-model="searchText"
        style="height: 35px;"
      ></b-form-input>
      <b-input-group-append>
        <b-button style="height: 35px;" size="sm" text="Search" @click="search()">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    <TagSearch :tagsList="tagsList" ref="tagSearch" />
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import MultiSelect from '@/components/MultiSelect.vue';
import TagSearch from '@/components/TagSearch.vue';

export default {
  name: 'SearchBar',
  components: {
    VuePerfectScrollbar,
    MultiSelect,
    TagSearch,
  },
  props: {
    placeholder: String,
    tagsList: Array,
  },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    search() {
      this.$emit('payload', { 
        text: this.searchText,
        tags: this.$refs.tagSearch.tags
      });
    },
  },
}
</script>
<style lang="scss" scoped>
.search-block {
  padding-top: 15px;
  width: 400px;
  margin: auto;
  position: relative;
}

.text-search {
  width: 300px;
  height: 40px;
  margin: auto;
}
</style>