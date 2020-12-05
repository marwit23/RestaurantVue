<template>
  <div class="container col-sm-10 mt-3">
    <table class="table smaller-font" style="border-top: hidden">
      <thead>
        <tr class="">
          <th>Actions</th>
          <th>Id</th>
          <th>Dish name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in paginatedData" :key="recipe.dishId">
          <td>
            <b-button
              v-b-modal.view-recipe-modal
              @click="getRecipe(recipe.dishId)"
              class="btn btn-light btn-sm ml-2"
              >View
            </b-button>
          </td>
          <td>{{ recipe.dishId }}</td>
          <td>{{ recipe.dishName }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mb-5">
      <button
        :disabled="pageNumber == 0"
        class="btn btn-outline-secondary btn-sm ml-3"
        @click="prevPage"
      >
        Prev
      </button>
      <button
        :disabled="pageNumber > pageCount - 2"
        class="btn btn-outline-secondary btn-sm ml-2"
        @click="nextPage"
      >
        Next
      </button>
    </div>

    <ViewRecipeModal :propRecipe="tempRecipe" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ViewRecipeModal from "./ViewRecipeModal.vue";

export default {
  name: "RecipeList",

  data() {
    return {
      pageNumber: 0,
      size: 10,
      search: "",
      filter: "",
    };
  },
  components: {
    ViewRecipeModal,
  },

  computed: {
    ...mapGetters(["allRecipes", "tempRecipe", "allTodos"]),

    pageCount() {
      let l = this.allRecipes.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.allRecipes.slice(start, end);
    },
  },

  methods: {
    ...mapActions(["getAllRecipes", "getRecipe"]),

    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },

  created() {
    this.getAllRecipes();
  },
};
</script>
<style></style>
