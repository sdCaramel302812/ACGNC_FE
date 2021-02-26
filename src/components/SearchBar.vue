<template>
  <div class="search-block">
    <b-input-group
      class="text-search"
    >
      <b-form-input
        :placeholder="placeholder"
        @keyup.enter="search()"
        v-model="searchText"
      ></b-form-input>
      <b-input-group-append>
        <b-button size="sm" text="Search" @click="search()">Search</b-button>
      </b-input-group-append>
    </b-input-group>
    <b-form-tags 
      class="tags-search"
      input-id="tags-basic" 
      remove-on-delete
      v-model="tags"
    ></b-form-tags>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  props: {
    placeholder: String,
    tagsList: Array
  },
  data() {
    return {
      searchText: '',
      tags: [],
    };
  },
  methods: {
    search() {
      this.$emit('payload', { 
        text: this.searchText,
        tags: this.tags
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.search-block {
  padding-top: 15px;
}

.text-search {
  margin: auto;
  width: 300px;
  height: 40px;
}

.tags-search {
  width: 400px;
  margin: auto;
  margin-top: 10px;
  background-color: rgba(23, 162, 184, 0.1);
}
</style>