<template>
  <b-container class="form">
    <div style="margin-bottom: 20px;">
      <b-button variant="outline-danger">返回</b-button>
      <b-button variant="success" style="margin-left: 50px; width: 100px;" @click="addRequest">新增</b-button>
      <b-button variant="info" style="float: right;" @click="tagAddToggle">tag</b-button>
    </div>
    <div v-if="!isAddTag">
      <b-row>
        <b-col>
          <b-form-group
            label="作品名"
          >
            <b-form-input></b-form-input>
          </b-form-group>
          <label>tag</label>
          <b-button class="select-tag-button" @click="openTagsModal">select</b-button>
          <b-list-group style="height: 153px;">
            <VuePerfectScrollbar>
              <b-list-group-item
                v-for="item in worksTags"
                :key="item"
                style="height: 30px; line-height: 0.6; font-size: 14px;"
              >{{ item }}</b-list-group-item>
            </VuePerfectScrollbar>
            
          </b-list-group>
        </b-col>
        <b-col>
          <b-form-group
            label="簡介"
          >
            <b-textarea style="height: 240px;"></b-textarea>
          </b-form-group>
          
        </b-col>
        <MultiSelect
          :tagsList="sortedTagList"
          v-model="worksTags"
        />
      </b-row>
    </div>
    <div v-if="isAddTag">
      <b-row>
        <b-col sm="2" style="line-height: 2.1;">
          Tag :
        </b-col>
        <b-col sm="10">
          <b-form-input
            v-model="tagInput"
            :state="isTagNotExist()"
            @keyup.enter="addRequest"
          ></b-form-input>
        </b-col>
      </b-row>
    </div>
    

  </b-container>  
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import MultiSelect from '@/components/MultiSelect.vue';
import { mapState, mapActions } from 'vuex';
import { API } from '@/utils/constant.js';

export default {
  name: 'ACGNAdd',
  components: {
    VuePerfectScrollbar,
    MultiSelect,
  },
  data() {
    return {
      isAddTag: false,
      tagInput: '',
      worksTags: [],
      sortedTagList: [],
    };
  },
  computed: {
    ...mapState('acgn', ['tags']),
  },
  methods: {
    ...mapActions('acgn', ['fetchTags']),
    tagAddToggle() {
      this.isAddTag = !this.isAddTag;
    },
    isTagNotExist() {
      if (!this.tagInput) {
        return null;
      } else if (this.tags.find(element => element.name === this.tagInput)) {
        return false;
      } else {
        return true;
      }
    },
    openTagsModal() {
      this.tags.sort((a, b) => {
        return b.count - a.count;
      });

      this.sortedTagList = [];
      this.tags.forEach(element => {
        this.sortedTagList.push(element.name);
      });

       this.$bvModal.show('tag-modal');
    },
    addRequest() {
      const reqBody = {};
      if (this.isAddTag) {
        if (this.isTagNotExist() && this.tagInput) {
          reqBody.name = this.tagInput;
          this.axios.post(API.WORKS_TAG, reqBody)
          .then(() => {
            location.reload();
            this.tagInput = '';
          });
        }
      } else {
        console.log('foo');
      }
    },
  },
  async mounted() {
    await this.fetchTags();
  },
}
</script>
<style lang="scss" scoped>
.form {
  width: 90%;
  padding-top: 40px;
  min-width: 400px;
}

.list-item {
  height: 32px;
  padding: 3px;
}

.select-tag-button {
  height: 25px;
  font-size: 14px;
  padding: 2px 8px;
  margin-left: 30px;
}

::v-deep .ps__rail-y {
  z-index: 10;
}
</style>