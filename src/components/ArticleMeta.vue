<template>
  <div class="article-meta" v-if="article">
    <a href=""><img :src="article.author.image" /></a>
    <div class="info">
      <a href="" class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt | date}}</span>
    </div>
    <span v-if="isCurrentUser(currentUser, article)">
      <router-link
        class="btn btn-sm btn-outline-secondary"
        :to="{ name: 'article-edit', params: { slug: this.article.slug } }">
        <i class="ion-edit"></i>&nbsp;Edit Article
      </router-link>
      &nbsp;&nbsp;
      <button
        class="btn btn-outline-danger btn-sm"
        v-on:click="deleteArticle(article.slug)">
        <i class="ion-trash-a"></i>&nbsp;Delete Article
      </button>
    </span>
    <span v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        v-on:click="toggleFollow(profile.following)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ profile.following ? 'Unfollow' : 'Follow' }}
        {{ article.author.username }} <span class="counter">(10)</span>
      </button>
      <button
        class="btn btn-sm"
        v-on:click="toggleFavorite(article)"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
      >
        <i class="ion-heart"></i>
        {{
          article.favorited
          ? 'Unfavorite Article'
          : 'Favorite Article'
        }}
        <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'article-meta',
  // props: ['article'],
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('articles', ['article', 'profile'])
  },
  mounted () {
    this.getProfile(this.article.author.username)
    this.detailArticle(this.$route.params.slug)
  },
  methods: {
    ...mapActions('articles', ['addFollow', 'unFollow', 'getProfile', 'addFavorite', 'removeFavorite', 'detailArticle']),
    isCurrentUser (user, article) {
      if (user.username && article.author.username) {
        return user.username === article.author.username
      }
      return false
    },
    toggleFavorite (article) {
      if (!article.favorited) {
        this.addFavorite(article.slug)
      } else {
        this.removeFavorite(article.slug)
      }
    },
    toggleFollow (following) {
      if (!following) {
        this.addFollow(this.profile.username)
      } else {
        this.unFollow(this.profile.username)
      }
    }
  }
}
</script>
