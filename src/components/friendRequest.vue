<template>
    <div>
        <div v-for="friend in requestDetails" :key="friend.name">
            <div class="row">
                <div class="col-md-2"><span class="material-icons">
                    perm_identity
                </span></div>
                <div class="col-md-4">{{friend.name}}</div>
                <div class="col-md-4"><button @click="goToFriendDetails(friend)" class="btn btn-primary">View profile</button></div>
            </div>
        </div>
    </div>
</template>
><script>
import { mapState } from 'vuex'
export default {
    name: "posts",
    data() {
        return {
            requestDetails: ['sdabdjalskdbasb']
        }
    },
    props: {
        requests: {
            type: Array,
            default: []
        }
    },
    created() {
        this.getDetails();
    },
    
    computed: {
        ...mapState({
        starttime: state => state.starttime,
        isLogedin: state => state.isLogedin
        })
    },
    methods:{
        getDetails() {
            this.$store.dispatch('getRequestDetails', {'request':this.requests}).then((response)=>{
                this.requestDetails = response
            })
        },
        goToFriendDetails(friend) {
            this.$router.push({name:'friendsPage', params: {friendDetails: friend, requestSent: true}})
        }
    }
}
</script>