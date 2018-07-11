<template>
  <div class="article-page" v-if="!isLoading">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{article.title}}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-if="article">
          <div>
            <p>{{article.body}}</p>
          </div>
          <ul class="tag-list" v-if="article.tagList">
            <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in article.tagList" :key="index">
              {{tag}}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>
      <Comment :comments="comments" :article="article" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Comment from '@/components/Comment'
import ArticleMeta from '@/components/ArticleMeta'
export default {
  name: 'articlepage',
  components: {
    Comment,
    ArticleMeta
  },
  computed: {
    ...mapState('articles', ['article', 'isLoading']),
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('articles', ['comments'])
  },
  beforeMount () {
    this.detailArticle(this.$route.params.slug)
    this.getComments(this.$route.params.slug)
  },
  methods: {
    ...mapActions('articles', ['detailArticle', 'addFavorite', 'deleteArticleAct', 'getComments']),
    deleteArticle (slug) {
      this.deleteArticleAct(slug).then((data) => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
