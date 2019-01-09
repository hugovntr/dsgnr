<template>
  <div id="app">
    <Navbar :absolute="isHeader"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir Next', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<script>

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'app',
  components: {
    Navbar,
    Footer
  },
  computed: {
    isHeader: function() {
      if (this.$route.name === "home")
        return true;
      else
        return false;
    }
  }
}
</script>