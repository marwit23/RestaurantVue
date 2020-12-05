<template>
  <b-container class="container-sm mb-4 custom-width-1">
    <h5 class="mb-4 mt-4">Edit Recipe</h5>

    <ValidationObserver v-slot="{ invalid }">
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        class="border-bottom pb-2"
      >
        <b-row class="my-2">
          <b-col sm="6 pr-custom">
            <ValidationProvider
              name="Dish name"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-input
                v-model="tempRecipe.dishName"
                placeholder="Enter dish name"
                onfocus="this.placeholder = ''"
                class="mb-2 mr-sm-2"
              >
              </b-form-input>

              <span class="text-danger text-small">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-col>
        </b-row>

        <div
          v-for="ingredient in tempRecipe.ingredients"
          :key="ingredient.dishIngredientId"
        >
          <b-form-row>
            <b-col sm="4">
              <ValidationProvider
                name="Ingredient"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-select
                  v-model="ingredient.ingredientName"
                  :options="ingredientOptions"
                  @blur.native="checkUnique(ingredient.ingredientName)"
                  class="mb-2 mr-sm-2"
                >
                </b-form-select>
                <span class="text-danger text-small">{{ errors[0] }}</span>
                <span
                  v-show="!checkUnique(ingredient.ingredientName)"
                  class="text-danger text-small"
                  >This item is duplicate</span
                >
              </ValidationProvider>
            </b-col>

            <b-col sm="2">
              <ValidationProvider
                name="Quantity"
                rules="required|integer|min_value:1"
                v-slot="{ errors }"
              >
                <b-form-input
                  v-model="ingredient.quantityGrams"
                  placeholder="Quantity in grams"
                  onfocus="this.placeholder = ''"
                  class="mb-2 mr-sm-2"
                >
                </b-form-input>
                <span class="text-danger text-small">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-col>

            <b-col>
              <b-button
                v-if="
                  ingredient ===
                    tempRecipe.ingredients[tempRecipe.ingredients.length - 1]
                "
                variant="primary"
                class="ml-4 mb-2 mr-sm-2"
                @click="addItem"
                >+
              </b-button>
              <b-button
                v-if="
                  ingredient ===
                    tempRecipe.ingredients[tempRecipe.ingredients.length - 1] &&
                    ingredient !== tempRecipe.ingredients[0]
                "
                variant="secondary"
                class="mb-2 mr-sm-2"
                @click="deleteItem"
                >-
              </b-button>
            </b-col>
          </b-form-row>
        </div>
      </b-form>

      <div class="mt-4">
        <b-button variant="secondary" @click="onCancel">Cancel</b-button>
        <b-button
          type="submit"
          variant="warning"
          :disabled="invalid || !isUnique"
          class="ml-2"
          @click="onSubmit"
          >Submit</b-button
        >
      </div>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import router from "../../router";

export default {
  name: "EditRecipe",
  data() {
    return {
      isUnique: true,
    };
  },

  computed: {
    ...mapGetters(["tempRecipe", "allIngredients"]),

    ingredientOptions() {
      return this.allIngredients.map((ingredient) => ingredient.ingredientName);
    },
    itemsArray() {
      return this.tempRecipe.ingredients.map(
        (ingredient) => ingredient.ingredientName
      );
    },
  },

  methods: {
    ...mapActions(["editRecipe"]),

    checkUnique(value) {
      if (
        value !== null &&
        this.itemsArray.filter((item) => item == value).length > 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    validateUnique() {
      var tempSet = new Set(this.itemsArray);
      if (tempSet.size !== this.itemsArray.length) {
        this.isUnique = false;
      } else {
        this.isUnique = true;
      }
      console.log(this.isUnique);
    },
    onSubmit() {
      console.log(this.tempRecipe);
      this.editRecipe(this.tempRecipe);
    },
    addItem() {
      this.tempRecipe.ingredients.push({
        ingredientName: null,
        quantityGrams: null,
      });
    },
    deleteItem() {
      this.tempRecipe.ingredients.pop();
    },
    onCancel() {
      router.push({ path: "/admin/recipes" });
    },
  },
};
</script>
<style scoped>

.pr-custom {
  padding-right:5px;
}
  




</style>




