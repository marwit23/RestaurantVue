<template>
  <div>
    <AdminNavigation />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>
<script>
import AdminNavigation from "./AdminNavigation.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AdminPanel",
  components: {
    AdminNavigation,
  },

  methods: {
    ...mapActions(["setUser"]),
  },

  computed: {
    ...mapGetters(["getUser"]),
  },

  created() {
    this.setUser(1);
  },
};
</script>
<style>
</style>