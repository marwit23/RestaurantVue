<template>
  <b-modal
    id="add-todo-modal"
    ref="add-todo-modal"
    okTitle="Submit"
    okVariant="warning"
    @ok="onSubmit"
    @hidden="resetModal"
  >
    <b-container class="container-sm">
      <h5 class="mb-4">New Recipe</h5>

      <b-form @submit.prevent="onSubmit" class="border-bottom pb-2">
        <b-row class="my-2">
          <b-col sm="6">
            <b-form-select v-model="formData.dishName" :options="dishOptions" class="mb-2 mr-sm-2"> </b-form-select>
          </b-col>
          <b-col>
            <b-form-input
              v-model="formData.dishQuantity"
              placeholder="Count"
              onfocus="this.placeholder = ''"
              class="mb-2 mr-sm-2"
            >
            </b-form-input>
          </b-col>
        </b-row>
      </b-form>
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
        dishName: "",
        dishQuantity: "",
        toDoDate: "",
        toDoStatus: "",
      },
    };
  },

  computed: {
    ...mapGetters(["allRecipes"]),

    dishOptions() {
      const tempArray1 = this.allRecipes.map((recipe) => recipe.dishName);
      return tempArray1;
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
    ...mapActions(["addTodo"]),

    onSubmit() {
      this.formData.toDoDate = this.setDate;
      this.formData.toDoStatus = "WAITING";
      this.addTodo(this.formData);
    },
    deleteItem() {
      this.formData.ingredients.pop();
    },
    resetModal() {
      this.formData.dishName = "";
      this.formData.dishQuantity = "";
      this.formData.toDoDate = "";
      this.formData.toDoStatus = "";
    },
  },
};
</script>
<style></style>
