<template>
  <div>
    <div v-if="isLoading" class="article-preview">
      Loading articles...
    </div>
    <div v-for="(item, index) in articles" :key="index" class="article-preview">
      <div class="article-meta">
        <router-link :to="{ path: 'articles/' + item.slug}"><img :src="item.author.image" /></router-link>
        <div class="info">
          <router-link :to="{ path: 'articles/' + item.slug}" class="author">{{item.author.username}}</router-link>
          <span class="date">{{item.createdAt | date}}</span>
        </div>
        <button
          class="btn btn-sm pull-xs-right"
          v-on:click="toggleFavorite(item)"
          :class="{
            'btn-primary': item.favorited,
            'btn-outline-primary': !item.favorited
          }"
        >
          <i class="ion-heart"></i> {{item.favoritesCount}}
        </button>
      </div>
      <router-link :to="{ path: 'articles/' + item.slug}" class="preview-link">
        <h1>{{item.title}}</h1>
        <p>{{item.body}}</p>
        <span>Read more...</span>
      </router-link>
    </div>
    <Pagination :pages="pages" :currentPage="currentPage" @pageUpdate="currentPage = $event" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'article-preview',
  props: ['tag', 'author'],
  data () {
    return {
      currentPage: 1,
      itemPerPage: 10
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState('articles', ['articles', 'isLoading', 'articlesCount']),
    filters () {
      const filters = {
        offset: (this.currentPage - 1) * this.itemPerPage,
        limit: 10
      }
      if (this.tag) {
        filters.tag = this.tag
      }
      if (this.author) {
        filters.author = this.author
      }
      return filters
    },
    pages () {
      return [...Array(Math.ceil(this.articlesCount / this.itemPerPage)).keys()].map(e => e + 1)
    }
  },
  mounted () {
    this.getArticles(this.filters)
  },
  watch: {
    tag () {
      this.getArticles(this.filters)
    },
    currentPage (newValue) {
      this.filters.offset = (newValue - 1) * this.itemPerPage
      this.getArticles(this.filters)
    }
  },
  methods: {
    ...mapActions('articles', ['getArticles', 'addFavorite', 'removeFavorite']),
    toggleFavorite (article) {
      if (!article.favorited) {
        this.addFavorite(article.slug)
      } else {
        this.removeFavorite(article.slug)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-preview {
    word-break: break-all;
  }
</style>
