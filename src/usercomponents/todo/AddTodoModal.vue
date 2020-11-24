<template>
        <b-modal id="add-todo-modal" ref="add-todo-modal" okTitle="Submit" okVariant="warning" @ok="onSubmit" @hidden="resetModal">
        <b-container class="container-sm">

            <h5 class="mb-4">New Recipe</h5>

            <b-form @submit.prevent="onSubmit" class="border-bottom pb-2">

              <b-row class="my-2">
                <b-col sm="6">
                  <b-form-input
                  v-model="formData.dishName"
                  placeholder="Enter dish name"
                  onfocus="this.placeholder = ''" 
                  class="mb-2 mr-sm-2">
                  </b-form-input>
                </b-col>
              </b-row>

              <div v-for="ingredient in formData.ingredients" :key="ingredient.dishIngredientId">

              <b-form-row>
                
              <b-col>
              <b-form-select 
                v-model="ingredient.ingredientName"
                :options="ingredientOptions"
                class="mb-2 mr-sm-2">
              </b-form-select>
              </b-col>

              <b-col>
              <b-form-input 
              v-model="ingredient.quantityGrams"
              placeholder="Quantity in grams"
              onfocus="this.placeholder = ''" 
              class="mb-2 mr-sm-2">
              </b-form-input>
              </b-col>

              <b-col>
              <b-button 
                v-if="ingredient === formData.ingredients[formData.ingredients.length - 1]"
                variant="primary" 
                class="ml-4 mb-2 mr-sm-2" 
                @click="addItem">+
              </b-button>
              <b-button 
                v-if="ingredient === formData.ingredients[formData.ingredients.length - 1] &&
                  ingredient !== formData.ingredients[0]" 
                variant="secondary"
                class="mb-2 mr-sm-2"
                @click="deleteItem">-
              </b-button>
              </b-col>

              </b-form-row>

              </div>

            </b-form>

            <pre v-html="formData"/>

        </b-container>
    </b-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import router from '../../router'


export default { 
    name: "AddTodoModal",
    data() {
        return {
            formData: {
              dishName: '',
              ingredients: [
                {
                  ingredientName: '',
                  quantityGrams: ''
                }
              ]
            }
        }
    },

    computed: {
        ...mapGetters(["allRecipes", "allIngredients"]),

        ingredientOptions(){
            const tempArray1 = this.allIngredients.map(ingredient => ingredient.ingredientName)
            return tempArray1
        },
    },

    methods: {
        ...mapActions(["addRecipe"]),

        onSubmit() {
            this.addRecipe(this.formData)

        },
        addItem(){
          this.formData.ingredients.push({
            ingredientName: '',
            quantityGrams: ''
          })
        },
        deleteItem(){
          this.formData.ingredients.pop();
        },
        onCancel(){
          router.push({ path : '/admin/recipes' })
        },
        resetModal() {
            this.ingredient.ingredientName = ''
            this.ingredient.ingredientCategory = ''
            this.ingredient.shelfLife = ''
        },
    }

}
</script>
<style>
</style>