<template>
  <v-app>
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
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
