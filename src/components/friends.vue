<template>
    <div style="background: antiquewhite;">
        <div class="container" style="width: 90%;padding-top: 0px;" v-for="friend in requestDetails" :key="friend.name">
            <div class="row" style="background: antiquewhite;">
                <div class="col-md-2"><span class="material-icons">
                    perm_identity
                </span></div>
                <div class="col-md-4">{{friend.name}}</div>
                <div class="col-md-4"><button @click="goToFriendDetails(friend)" class="btn btn-primary">View profile</button></div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: "posts",
    data() {
        return {
            requestDetails: ['sdabdjalskdbasb']
        }
    },
    props: {
        userId: {
            type: String,
            default: ''
        }
    },
    created() {
        this.getDetails();
    },
    
    computed: {
        ...mapState({
        userInfo: state => state.userInfo
        })
    },
    methods:{
        getDetails() {
            this.$store.dispatch('getMutualFriendDetails', {'userId' : this.userId, "currUserId": this.userInfo.userId}).then((response)=>{
                this.requestDetails = response.data
            })
        },
        goToFriendDetails(friend) {
            this.$emit('changeProfile', friend)
        }
    }
}
</script>