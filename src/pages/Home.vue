<template>
  <div class="home-page">
    <Banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{name: 'home-my-feed'}"
                  class="nav-link"
                  :class="{ disabled: !isAuthen }"
                  active-class="active"
                >
                  Your Feed
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{name: 'homepage'}"
                  exact
                  class="nav-link"
                  active-class="active"
                >
                  Global Feed
                </router-link>
              </li>
              <li class="nav-item" v-if="tag">
                <router-link
                  :to="{name: 'home-tag', params: {tag}}"
                  class="nav-link"
                  active-class="active">
                  <i class="ion-pound"></i>
                  {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <Tags />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import ArticleList from '@/components/ArticleList'
import Tags from '@/components/Tags'
import { mapState } from 'vuex'

export default {
  name: 'homepage',
  components: {
    Banner,
    ArticleList,
    Tags
  },
  computed: {
    ...mapState('auth', ['currentUser']),
    isAuthen () {
      return Object.keys(this.currentUser).length > 0
    },
    tag () {
      return this.$route.params.tag
    }
  }
}
</script>

<style>
  .disabled {
    pointer-events: none;
  }
</style>
