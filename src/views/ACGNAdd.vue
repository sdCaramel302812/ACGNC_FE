<template>
  <b-container class="form">
    <div style="margin-bottom: 20px;">
      <b-button variant="outline-danger" @click="returnSearchPage">返回</b-button>
      <b-button variant="success" style="margin-left: 50px; width: 100px;" @click="addRequest">新增</b-button>
      <b-button variant="info" style="float: right;" @click="tagAddToggle">tag</b-button>
    </div>
    <div v-if="!isAddTag">
      <b-row>
        <b-col>
          <b-form-group
            label="作品名"
          >
            <b-form-input v-model="worksTitle"></b-form-input>
          </b-form-group>
          <b-form-rating variant="success" no-border v-model="rate"></b-form-rating>
          <TagSearch :tagsList="tags" ref="tagSearch" />
        </b-col>
        <b-col>
          <b-form-group
            label="簡介"
          >
            <b-textarea style="height: 235px;" v-model="intro"></b-textarea>
          </b-form-group>
          
        </b-col>
      </b-row>
      <b-tabs style="margin-bottom: 100px;">
        <b-tab title="章節">
          <b-list-group>
            <b-list-group-item
              v-for="item in chapterContent"
              :key="item.id"
            >
              <b-button v-b-toggle="item.id" variant="outline-secondary" class="chapter-button">{{ item.title }}</b-button>
              <b-collapse :id="item.id">
                <b-row>
                  <b-input style="width: 30%; float: left;" v-model="item.title"></b-input>
                  <b-button
                    variant="danger"
                    style="position: absolute; right: 0px;"
                    @click="deleteChapter(item)"  
                  >delete</b-button>
                </b-row>
                  <ckeditor :editor="editor" v-model="item.content" :config="editorConfig"></ckeditor>
                
                
              </b-collapse>
            </b-list-group-item>
          </b-list-group>
          <b-button
            @click="addChapter"
            variant="outline-primary"
            class="chapter-button"
          >+</b-button>
        </b-tab>
        <b-tab title="時間軸"></b-tab>
      </b-tabs>
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
import TagSearch from '@/components/TagSearch.vue';
import { mapState, mapActions } from 'vuex';
import { API } from '@/utils/constant.js';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'ACGNAdd',
  components: {
    TagSearch,
  },
  data() {
    return {
      isAddTag: false,
      worksTitle: '',
      rate: 0,
      intro: '',
      // search for tags
      tagInput: '',
      worksTags: [],
      sortedTagList: [],
      // chapter content
      chapterContent: [],
      chapterId: 0,
      // ck editor
      editor: ClassicEditor,
      editorConfig: {
        ckfinder: {
          uploadUrl: API.IMG,
          options: {
            resourceType: "Images",
          }
        }
      },
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
    returnSearchPage() {
      this.$router.push('/acgn-search');
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
        if (this.worksTitle) {
          const infoReqBody = {
            title: this.worksTitle,
            tags: this.$refs.tagSearch.tags,
            rate: this.rate,
            intro: this.intro,
          };
          this.axios.post(API.WORKS_INFO, infoReqBody);
          const chapterReqBody = {
            title: this.worksTitle,
            chapter: this.chapterContent,
          }
          this.axios.post(API.WORKS_CHAPTER, chapterReqBody);
        }
      }
    },
    addChapter() {
      this.chapterContent.push({
        id: `id${this.chapterId}`,
        title: 'Title',
        content: '',
      });
      this.chapterId++;
    },
    deleteChapter(item) {
      this.chapterContent = this.chapterContent.filter(content => {
        return item.id !== content.id;
      });
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

.row {
  margin-left: 0px;
  margin-right: 0px;
}

::v-deep p {
  margin-bottom: 5px;
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

.chapter-button {
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  border: 0px;
}

.list-group-item {
  padding: 0px;
  background-color: rgb(241, 241, 241);
}
</style>