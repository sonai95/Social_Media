<template>
  <div>
    <taskBar />
    <div class="container" style="width: 700px">
      <div class="row">
        <div class="col-md-9">
          <v-text-field
            id="serach"
            label="Serach friend"
            name="serach"
            type="text"
            v-model="searchFor"
          ></v-text-field>
        </div>
        <div class="col-md-3">
          <v-btn @click="search" color="primary">Search</v-btn>
        </div>
      </div>
    </div>
    <div class="headArea">
      <div class="container" style="width: 700px">
        <div class="row">
          <span class="material-icons" style="font-size: 140px;font-size: 140px;border: 1px solid;border-radius: 80px;">
            perm_identity
          </span>
          <div style="font-size: 80px;font-size: 30px;margin-top: 45px;margin-left: 45px; float: right">{{currProfile.name}}</div>
        </div>
          <div v-if="userInfo.friends.includes(currProfile.userId) || alreadyFriend==true">
            <div style="background: green; color: white;padding: 10px;float: right">Already Friend</div>
          </div>
          <div v-else-if="userInfo.requested.includes(currProfile.userId) || requestSend==true">
            <div style="background: green; color: white;padding: 10px;float: right">Request sent</div>
          </div>
          <div v-else-if="userInfo.received.includes(currProfile.userId)">
              <div @click="rejectRequest()" style="background: green; color: white;padding: 10px;float: right">Reject</div>
              <div @click="acceptRequest()" style="background: green; color: white;padding: 10px;margin-right: 10px;float: right">Accept</div>
          </div>
          <div v-else>
            <div @click="sendRequest()" style="background: green; color: white;padding: 10px;float: right">Add friend</div>
          </div>
      </div>
      <div class="bodyArea">
        <div class="container" style="width: 700px;padding-bottom: 0px;">
          <div class="row">
            <div class="col-md-4 Friends">
              <button style="cursor:pointer;padding: 15px;background: #3976d2;color: white;" @click="friends=true;about=false" class="btn btn-primary">Mutual Friends</button>
            </div>
            <div class="col-md-4 About">
              <button style="cursor:pointer;padding: 15px;background: #3976d2;color: white;" @click="openBio()" class="btn btn-primary">About</button>
            </div>
          </div>
        </div>
        <div class="container" style="width: 700px">
          <friends @changeProfile="changeProfile" :userId="currProfile.userId" v-if="friends==true" />
            <v-container
              fluid
              fill-height
              v-if="about==true"
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
                        <div>
                            <div class="">Name: {{currProfile.name}}</div>
                          <div class="">Age: {{currProfile.age}}</div>
                          <div class="">Email: {{currProfile.email}}</div>
                        </div>
                    </v-card-text>
                  </v-card>
              </v-layout>
            </v-container>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import PharmaSSDServices from '../server/PharmaSSD'
import { Hooper, Slide } from 'hooper';
import { mapState } from 'vuex'
import friendRequest from '../components/friendRequest'
import taskBar from '../components/taskBar'
import 'hooper/dist/hooper.css';
import friends from '../components/friends'
import aboutPage from '../components/about'

export default {
  components: {
    taskBar, friendRequest, friends, aboutPage
  },
  data() {
    return {
        requestSent: false,
        searchFor: '',
        movies: [],
        movie: '',
        currMovie: '',
        userDet: null,
        friends: true,
        alreadyFriend: false,
        addFriendOption: false,
        requestSend: false,
        about: false
    }
  },
  created() {
      this.friendDet()
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      currProfile: state => state.currProfile
    }),
  },
  methods: {
    openBio() {
      this.friends = false
      this.about = true
    },
    changeProfile (profile) {
      this.friends = false
      this.$store.dispatch('setCurrProfile', profile).then(() => {
          this.userDet = this.currProfile
        })
    },
    search() {
      var searchedFor = this.searchFor
      this.$store.dispatch('searchFriend', {'search': searchedFor, 'user': this.userInfo.userId}).then((response) => {
        this.$router.push({name: 'searchPage', params: { 'response': response }})
      })
    },
    friendDet() {
      if(this.$route.params.friendDetails) {
        this.$store.dispatch('setCurrProfile', this.$route.params.friendDetails).then(() => {
          this.userDet = this.currProfile
          if(this.$route.params.requestSent == true) {
              this.requestSent = true
          }
        })
      }
      else if(this.currProfile) {
        this.userDet = this.currProfile
        if(this.$route.params.requestSent == true) {
            this.requestSent = true
        }
      } else {
        this.$store.dispatch('setCurrProfile', this.$route.params.friendDetails).then(() => {
          this.userDet = this.currProfile
          if(this.$route.params.requestSent == true) {
              this.requestSent = true
          }
        })
      }
    },
    acceptRequest() {
        this.$store.dispatch('accepRequest', {user: this.userInfo.userId, request: this.userDet.userId}).then(() => {
            this.$router.push('/dashboard')
        })
    },
    rejectRequest() {
        this.$store.dispatch('rejectRequest', {user: this.userInfo.userId, request: this.userDet.userId}).then(() => {
            this.requestSend = false
            this.alreadyFriend = false
            this.addFriendOption = true
        })
    },
    sendRequest () {
      this.$store.dispatch('addFriend', {'user': this.userInfo.userId, 'friend':this.userDet.userId}).then(() => {
        this.alreadyFriend = false
        this.addFriendOption = false
        this.requestSend = true
      })
    }
  }
}
</script>