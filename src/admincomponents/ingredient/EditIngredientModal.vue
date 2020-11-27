<template>
    <b-modal
        id="edit-ingredient-modal"
        ref="edit-ingredient-modal"
        :hide-footer="true"
        @hidden="resetModal"
        :propIngredient="propIngredient"
    >
        <b-container class="container-sm">
            <h5 class="mb-4">Edit Ingredient</h5>

            <b-form @submit="onSubmit">
                <b-form-group label="Ingredient name" label-for="ingredientName">
                    <b-form-input type="text" v-model.lazy="propIngredient.ingredientName" class="form-control"></b-form-input>
                    <span
                        v-if="!$v.propIngredient.ingredientName.required && $v.propIngredient.ingredientName.$dirty"
                        class="text-danger"
                    >
                        Name cannot be empty!</span
                    >
                    <span
                        v-if="!$v.propIngredient.ingredientName.isUnique && $v.propIngredient.ingredientName.$dirty"
                        class="text-danger"
                        >Such item already exists in the database!</span
                    >
                </b-form-group>

                <b-form-group label="Category" label-for="ingredientCategegory">
                    <b-form-select v-model.lazy="propIngredient.ingredientCategory" class="form-control">
                        <option>GRAINS</option>
                        <option>MEAT</option>
                        <option>DAIRY</option>
                        <option>VEGETABLES</option>
                        <option>FRUITS</option>
                        <option>FATS</option>
                        <option>SPICES</option>
                    </b-form-select>
                    <span
                        v-if="!$v.propIngredient.ingredientCategory.required && $v.propIngredient.ingredientName.$dirty"
                        class="text-danger"
                        >Category cannot be empty</span
                    >
                </b-form-group>

                <b-form-group label="Shelf life" label-for="shelfLife">
                    <b-form-input type="text" v-model.lazy="propIngredient.shelfLife" class="form-control"></b-form-input>
                    <span v-if="!$v.propIngredient.shelfLife.required && $v.propIngredient.shelfLife.$dirty" class="text-danger"
                        >Shelf life cannot be empty!</span
                    >
                    <span
                        v-if="
                            (!$v.propIngredient.shelfLife.minValue || !$v.propIngredient.shelfLife.maxValue) &&
                                $v.propIngredient.ingredientName.$dirty
                        "
                        class="text-danger"
                        >Shelf life must be between 1 and 180 days!</span
                    >
                </b-form-group>
            </b-form>
            <div class="float-right">
                    <b-button variant="secondary" @click="onCancel">Cancel</b-button>
                    <b-button type="submit" variant="warning" class="ml-2" @click="onSubmit">Submit</b-button>
                </div>
        </b-container>
        <pre v-html="propIngredient" />
    </b-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required, minValue, maxValue } from "vuelidate/lib/validators";
import store from "../../_store/index.js";

const isUnique = (value) => {
    if (value === "") return true;

    const tempArray = store.getters.allIngredients.map((ingredient) => ingredient.ingredientName);

    if (tempArray.filter((item) => item == value).length > 1) {
        return false;
    } else {
        return true;
    }
};

export default {
    name: "EditIngredientModal",

    props: {
        propIngredient: {},
    },
    // data() {
    //     return {
    //         ingredient: {},
    //     };
    // },
    validations: {
        propIngredient: {
            ingredientName: {
                required,
                isUnique,
            },
            ingredientCategory: {
                required,
            },
            shelfLife: {
                required,
                maxValue: maxValue(180),
                minValue: minValue(1),
            },
        },
    },

    computed: {
        ...mapGetters(["getIngredientById"]),
    },

    methods: {
        ...mapActions(["editIngredient"]),

        onSubmit() {
            this.$v.$touch();

            if (!this.$v.$invalid) {
                console.log("Is Valid")
                this.editIngredient(this.propIngredient)
                this.$refs["edit-ingredient-modal"].hide()
            } else {
                console.log("Is Invalid")
            }
        },
        onCancel() {
            this.$refs["edit-ingredient-modal"].hide();
        },
        resetModal() {
            this.$v.$reset();
        },
    },
    // mounted() {
    //     this.ingredient = this.propIngredient;
    // },
};
</script>
<style></style>
