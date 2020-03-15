<template>
  <main>
    <v-card
      max-width="800"
      elevation="12"
      class="mx-auto mt-12"
    >
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-card>
  </main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      items: [
        {
          src: require('../assets/images/carousel3.jpg')
        },
        {
          src: require('../assets/images/carousel2.jpg')
        },
        {
          src: require('../assets/images/carousel1.jpg')
        }
      ]
    }
  }
}
</script>
