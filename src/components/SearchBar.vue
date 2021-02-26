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
    >
      <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, removeTag }">
        <b-input-group class="mb-2">
          <b-form-input
            v-bind="inputAttrs"
            v-on="inputHandlers"
            placeholder="New tag - Press enter to add"
            v-model="tagInput"
            class="form-control tag-input"
            @keyup="onKeyUp"
            autocomplete="off"
          ></b-form-input>
        </b-input-group>
        <div class="d-inline-block" style="font-size: 1.5rem;">
          <b-form-tag
            v-for="tag in tags"
            @remove="removeTag(tag)"
            :key="tag"
            :title="tag"
            :variant="tagVariant"
            class="mr-1"
          >{{ tag }}</b-form-tag>
        </div>
      </template>
    </b-form-tags>
    <b-list-group class="result-list" v-if="resultList.length > 0">
      <VuePerfectScrollbar>
        <b-list-group-item 
          :key="item"
          v-for="item in resultList"
          class="result-item"
        >
          {{ item }}
        </b-list-group-item>
      </VuePerfectScrollbar>
    </b-list-group>
  </div>
</template>
<script>
import fuzzsort from 'fuzzysort';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  name: 'SearchBar',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    placeholder: String,
    tagsList: Array,
  },
  data() {
    return {
      searchText: '',
      tags: [],
      tagInput: '',
      resultList: [],
    };
  },
  watch: {
    tagInput(val) {
      fuzzsort.goAsync(val, this.tagsList, {
        keys: ['name'],
      })
      .then(results => {
        this.resultList = [];
        results.forEach(element => {
          this.resultList.push(element[0].target);
        });
      });
    }
  },
  methods: {
    search() {
      this.$emit('payload', { 
        text: this.searchText,
        tags: this.tags
      });
    },
    onKeyUp(event) {
      if (this.resultList.length > 0 && event.key === 'ArrowDown') {
        console.log('down');
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.search-block {
  padding-top: 15px;
  height: 180px;
  width: 400px;
  margin: auto;
}

.text-search {
  width: 300px;
  height: 40px;
  margin: auto;
}

.tags-search {
  width: 400px;
  margin: auto;
  margin-top: 10px;
  background-color: rgba(23, 162, 184, 0.1);
}

.tag-input {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.result-list {
  max-height: 300px;
  width: 400px;
  text-align: center;
  z-index: 1;
}
</style>