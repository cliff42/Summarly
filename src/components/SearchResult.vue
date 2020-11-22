<template>
  <div class="search-result">
    <div class="header">
      <span class="section">{{ section }}</span>
      <span class="page">pg. {{ page }}</span>
    </div>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResult',
  props: {
    section: String,
    page: Number,
    description: String
  },
  setup() {

  }
});
</script>

<style lang="less">
.search-result {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fdfdfd;
  border: 1px solid #d3d3d3;

  .header {
    font-size: 14px;
    margin-bottom: 10px;

    .section {
      float: left;
      font-weight: bold;
    }

    .page {
      float: right;
    }
  }

  .description {
    font-size: 12px;
    text-align: left;
    word-break: break-word;
    word-wrap: break-word;
  }
}
</style>