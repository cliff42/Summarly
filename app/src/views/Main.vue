<template>
  <div class="main">
    <div class="notes">
      notes
    </div>
    <div class="search-sidebar">
      <input type="text" class="search" placeholder="Search...">
      <KeywordsList class="keywords-list" :keywords="testKeywords" />
      <SearchResult
        class="search-result"
        v-for="(result, index) in testSearchResults"
        :key="`${result.section}-${index}`"
        :section="result.section"
        :page="result.page"
        :description="result.description"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import KeywordsList from '@/components/KeywordsList.vue';
import SearchResult from '@/components/SearchResult.vue';

export default defineComponent({
  name: 'Main',
  components: {
    KeywordsList,
    SearchResult
  },
  setup() {
    const testKeywords = ref(['word1', 'word2', 'word3', 'word4', 'word5']);
    const testSearchResults = ref([
      {
        section: 'Test Section 1',
        page: 9,
        description: 'Test description 1'
      },
      {
        section: 'Test Section 2',
        page: 9,
        description: 'Test description 2'
      },
      {
        section: 'Test Section 3',
        page: 12,
        description: 'Test description 3'
      }
    ]);

    // const files = require.context(
    //   '@/server/uploads',
    //   true,
    //   /^.*\.pdf$/
    // )
    // console.log(files);

    return {
      testKeywords,
      testSearchResults
    };
  },
});
</script>

<style lang="less">
@import './Main.less';
</style>
