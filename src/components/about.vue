<template>
<div class="loginContainer" style="height: 100%;background-size:cover">
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
      
    >
        <v-card style="width: 100%">
          <v-toolbar
            color="primary"
            dark
            flat
          > About
          </v-toolbar>
          <v-card-text>
              <div v-if="userDetails">
                  <div class="">Name: {{userDetails.name}}</div>
                <div class="">Age: {{userDetails.age}}</div>
                <div class="">Email: {{userDetails.email}}</div>
              </div>
            <div v-else>
                <div class="">Name: {{userInfo.name}}</div>
                <div class="">Age: {{userInfo.age}}</div>
                <div class="">Email: {{userInfo.email}}</div>

            </div>
          </v-card-text>
        </v-card>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
      props: {
          profileInfo: {
              type: Object,
              default: null
          }
      },
      data() {
          return {
              userDetails: null
          }
      },
      created() {
          if(this.profileInfo) {
              this.userDetails = this.profileInfo
          }
      },
    computed: {
    ...mapState({
      userInfo: state => state.userInfo
    }),
  }
  }
</script>