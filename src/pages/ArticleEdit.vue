<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form v-on:submit.prevent="submitArticle(article.slug, article)">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tagInput"
                  v-on:keypress.enter.prevent="doAddTag(tagInput)"
                >
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                  >
                    <i
                      class="ion-close-round"
                      v-on:click="doRemoveTag(tag)"
                    ></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'article-editor',
  data () {
    return {
      tagInput: null
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.params.slug === undefined) {
      return next((vm) => vm.resetArticle())
    }
    return next()
  },
  computed: {
    ...mapState('articles', ['article'])
  },
  methods: {
    ...mapActions('articles',
      [
        'addTag',
        'removeTag',
        'createArticle',
        'resetArticle',
        'updateArticleDetail'
      ]),
    doAddTag (tag) {
      this.addTag(tag)
      this.tagInput = null
    },
    doRemoveTag (tag) {
      this.removeTag(tag)
    },
    submitArticle (slug, article) {
      if (slug) {
        this.updateArticleDetail(article).then((data) => {
          this.$router.push({
            name: 'article',
            params: { slug: data.article.slug }
          })
        })
      } else {
        this.createArticle(article).then((data) => {
          this.$router.push({
            name: 'article',
            params: { slug: data.article.slug }
          })
        })
      }
    }
  }
}
</script>
