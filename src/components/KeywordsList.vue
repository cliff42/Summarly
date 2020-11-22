<template>
  <div class="keywords">
    <span v-for="(word, index) in keywords" :key="`${word}-${index}`" class="keyword">
      {{ word }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'KeywordsList',
  props: {
    keywords: Array
  },
  setup() {

  }
});
</script>

<style lang="less">
.keywords {
  display: flex;
  flex-wrap: wrap;

  .keyword {
    border-radius: 20px;
    padding: 4px 6px;
    margin: 0 2px 2px 0;
    color: #fdfdfd;
    background-color: rgba(226, 167, 238);
    font-size: 12px;
  }
}
</style>