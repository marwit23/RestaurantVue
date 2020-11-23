<template>
        <b-container class="container-sm mb-4 custom-width-1">

            <h5 class="mb-4 mt-4">Edit Recipe</h5>

            <b-form @submit.prevent="onSubmit" class="border-bottom pb-2">

              <b-row class="my-2">
                <b-col sm="6">
                  <b-form-input
                  v-model="tempRecipe.dishName"
                  placeholder="Enter dish name"
                  onfocus="this.placeholder = ''" 
                  class="mb-2 mr-sm-2">
                  </b-form-input>
                </b-col>
              </b-row>

              <div v-for="ingredient in tempRecipe.ingredients" :key="ingredient.dishIngredientId">

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
                v-if="ingredient === tempRecipe.ingredients[tempRecipe.ingredients.length - 1]"
                variant="primary" 
                class="ml-4 mb-2 mr-sm-2" 
                @click="addItem">+
              </b-button>
              <b-button 
                v-if="ingredient === tempRecipe.ingredients[tempRecipe.ingredients.length - 1] &&
                  ingredient !== tempRecipe.ingredients[0]" 
                variant="secondary"
                class="mb-2 mr-sm-2"
                @click="deleteItem">-
              </b-button>
              </b-col>

              </b-form-row>

              </div>

            </b-form>

            <div class="mt-4">
                <b-button variant="secondary" @click="onCancel">Cancel</b-button>
                <b-button type="submit" variant="warning" class="ml-2" @click="onSubmit">Submit</b-button>
            </div>

        </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import router from '../../router'


export default { 
    name: "EditRecipe",
    data() {
        return {

        }
    },

    computed: {
        ...mapGetters(["tempRecipe", "allIngredients"]),

        ingredientOptions(){
            const tempArray1 = this.allIngredients.map(ingredient => ingredient.ingredientName)
            return tempArray1
        },
    },

    methods: {
        ...mapActions(["editRecipe"]),

        onSubmit() {
            console.log(this.tempRecipe)
            this.editRecipe(this.tempRecipe)
        },
        addItem(){
          this.tempRecipe.ingredients.push({
            ingredientName: '',
            quantityGrams: ''
          })
        },
        deleteItem(){
          this.tempRecipe.ingredients.pop();
        },
        onCancel(){
          router.push({ path : '/admin/recipes' })

        },
        created(){
        }
    }

}
</script>
<style>
</style>



