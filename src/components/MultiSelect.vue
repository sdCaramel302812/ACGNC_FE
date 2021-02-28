<template>
  <b-modal 
    id="tag-modal"
    class="tag-select"
    hide-footer
    hide-header
  >

  <b-button variant="outline-success" class="select-all-button" @click="selectAll">
    select/unselect all
  </b-button>
  <b-list-group>
    <VuePerfectScrollbar>
      <MultiSelectList class="tag-list" :options="tagsList" v-model="selected" />
    </VuePerfectScrollbar>
  </b-list-group>
    
  </b-modal>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import MultiSelectList from '@/components/MultiSelectList.vue';

export default {
  name: 'MultiSelect',
  props: {
    tagsList: Array,
    parentSelected: Array,
  },
  model: {
    prop: 'parentSelected',
  },
  components: {
    VuePerfectScrollbar,
    MultiSelectList,
  },
  data() {
    return {
      selected: this.parentSelected,
    };
  },
  watch: {
    selected() {
      this.$emit('input', this.selected);
    },
  },
  methods: {
    selectAll() {
      if (this.selected.length) {
        this.selected = [];
      } else {
        this.selected = Object.assign([], this.tagsList);
      }
    },
  },
}

/**
 * <b-form-checkbox-group
        v-model="selected"
        :options="tags"
        stacked
        buttons
        button-variant="outline-info"
        class="tag-list"
      >
      </b-form-checkbox-group>
      
 */
</script>
<style lang="scss" scoped>
::v-deep #tag-modal___BV_modal_content_ {
  width: 300px;
  top: 150px;
  margin: auto;
  max-height: 500px;
}

.tag-list {
  max-height: 400px;
  width: 100%;
  top: 200px;
}

.select-all-button {
  width: 100%;
}
</style>