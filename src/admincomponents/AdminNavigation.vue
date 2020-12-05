<template>
  <div>
    <nav class="app-header-admin">
      <ul class="nav nav-justified">
        <router-link
          to="/admin/ingredients"
          class="nav-link"
          exact-active-class="exact-active"
          ><li class="nav-item m3">Ingredients</li></router-link
        >
        <router-link
          to="/admin/recipes"
          class="nav-link"
          exact-active-class="exact-active"
          ><li class="nav-item m3">Recipes</li></router-link
        >
        <router-link
          to="/admin/deliveries"
          class="nav-link"
          exact-active-class="exact-active"
          ><li class="nav-item m3">Deliveries</li></router-link
        >
      </ul>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  color: brown;
  font-weight: bold;
}

a:hover {
  color: #6e2f0f;
}

.app-header-admin {
  background: #f5d5c8;
  padding-top: 7px;
  padding-bottom: 7px;
}

.exact-active {
  color: #6e2f0f;
}
</style>
