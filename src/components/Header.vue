<template>
  <nav class="navbar navbar-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">conduit</router-link>
        <ul v-if="!isAuthen" class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" exact to="/">
              <i class="ion-home"></i>&nbsp;Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" exact to="/login">
              <i class="ion-log-in"></i>&nbsp;Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" exact to="/register">
              <i class="ion-person-add"></i>&nbsp;Sign up
            </router-link>
          </li>
        </ul>
        <ul v-else class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" exact to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" exact :to="{name: 'article-edit', params: {}}">
              <i class="ion-compose"></i>&nbsp;New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" exact to="/settings">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item" v-if="currentUser.username">
            <a href="" class="nav-link">
              <img class="avatar" :src="currentUser.image" alt="">
              &nbsp;{{currentUser.username}}
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" active-class="active" exact @click.prevent="doLogout">
              <i class="ion-log-out"></i>&nbsp;Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters('auth', ['currentUser']),
    isAuthen () {
      return Object.keys(this.currentUser).length
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),
    doLogout () {
      this.logout().then(() => this.$router.push('/'))
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar {
    display: inline-block;
    vertical-align: middle;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
</style>
