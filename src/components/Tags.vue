<template>
  <div class="tag-list">
    <router-link
      class="tag-pill tag-default"
      :to="{ name: 'home-tag', params: { tag: item } }"
      v-for="(item, index) in tags" :key="index"
    >
      {{item}}
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'tags-list',
  computed: {
    ...mapState('tags', ['tags'])
  },
  mounted () {
    this.getTags()
  },
  methods: {
    ...mapActions('tags', ['getTags'])
  }
}
</script>
