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
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Full Name"
                name="fullName"
                type="text"
                v-model="fullName"
              ></v-text-field>
              <v-text-field
                id="mobile"
                label="mobile"
                name="mobile"
                type="text"
                v-model="mobile"
              ></v-text-field>
              <v-text-field
                id="email"
                label="email"
                name="email"
                type="text"
                v-model="email"
              ></v-text-field>
              <v-text-field
                id="password"
                label="password"
                name="password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                id="confirm"
                label="Confirm password"
                name="confirm"
                type="password"
                v-model="confirmpassword"
              ></v-text-field>
              <v-select
                v-model="age"
                :items="ageRange"
                menu-props="auto"
                label="Select age"
                single-line
                ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="login" color="primary">Log in here</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="register" color="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  </div>
</template>

<script>

  export default {
    props: {
      source: String,
    },
    data: () => ({
      ageRange: [],
    }),
    created() {
        for(var i=5;i<120;i++) {
            this.ageRange.push(i)
        }
    },
    methods: {
      login() {
        this.$router.push('/')
      },
      register() {
        if(this.password == this.confirmpassword) {
            var credentials = {
                'name': this.fullName,
                'mobile': this.mobile,
                'email': this.email,
                'password': this.password,
                'age': this.age
            }
            this.$store
                .dispatch("register", credentials)
                .then(() => {
                this.$router.push("/");
                }).catch(error => {
                console.log(error)
            });
        }
      }
    }
  }
</script>
<style scoped>
  .loginContainer {
    background-image: url('../assets/allMovies.jpg')
  }
</style>