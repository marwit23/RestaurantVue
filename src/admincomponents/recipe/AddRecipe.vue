<template>
  <b-container class="container-sm mb-4 custom-width-1">
    <h5 class="mb-4 mt-4">New Recipe</h5>

    <ValidationObserver v-slot="{ invalid }">
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        class="border-bottom pb-2"
      >
        <b-row class="my-2">
          <b-col sm="6">
            <ValidationProvider
              name="Dish name"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-input
                v-model="formData.dishName"
                placeholder="Enter dish name"
                onfocus="this.placeholder = ''"
                @blur.native="checkDishNameUnique(formData.dishName)"
                class="mb-2 mr-sm-2"
              >
              </b-form-input>
              <span class="text-danger text-small">{{ errors[0] }}</span>
              <span
                v-show="!checkDishNameUnique(formData.dishName)"
                class="text-danger text-small"
                >This item already exists</span
              >
            </ValidationProvider>
            <!-- required -->
          </b-col>
        </b-row>

        <div
          v-for="ingredient in formData.ingredients"
          :key="ingredient.dishIngredientId"
        >
          <b-form-row>
            <b-col>
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

            <b-col>
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
                    formData.ingredients[formData.ingredients.length - 1]
                "
                variant="primary"
                class="ml-4 mb-2 mr-sm-2"
                @click="addItem"
                >+
              </b-button>
              <b-button
                v-if="
                  ingredient ===
                    formData.ingredients[formData.ingredients.length - 1] &&
                    ingredient !== formData.ingredients[0]
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
          :disabled="invalid || !isUnique || !checkDishNameUnique(formData.dishName)"
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
  name: "AddRecipe",
  data() {
    return {
      formData: {
        dishName: null,
        ingredients: [
          {
            ingredientName: null,
            quantityGrams: null,
          },
        ],
      },
      isUnique: true,
    };
  },

  computed: {
    ...mapGetters(["allRecipes", "allIngredients"]),

    ingredientOptions() {
      return this.allIngredients.map((ingredient) => ingredient.ingredientName);
    },
    itemsArray() {
      return this.formData.ingredients.map(
        (dishIngredient) => dishIngredient.ingredientName
      );
    },
    recipeList() {
      return this.allRecipes.map((recipe) => recipe.dishName).map(recipe => recipe.toUpperCase());
    },
  },

  methods: {
    ...mapActions(["addRecipe"]),

    checkDishNameUnique(value) {
      if (value !== null && value !== "") {
        if (this.recipeList.includes(value.toUpperCase())) {
          return false;
        } else {
          return true;
        } 
      } else {
          return true;
        }
    },

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
      this.addRecipe(this.formData);
    },
    addItem() {
      this.formData.ingredients.push({
        ingredientName: null,
        quantityGrams: null,
      });
    },
    deleteItem() {
      this.formData.ingredients.pop();
    },
    onCancel() {
      router.push({ path: "/admin/recipes" });
    },
  },
};
</script>
<style></style>
