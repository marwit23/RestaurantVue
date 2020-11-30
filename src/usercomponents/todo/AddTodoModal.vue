<template>
  <b-modal
    id="add-todo-modal"
    ref="add-todo-modal"
    :hide-footer="true"
    @hidden="resetModal"
  >
    <b-container class="container-sm">
      <h5 class="mb-4">New Recipe</h5>

      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="handleSubmit(onSubmit)" class="pb-2">
          <b-row class="my-2">
            <b-col cols="9">
              <ValidationProvider
                name="Dish name"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-select
                  v-model="formData.dishName"
                  :options="dishOptions"
                  @change="setTempRecipe()"
                  class="mb-2 mr-sm-2"
                >
                </b-form-select>
                <span class="text-danger text-small">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider
                name="Quantity"
                rules="required|integer|min_value:1"
              >
                <b-form-input
                  v-model="formData.dishQuantity"
                  placeholder="Count"
                  onfocus="this.placeholder = ''"
                  :disabled="localTempRecipe === null"
                  @input.native="validateQuantity()"
                  class="mb-2 mr-sm-2"
                >
                </b-form-input>
              </ValidationProvider>
            </b-col>
          </b-row>

          <b-row>
            <div>
              <span v-show="!isAvailable" class="text-danger text-small"
                >Insufficient quantity!</span
              >
            </div>
            <div>
              <span v-show="!moreThanZero" class="text-danger text-small"
                >Quantity must be greater than 0</span
              >
              <span v-show="!notEmpty" class="text-danger text-small"
                >Quantity is required</span
              >
              <span v-show="!numeric" class="text-danger text-small"
                >Quantity must be an integer</span
              >
            </div>
          </b-row>
        </b-form>
        <div class="float-right">
          <b-button variant="secondary" @click="onCancel">Cancel</b-button>
          <b-button
            type="submit"
            variant="warning"
            class="ml-2"
            :disabled="
              invalid || !isAvailable || !moreThanZero || !numeric || !notEmpty
            "
            @click="onSubmit"
            >Submit</b-button
          >
        </div>
      </ValidationObserver>
    </b-container>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddTodoModal",
  data() {
    return {
      formData: {
        dishName: null,
        dishQuantity: null,
        toDoDate: null,
        toDoStatus: null,
      },
      localTempRecipe: null,
      isAvailable: true,
    };
  },

  computed: {
    ...mapGetters(["allRecipes", "allIngredients"]),

    dishOptions() {
      const tempArray1 = this.allRecipes.map((recipe) => recipe.dishName);
      return tempArray1;
    },

    moreThanZero() {
      if (
        this.formData.dishQuantity !== null &&
        this.formData.dishQuantity !== "" &&
        this.formData.dishQuantity <= 0
      )
        return false;
      else return true;
    },

    notEmpty() {
      if (this.formData.dishQuantity === "") return false;
      else return true;
    },

    numeric() {
      var regex = /^(?:-?[1-9]\d*$)|(?:^0)$/;
      var regexTest = regex.test(this.formData.dishQuantity);
      if (
        this.formData.dishQuantity !== null &&
        this.formData.dishQuantity !== "" &&
        regexTest == false
      )
        return false;
      else return true;
    },

    setDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
  },

  methods: {
    ...mapActions(["addTodo", "getRecipe"]),

    setTempRecipe() {
      this.localTempRecipe = this.allRecipes.find(
        (recipe) => recipe.dishName == this.formData.dishName
      );
    },

    validateQuantity() {
      this.isAvailable = true;

      var tempIngredientNames = this.localTempRecipe.ingredients.map(
        (ingredient) => ingredient.ingredientName
      );

      for (var i in tempIngredientNames) {
        var tempIngredient = this.allIngredients.find(
          (theIngredient) =>
            theIngredient.ingredientName == tempIngredientNames[i]
        );

        if (
          this.localTempRecipe.ingredients[i].quantityGrams *
            this.formData.dishQuantity >
          tempIngredient.availableQuantity
        ) {
          this.isAvailable = false;
          break;
        }
      }
    },

    onSubmit() {
      this.formData.toDoDate = this.setDate;
      this.formData.toDoStatus = "WAITING";
      this.addTodo(this.formData);
    },
    deleteItem() {
      this.formData.ingredients.pop();
    },
    resetModal() {
      this.formData.dishName = null;
      this.formData.dishQuantity = null;
      this.formData.toDoDate = null;
      this.formData.toDoStatus = null;
      this.localTempRecipe = null;
    },
    onCancel() {
      this.$refs["add-todo-modal"].hide();
    },
  },
};
</script>
<style></style>
