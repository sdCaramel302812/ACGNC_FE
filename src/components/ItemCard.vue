<template>
  <b-card class="item-card">
    <div class="ellipsis-text">
      {{ title }}
    </div>
      
    
    <div class="rating">
      {{ media.join(" / ") }}
      <b-img src="@/assets/star.svg" class="star-img"></b-img>
      {{ rate }}
    </div>
    
    
  </b-card>
</template>
<script>
export default {
  props: {
    title: String,
    rate: Number,
    media: Array,
  },
}
</script>
<style lang="scss" scoped>
.item-card {
  height: 55px;
  font-size: 20px;
  line-height: 1.5;
  padding-top: 15px;
  padding-left: 15px;
  text-overflow: ellipsis;
  &:hover {
    background-color: rgb(241, 248, 248);
    cursor: pointer;
  }
}

.card-body {
  padding: 0px;
}

.rating {
  //position: absolute;
  margin-right: 15px;
  float: right;
  //right: 60px;
}

.star-img {
  margin-left: 15px;
  margin-right: 5px;
  vertical-align: text-top;
}

.ellipsis-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  float: left;
}
</style>