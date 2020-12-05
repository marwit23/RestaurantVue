<template>
  <b-modal
    id="add-ingredient-modal"
    ref="add-ingredient-modal"
    :hide-footer="true"
    @hidden="resetModal"
  >
    <b-container class="container-sm">
      <h5 class="mb-4">Add Ingredient</h5>

      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            name="Ingredient"
            rules="required"
            v-slot="{ errors }"
          >
            <b-form-group label="Ingredient name" label-for="ingredientName">
              <b-form-input
                v-model="ingredient.ingredientName"
                @blur.native="checkUnique"
                class="form-control"
              ></b-form-input>
              <span class="text-danger text-small">{{ errors[0] }}</span>
              <span
                v-show="!checkUnique(ingredient.ingredientName)"
                class="text-danger text-small"
                >This item already exists</span
              >
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Category"
            rules="required"
            v-slot="{ errors }"
          >
            <b-form-group label="Category" label-for="ingredientCategegory">
              <b-form-select
                v-model="ingredient.ingredientCategory"
                class="form-control"
              >
                <option>GRAINS</option>
                <option>MEAT</option>
                <option>DAIRY</option>
                <option>VEGETABLES</option>
                <option>FRUITS</option>
                <option>FATS</option>
                <option>SPICES</option>
              </b-form-select>
              <span class="text-danger text-small">{{ errors[0] }}</span>
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Shelf life"
            rules="required|between:1,180"
            v-slot="{ errors }"
          >
            <b-form-group label="Shelf life" label-for="shelfLife">
              <b-form-input
                type="text"
                v-model="ingredient.shelfLife"
                class="form-control"
              ></b-form-input>
              <span class="text-danger text-small">{{ errors[0] }}</span>
            </b-form-group>
          </ValidationProvider>
        </b-form>
        <div class="float-right">
          <b-button variant="secondary" @click="onCancel">Cancel</b-button>
          <b-button
            type="submit"
            variant="warning"
            class="ml-2"
            :disabled="invalid || !checkUnique(ingredient.ingredientName)"
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
  name: "AddIngredientModal",
  data() {
    return {
      ingredient: {},
    };
  },

  computed: {
    ...mapGetters(["allIngredients"]),

    ingredientList() {
      return this.allIngredients.map((ingredient) => ingredient.ingredientName);
    },
  },

  methods: {
    ...mapActions(["addIngredient"]),

    checkUnique(value) {
      if (this.ingredientList.includes(value)) {
        return false;
      } else {
        return true;
      }
    },

    onSubmit() {
      this.addIngredient(this.ingredient);
      this.$refs["add-ingredient-modal"].hide();
    },

    resetModal() {
      this.ingredient.ingredientName = null;
      this.ingredient.ingredientCategory = null;
      this.ingredient.shelfLife = null;
    },
    onCancel() {
      this.$refs["add-ingredient-modal"].hide();
    },
  },
  updated() {},
};
</script>
<style></style>
