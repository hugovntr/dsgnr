<template>
  <div id="userindex">
    <Navbar :absolute="isHeader"/>
    <router-view v-if="storeDefined"/>
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
  data() { 
    return {
      storeDefined: false,
    }
  },
  computed: {
    isHeader: function() {
      if (this.$route.name === "home")
        return true;
      else
        return false;
    }
  },
  methods: {
      validatingUser(_username) {
        this.$http.get(this.$config.api._getUser(_username).url)
          .then((res) => {
            this.defineUser(res.data.data.id)
              .then(() => {
                this.storeDefined = true
              })
              .catch(() => {
                console.error("Error");
              });
          })
          .catch((err) => {
            this.$router.replace({name: 'index'});
          })
      },
      ...mapActions('user', {
          defineUser: 'defineUser'
      }),
  },
  mounted() {
      this.validatingUser(this.$route.params.user);
  }
}
</script>

