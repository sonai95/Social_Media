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
      <v-flex
        xs12
        sm8
        md4
      >
      <v-alert
        v-model="show"
        :dismissible="dismissible"
        :type="type"
        class="mb-4"
        color="error"
        label="Error"
        value="error"
      >Please Enter A Valid UserId Or Password</v-alert>
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="User Name"
                name="userName"
                prepend-icon="person"
                type="text"
                v-model="userName"
              ></v-text-field>

              <v-text-field
                id="password"
                label="password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="register" color="primary">Register here</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
  export default {
    props: {
      source: String,
    },
    computed: {
      ...mapState({
        userLoggedIn: state => state.userLoggedIn
      })
    },
    created() {
      if(this.userLoggedIn==true) {
        this.$router.push('/dashboard')
      }
    },
    data: () => ({
      drawer: null,
      dismissible: true,
      show: false
    }),
    methods: {
      register() {
        this.$router.push('/register')
      },
      login() {
        var credentials = {
          'username': this.userName,
          'pass': this.password
        }
        this.$store
        .dispatch("login", credentials)
        .then(() => {
          this.$router.push("/dashboard");
        }).catch(error => {
          this.show = true
          console.log(error)
        });
      }
    }
  }
</script>