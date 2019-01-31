<template>
  <div id="userindex">
    <Navbar :absolute="isHeader"/>
    <router-view/>
    <Flash/>
    <Footer/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Flash from '@/components/assets/Flash'

export default {
  name: 'UserIndex',
  components: {
    Navbar,
    Footer,
    Flash
  },
  computed: {
    isHeader: function() {
      if (this.$route.name === "home")
        return true;
      else
        return false;
    }
  },
  data() {
      return {
          validUsers: ['hugo', 'blvcklngs']
      }
  },
  methods: {
      isValidUser() {
          if (this.validUsers.indexOf(this.$route.params.user) >= 0) return (true);
          return (false);
      },
      ...mapActions('user', {
          defineUser: 'defineUser'
      }),
  },
  mounted() {
      if (!this.isValidUser()) { this.$router.replace({name: 'index'}); return; }
      this.defineUser(this.$route.params.user)
  }
}
</script>

