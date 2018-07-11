<template>
  <div class="home-my-feed">
    <ArticleList :author="currentUser.username" />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import { mapState } from 'vuex'
export default {
  name: 'home-my-feed',
  components: {
    ArticleList
  },
  computed: {
    ...mapState('auth', ['currentUser'])
  }
}
</script>
