<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
           <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>

          <ul v-if="errors" class="error-messages">
            <li v-for="(value, key) in errors" :key="key">
              {{key}} {{ value }}
            </li>
          </ul>

          <form v-on:submit.prevent="submitRegister(user)">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              >
            </fieldset>
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
              Sign up
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
  name: 'register',
  computed: {
    ...mapState('auth', ['user', 'errors'])
  },
  methods: {
    ...mapActions('auth', ['doRegister']),
    submitRegister (user) {
      this.doRegister(user).then((data) => {
        this.$router.push('/')
      })
    }
  }
}
</script>
