<template>
  <div>
    <v-app-bar
      color="blue darken-1 accent-4"
      dense
      dark
    >
    <v-toolbar-title style="cursor: pointer;" @click="() => {
        this.$router.push('/dashboard')
        count = 0 
    }">Welcome {{userInfo.name}}
    </v-toolbar-title>

    <v-spacer></v-spacer>
      
    <v-btn @click="logout">
      Logout    
    </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppBar',
  data: () => ({
    count: 0
  }),
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    logout() {
      this.$store.dispatch( 'logUserOut').then(() => {
        this.$router.push('/')
    })
  }

}
}
</script>

<style>

</style>