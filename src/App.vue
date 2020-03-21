<template>
  <v-app class="app">
    <app-menu></app-menu>
    <router-view/>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'App',

  components: {
    'app-menu': Menu
  },

  created () {
    this.$store.dispatch('initWorkouts')
  }
}
</script>

<style>
.v-application--wrap {
  background-color: #000;
}
</style>
