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
          <div style="font-size: 80px;font-size: 30px;margin-top: 45px;margin-left: 45px; float: right">{{userInfo.name}}</div>
        </div>
      </div>
      <div class="bodyArea">
        <div class="container" style="width: 700px">
          <div class="row">
            <div class="col-md-4 Friends" v-if="userInfo.received.length>0">
              <button style="cursor:pointer; padding: 15px;background: #3976d2;color: white;" class="btn btn-primary" @click="showFriendRequest()">Friend requests</button>
            </div>
            <div class="col-md-4 ">
              <button style="cursor:pointer;padding: 15px;background: #3976d2;color: white;" class="btn btn-primary" @click="showAbout()">About</button>
            </div>
          </div>
        </div>
        <div class="container" style="width: 700px">
          <friendRequest v-if="friendRequest==true" :requests="userInfo.received"/>
          <about v-if="about==true"/>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import friendRequest from '../components/friendRequest'
import taskBar from '../components/taskBar'
import about from '../components/about'

export default {
  components: {
    taskBar, friendRequest, about
  },
  created() {
      if(this.userLoggedIn!=true) {
        this.$router.push('/')
      }
    },
  data() {
    return {
      searchFor: '',
      friendRequest: true,
      about: false
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      userLoggedIn: state => state.userLoggedIn
    }),
  },
  methods: {
    showAbout() {
      this.about = true
      this.friendRequest =false
    },
    showFriendRequest() {
      this.friendRequest = true
      this.about =false
    },
    search() {
      var searchedFor = this.searchFor
      this.$store.dispatch('searchFriend', {'search': searchedFor, 'user': this.userInfo.userId}).then((response) => {
        this.$router.push({name: 'searchPage', params: { 'response': response }})
      })
    }
  }
}
</script>