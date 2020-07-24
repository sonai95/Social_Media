<template>
    <div>
        <taskBar />
        <div class="container" style="width: 400px">
            <div class="row" style="border: 1px solid #989898;">
                <div v-if="foundFriends.length==0" style="margin-left: 30%;padding: 15px;">
                    <span style="text-align: center">No records found</span>
                </div>
                <div v-else style="width: 100%" v-for="friend in foundFriends" :key="friend.name">
                    <div class="row" @click="goToprofile(friend)">
                        <div class="col-md-2"><span class="material-icons">
                            perm_identity
                        </span></div>
                        <div class="col-md-6" style="margin-top: 5px;">{{friend.name}}</div>
                        <div class="col-md-4" ><button class="btn btn-primary" style="padding: 5px;background: #9c98b7;color: white;" >View Profile</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import taskBar from '../components/taskBar'
export default {
    data() {
        return {
            foundFriends: []
        }
    },
    components: {taskBar},
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        }),
    },
    created() {
        this.foundFriends = this.$route.params.response.data
    },
    methods: {
        addFriend(userId) {
            this.$store.dispatch('addFriend', {'user': this.userInfo.userId, 'friend':userId})
        },
        goToprofile (friend) {
            this.$router.push({name:'friendsPage', params: {friendDetails: friend}})
        }
    }
}
</script>