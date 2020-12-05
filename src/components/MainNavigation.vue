<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg"
      v-bind:class="[getUser === 2 ? 'app-navbar-user' : 'app-navbar-admin']"
    >
      <img src="../_assets/logo.png" alt="logo" class="navbar-brand app-logo" />
      <router-link class="btn btn-success ml-2" to="/admin">Admin</router-link>
      <router-link class="btn btn-info ml-2" to="/user">User</router-link>
    </nav>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    ...mapActions(["setUser"]),
  },

  computed: {
    ...mapGetters(["getUser"]),
  },
};
</script>

<style>
.app-logo {
  max-height: 75px;
  max-width: 75px;
}

.app-navbar-admin {
  background: coral;
  padding: 10px;
}

.app-navbar-user {
  background: #ffd68f;
  padding: 10px;
}
</style>
