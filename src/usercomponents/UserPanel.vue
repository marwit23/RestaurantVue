<template>
    <div>
        <UserNavigation />
        <b-container>
            <router-view />
        </b-container>
    </div>
</template>
<script>
import UserNavigation from './UserNavigation.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'UserPanel',
    components: {
        UserNavigation
    },

    methods: {
        ...mapActions(["setUser"]),
    },

    computed: {
        ...mapGetters(["getUser"])
    },

    created(){
        this.setUser(2)
    }

};
</script>
<style>
</style>