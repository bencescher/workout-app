<template>
  <main>
    <h1>Summary of previous workouts</h1>
    <p>Charts, widgets, etc...</p>
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
