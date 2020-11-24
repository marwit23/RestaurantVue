<template>
    <div>
        <MainNavigation />
        <router-view />
          <div class="app-message text-center">
                <div v-if="allIngredients.length < 1">
                    <p>Data is loading...If this is your first time launching the app, it may take about 30 seconds for the database to wake up.</p>
                    <b-spinner label="Spinning"></b-spinner>
                </div>
                <div v-else-if="getUser === 0">
                    <p>Connection successful</p>
                    <img src="./_assets/happy1.png" alt="success" class="app-happy" />
                    <p>Start by choosing your user role</p>
                </div>
            </div>
    </div>
</template>

<script>
import MainNavigation from "./components/MainNavigation.vue";
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "App",
    components: {
        MainNavigation,
    },
     computed: {
        ...mapGetters(["allIngredients", "getUser"]),
    },
    methods: {
        ...mapActions(["getAllIngredients", "getAllDeliveries", "getAllRecipes", "getAllTodos" ])
    },
    created(){
        this.getAllIngredients();
        this.getAllDeliveries();
        this.getAllRecipes();
        this.getAllTodos();
    }
};
</script>

<style>
#App {}

.app-message {
    margin-top: 50px;
}

.app-happy {
    max-height: 50px;
    max-width: 50px;
    margin-bottom: 25px;
}

.border-bottom {
    border-bottom: 1px solid gray;
}

.border-top-hidden {
    border-top:hidden;
}

.custom-width-1 {
    max-width: 80%;
}

</style>