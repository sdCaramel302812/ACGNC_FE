<template>
  <div class="search-block">
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
          <b-input-group-append>
            <b-button style="height: 30px;" size="sm" text=" + " @click="openTagsModal"> + </b-button>
          </b-input-group-append>
        </b-input-group>
        <VuePerfectScrollbar style="max-height: 80px;">
        <div class="d-inline-block tag-form-block">
          
          <b-form-tag
            v-for="tag in tags"
            @remove="removeTag(tag)"
            :key="tag"
            :title="tag"
            :variant="tagVariant"
            class="mr-1"
          >{{ tag }}</b-form-tag>
          
        </div>
        </VuePerfectScrollbar>
      </template>
    </b-form-tags>
    <b-list-group class="result-list" v-if="resultList.length > 0">
      <VuePerfectScrollbar>
        <b-list-group-item 
          :key="item"
          v-for="item in resultList"
          class="result-item"
          @keyup="onListKeyUp"
          @keyup.enter="tagSelect(item)"
          @click="tagSelect(item)"
          button
        >
          {{ item }}
        </b-list-group-item>
      </VuePerfectScrollbar>
    </b-list-group>
    <MultiSelect
      :tagsList="sortedTagList"
      v-model="tags"
    />
  </div>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import fuzzsort from 'fuzzysort';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import MultiSelect from '@/components/MultiSelect.vue';

export default {
  name: 'SearchBar',
  components: {
    VuePerfectScrollbar,
    MultiSelect,
  },
  props: {
    tagsList: Array,
  },
  data() {
    return {
      searchText: '',
      tags: [],
      tagInput: '',
      resultList: [],
      sortedTagList: [],
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
    onKeyUp(event) {
      if (this.resultList.length > 0 && event.key === 'ArrowDown') {
        const elm = this.$el.querySelector('.list-group-item.result-item');
        elm.focus();
        return;
      }
      if (event.key === 'Enter') {
        this.clearTagSearch();
      }
    },
    onListKeyUp(event) {
      let elm = null;
      switch(event.key) {
        case 'ArrowUp':
          elm = event.target.previousElementSibling;
          break;
        case 'ArrowDown':
          elm = event.target.nextElementSibling;
          break;
        default:
          break;
      }
      if (elm) {
        elm.focus();
      }
    },
    tagSelect(item) {
      this.tags.push(item);
      this.clearTagSearch();
    },
    clearTagSearch(focus = true) {
      this.tagInput = '';
      this.resultList = [];
      
      if (focus) {
        const elm = this.$el.querySelector('.tag-input');
        elm.focus();
      } 
    },
    openTagsModal() {
      this.tagsList.sort((a, b) => {
        return b.count - a.count;
      });

      this.sortedTagList = [];
      this.tagsList.forEach(element => {
        this.sortedTagList.push(element.name);
      });

       this.$bvModal.show('tag-modal');
    },
  },
}
</script>
<style lang="scss" scoped>
.search-block {
  width: 100%;
  margin: auto;
  position: relative;
}

.tags-search {
  width: 100%;
  margin: auto;
  margin-top: 10px;
  background-color: rgba(149, 234, 247, 0.192);
}

.tag-input {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  height: 30px;
}

.result-list {
  max-height: 300px;
  width: 100%;
  text-align: center;
  position: absolute;
  z-index: 1;
}

.tag-form-block {
  font-size: 1.3rem;
}
</style>