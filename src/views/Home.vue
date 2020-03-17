<template>
  <main>
    <v-container fluid>
      <v-row>
      </v-row>
    </v-container>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      items: [
        {
          src: require('../assets/images/carousel2.jpg')
        },
        {
          src: require('../assets/images/carousel1.jpg')
        },
        {
          src: require('../assets/images/carousel3.jpg')
        }
      ]
    }
  }
}
</script>
