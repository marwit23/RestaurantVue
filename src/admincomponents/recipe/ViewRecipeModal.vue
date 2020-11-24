<template>
    <b-modal
        id="view-recipe-modal"
        size="lg"
        ref="view-delivery-modal"
        ok-only
        okTitle="OK"
        okVariant="success"
        @ok="onCancel"
        :propRecipe="propRecipe"
    >
        <b-container class="container-md">
            <h5>{{ propRecipe.dishName }}</h5>
            <p class="mb-4">Recipe id: {{ propRecipe.dishId }}</p>
            <b-table class="smaller-font" striped hover :items="propRecipe.ingredients"></b-table>
        </b-container>
    </b-modal>
</template>
<script>
export default {
    name: "ViewRecipeModal",

    props: {
        propRecipe: {},
    },

    methods: {
        onCancel() {
            this.$refs["view-recipe-modal"].hide();
        },
    },

    beforeUpdate() {
        console.log(this.propRecipe);
    },
};
</script>
<style></style>
