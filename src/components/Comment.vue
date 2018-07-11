<template>

  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" v-on:submit.prevent="submitComment(body)">
        <div class="card-block">
          <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
        </div>
        <div class="card-footer">
          <img :src="currentUser.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary">
          Post Comment
          </button>
        </div>
      </form>
      <div v-if="comments.length">
        <div class="card" v-for="(comment, index) in comments" :key="index">
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img :src="comment.author.image" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="" class="comment-author">{{comment.author.username}}</a>
            <span class="date-posted">{{comment.createdAt | date}}</span>
            <span v-if="isCurrentUser" class="mod-options">
              <i class="ion-trash-a" @click.prevent="destroyComment(article.slug, comment.id)"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'comment',
  props: ['comments', 'article'],
  data () {
    return {
      body: null
    }
  },
  computed: {
    ...mapState('auth', ['currentUser'])
  },
  methods: {
    ...mapActions('articles', ['postComment', 'deleteComment']),
    submitComment (body) {
      const data = { body: body, slug: this.article.slug }
      this.postComment(data)
      this.body = ''
    },
    isCurrentUser (user, article) {
      if (user.username && article.author.username) {
        return user.username === article.author.username
      }
      return false
    },
    destroyComment (slug, idComment) {
      const data = { id: idComment, slug: this.article.slug }
      this.deleteComment(data)
      this.body = ''
    }
  }
}
</script>
