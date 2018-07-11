<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link to="/register">
              Need an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">
              {{k}} {{ v }}
            </li>
          </ul>
          <form v-on:submit.prevent="submitLogin(user)">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Login
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'login',
  computed: {
    ...mapState('auth', ['user', 'errors'])
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    submitLogin (user) {
      this.doLogin(user).then(() => {
        this.$router.push('/')
      })
    }
  }
}
// truongduy, truongduy@gmail.com, 123456789
</script>
