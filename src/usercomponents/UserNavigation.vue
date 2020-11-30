<template>
  <div>
   <nav class ="app-header-user">
      <ul class="nav nav-justified">
        <router-link to="/user/todos" class="nav-link"><li class="nav-item m3">Cooking Orders</li></router-link>
        <router-link to="/user/recipes" class="nav-link"><li class="nav-item m3">Recipes</li></router-link>
        <router-link to="/user/ingredients" class="nav-link"><li class="nav-item m3">Inventory</li></router-link>
      </ul>
  </nav>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
a {
  color:brown;
  font-weight: bold;
}

a:hover {
  color: #d18f1b;
}

.app-header-user {
    background: #fff5cf;
    padding-top: 7px;
    padding-bottom: 7px;

}

</style>