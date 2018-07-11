<template>
  <nav>
    <ul class="pagination">
      <li
        class="page-item"
        v-for="page in pages"
        :key="page"
        :class="paginationClass(page)"
        @click.prevent="changePage(page)"
      >
        <a class="page-link" href>{{page}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'pagination',
  props: ['pages', 'currentPage'],
  methods: {
    ...mapActions('articles', ['gotoPage']),
    changePage (curPage) {
      if (curPage === this.currentPage) return
      this.$emit('pageUpdate', curPage)
    },
    paginationClass (page) {
      return {
        active: this.currentPage === page
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pagination {
    list-style-type: none;
    li {
      float: left;
    }
  }
</style>
