export default {

   // USER------------------------------------------------------------------------------------------------

    getUser: (state) => {
        return state.user
    },


    // INGREDIENTS-----------------------------------------------------------------------------------------

    allIngredients: (state) => {
        return state.ingredients
    },
    ingredientById: (state) => (id) => {
        return state.ingredients.find(ingredient => ingredient.ingredientId === id)
    },

    // DELIVERIES------------------------------------------------------------------------------------------

    allDeliveries: (state) => {
        return state.deliveries
    },
    deliveryById: (state) => (id) => {
        return state.deliveries.find(delivery => delivery.deliveryId === id)
    },
    tempDelivery: (state) => {
        return state.tempDelivery
    },


    // RECIPES---------------------------------------------------------------------------------------------

    allRecipes: (state) => {
        return state.recipes
    },
    recipeById: (state) => (id) => {
        return state.recipes.find(recipe => recipe.dishId === id)
    },
    tempRecipe: (state) => {
        return state.tempRecipe
    },


    // TODOS-----------------------------------------------------------------------------------------------

    allTodos: (state) => {
        return state.todos
    },
    todoById: (state) => (id) => {
        return state.todos.find(todo => todo.toDoDishId === id)
    }

}