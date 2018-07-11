<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form v-on:submit.prevent="submitSetting(userCurrent)">
            <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    v-model="userCurrent.image"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    v-model="userCurrent.username"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    v-model="userCurrent.bio"
                  ></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    v-model="userCurrent.email"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                  >
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'settings',
  data () {
    return {
      password: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    userCurrent: function () {
      return {...this.currentUser}
    }
  },
  methods: {
    ...mapActions('auth', ['updateUser']),
    submitSetting (user) {
      const data = {
        ...user,
        password: this.password
      }
      this.updateUser(data).then(() => {

      })
    }
  }
}
</script>
