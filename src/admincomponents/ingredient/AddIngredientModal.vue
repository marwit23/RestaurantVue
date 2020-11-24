<template>
    <b-modal id="add-ingredient-modal" ref="add-ingredient-modal" okTitle="Submit" okVariant="warning" @ok="onSubmit" @hidden="resetModal">
        <b-container class="container-sm">
            <h5 class="mb-4">Add Ingredient</h5>

            <b-form @submit="onSubmit">

                <b-form-group label="Ingredient name" label-for="ingredientName">
                    <b-form-input type="text" v-model="ingredient.ingredientName" class="form-control"></b-form-input>
                    <span v-if="!$v.ingredient.ingredientName.required && $v.ingredient.ingredientName.$dirty" class="text-danger">
                        Name is required!</span>
                    <span v-if="!$v.ingredient.ingredientName.isUnique && $v.ingredient.ingredientName.$dirty" class="text-danger">Name must be unique!</span>
                </b-form-group>

                <b-form-group label="Category" label-for="ingredientCategegory">
                    <b-form-select v-model="ingredient.ingredientCategory" class="form-control">
                        <option>GRAINS</option>
                        <option>MEAT</option>
                        <option>DAIRY</option>
                        <option>VEGETABLES</option>
                        <option>FRUITS</option>
                        <option>FATS</option>
                        <option>SPICES</option>
                    </b-form-select>
                    <span v-if="!$v.ingredient.ingredientCategory.required && $v.ingredient.ingredientName.$dirty" class="text-danger">Select a category!</span>
                </b-form-group>

                <b-form-group label="Shelf life" label-for="shelfLife">
                    <b-form-input type="text" v-model="ingredient.shelfLife" class="form-control"></b-form-input>
                    <span v-if="!$v.ingredient.shelfLife.required && $v.ingredient.shelfLife.$dirty" class="text-danger">Shelf life is required!</span>
                    <span v-if="(!$v.ingredient.shelfLife.minValue || !$v.ingredient.shelfLife.maxValue) && $v.ingredient.ingredientName.$dirty" class="text-danger">Shelf life must be between 1 and 180 days!</span>
                </b-form-group>

            </b-form>

            <!-- <div class="float-right">
            <b-button variant="secondary" @click="onCancel">Cancel</b-button>
            <b-button type="submit" variant="warning" class="ml-2" @click="onSubmit">Submit</b-button>
            </div> -->
            
        </b-container>
    </b-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required, minValue, maxValue } from "vuelidate/lib/validators";
import store from '../../_store/index.js';

const isUnique = (value) => {
    if (value === '') return true

    const tempArray = store.getters.allIngredients.map(ingredient => ingredient.ingredientName)
    console.log(store.getters.allIngredients)
    console.log(tempArray)

    if (tempArray.includes(value)) {
        return false
    } else {
        return true
    }

}


export default {
    name: "AddIngredientModal",
    data() {
        return {
            ingredient: {}
        }
    },
    validations: {

        ingredient: {
            ingredientName: {
                required,
                isUnique

            },
            ingredientCategory: {
                required
            },
            shelfLife: {
                required,
                maxValue: maxValue(180),
                minValue: minValue(1)
            }

        }

    },

    computed: {
        ...mapGetters(["allIngredients"]),
    },

    methods: {
        ...mapActions(["addIngredient"]),

        onSubmit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                console.log("Submitted")
                console.log(this.ingredient)
                this.addIngredient(this.ingredient)
                this.$refs['add-ingredient-modal'].hide()
            }
        },

        resetModal() {
            this.ingredient.ingredientName = ''
            this.ingredient.ingredientCategory = ''
            this.ingredient.shelfLife = ''
            this.$v.$reset()
        },

    },
    created() {}
}
</script>
<style>
</style>