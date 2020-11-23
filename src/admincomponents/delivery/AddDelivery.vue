<template>
        <b-container class="container-sm mb-4 custom-width-1">

            <h5 class="mb-4 mt-4">New Purchase Order</h5>

            <b-form inline @submit.prevent="onSubmit" class="border-bottom pb-2">

              <div v-for="deliveryItem in formData.deliveryItems" :key="deliveryItem.deliveryItemId">

              <b-form-select 
                v-model="deliveryItem.ingredientName"
                :options="ingredientOptions"
                class="mb-2 mr-sm-2">
              </b-form-select>

              <b-form-input 
              v-model="deliveryItem.orderedQuantity"
              placeholder="Quantity in grams"
              onfocus="this.placeholder = ''" 
              class="mb-2 mr-sm-2">
              </b-form-input>

              <b-form-input
              v-model="deliveryItem.pricePerKg"
              placeholder="Price per kg"
              onfocus="this.placeholder = ''" 
              class="mb-2 mr-sm-2">
                
              </b-form-input>

              <b-button 
                v-if="deliveryItem === formData.deliveryItems[formData.deliveryItems.length - 1]"
                variant="primary" 
                class="ml-4 mb-2 mr-sm-2" 
                @click="addItem">+
              </b-button>

              <b-button 
                v-if="deliveryItem === formData.deliveryItems[formData.deliveryItems.length - 1] &&
                  deliveryItem !== formData.deliveryItems[0]" 
                variant="secondary"
                class="mb-2 mr-sm-2"
                @click="deleteItem">-
              </b-button>

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
    name: "AddDelivery",
    data() {
        return {
            formData: {
              deliveryItems: [
                {
                  ingredientName: '',
                  orderedQuantity: '',
                  pricePerKg: ''

                }
              ]
            }
        }
    },

    computed: {
        ...mapGetters(["allDeliveries", "allIngredients"]),

        ingredientOptions(){
            const tempArray1 = this.allIngredients.map(ingredient => ingredient.ingredientName)
            return tempArray1
        },
    },

    methods: {
        ...mapActions(["addDelivery"]),

        onSubmit() {
            this.addDelivery(this.formData)

        },
        addItem(){
          this.formData.deliveryItems.push({
            ingredientName: '',
            orderedQuantity: '',
            pricePerKg: ''

          })
        },
        deleteItem(){
          this.formData.deliveryItems.pop();
        },
        onCancel(){
          router.push({ path : '/admin/deliveries' })

        },
        created(){
        }
    }

}
</script>
<style>
</style>












