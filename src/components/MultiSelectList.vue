<template>
  <div>
    <b-list-group>
      <VuePerfectScrollbar>
        <b-button
          :key="item"
          v-for="[i, item] of options.entries()"
          class="list-button"
          button
          variant="outline-info"
          @click="changeState(i)"
          :class="getState(i)"
        >
          {{ item }}
        </b-button>
      </VuePerfectScrollbar>
    </b-list-group>
  </div>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  name: 'MultiSelectList',
  props: {
    options: Array,
    selected: Array,
  },
  model: {
    prop: 'selected',
  },
  components: {
    VuePerfectScrollbar,
  },
  data() {
    return {
      state: [],
      foo: false,
    };
  },
  watch: {
    selected() {
      this.syncState();
      this.updateTick();
    }
  },
  methods: {
    changeState(index) {
      this.updateTick();
      if (index >= 0) {  
        this.state[index] = !this.state[index];
      } else {
        return;
      }

      const result = [];
      for (const [i, item] of this.state.entries()) {
        if (item) {
          result.push(this.options[i]);
        }
      }
      this.$emit('input', result);
    },
    getState(index) {
      if (this.state.length && this.state[index]) {
        return 'selected';
      } else {
        return 'unselected';
      }
    },
    syncState() {
      this.state.fill(false);
      this.selected.forEach(element => {
        for (const [i, item] of this.options.entries()) {
          if (item === element) {
            this.state[i] = true;
          }
        }
      });
    },
    updateTick() {
      const tmp = Object.assign([], this.state);
      this.state = Object.assign([], tmp);
    }
  },
  mounted() {
    this.state = [];
    this.state = new Array(this.options.length);
    this.state.fill(false);

    this.syncState();
  },
}
</script>
<style lang="scss" scoped>
.list-button {
  width: 100%;
  margin-top: -1px;
  margin-bottom: 0px;
  &:hover {
    color: #fff;
    background-color: #3cc6db;
    border-color: #17a2b8;
  }
}

::v-deep .selected {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

::v-deep .unselected {
  color: #17a2b8;
  background-color: #fff;
  border-color: #17a2b8;
}
</style>