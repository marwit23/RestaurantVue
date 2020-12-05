<template>
	<b-modal
		id="delete-ingredient-modal"
		ref="delete-ingredient-modal"
		okTitle="Delete"
		okVariant="danger"
		@ok="onSubmit"
		:propIngredient="propIngredient"
	>
		<h5 class="mb-4">{{ propIngredient.ingredientName }}</h5>
		<p>Are you sure you want to delete this ingredient?</p>
		<p class="mb-4">This action cannot be undone.</p>
	</b-modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
	name: "DeleteIngredientModal",

	props: {
		propIngredient: {},
	},

	methods: {
		...mapActions(["deleteIngredient"]),

		onSubmit() {
			this.deleteIngredient(this.propIngredient.ingredientId);
		},
	},
};
</script>
<style></style>
