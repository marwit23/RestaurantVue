export default {

    // USER------------------------------------------------------------------------------------------------

    setUser: (state, user) => state.user = user,


    // INGREDIENTS-----------------------------------------------------------------------------------------

    setIngredients: (state, ingredients) => state.ingredients = ingredients,
    newIngredient: (state, ingredient) => state.ingredients.push(ingredient),
    deleteIngredient(state, id) {
        const index = state.ingredients.findIndex(ingredient => ingredient.ingredientId === id)
        state.ingredients.splice(index, 1)
    },
    updateIngredient: (state, ingredient) => {
        const index = state.ingredients.findIndex(tempIngredient => tempIngredient.ingredientId === ingredient.ingredientId);
            state.ingredients.splice(index, 1, ingredient);
    },


    // DELIVERIES------------------------------------------------------------------------------------------

    setDeliveries: (state, deliveries) => state.deliveries = deliveries,
    setTempDelivery: (state, delivery) => state.tempDelivery = delivery,
    newDelivery: (state, delivery) => state.deliveries.unshift(delivery),
    deleteDelivery(state, id) {
        const index = state.deliveries.findIndex(delivery => delivery.deliveryId === id)
        state.deliveries.splice(index, 1)
    },
    updateDelivery: (state, delivery) => {
        const index = state.deliveries.findIndex(theDelivery => theDelivery.deliveryId === delivery.deliveryId);
        state.deliveries.splice(index, 1, delivery);
        console.log(delivery)
    },


    // RECIPES---------------------------------------------------------------------------------------------

    setRecipes: (state, recipes) => state.recipes = recipes,
    setTempRecipe: (state, recipe) => state.tempRecipe = recipe,
    newRecipe: (state, recipe) => state.recipes.push(recipe),
    deleteRecipe(state, id) {
        const index = state.recipes.findIndex(recipe => recipe.dishId == id)
        state.recipes.splice(index, 1)
    },
    updateRecipe: (state, recipe) => {
        const index = state.recipes.findIndex(theRecipe => theRecipe.dishId === recipe.dishId);
        state.recipes.splice(index, 1, recipe);
    },


    // TODOS-----------------------------------------------------------------------------------------------

    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos.push(todo),
    deleteTodo(state, id) {
        const index = state.todos.findIndex(todo => todo.toDoDishId == id)
        state.todos.splice(index, 1)
    },
    updateTodo: (state, todo) => {
        const index = state.todos.findIndex(theTodo => theTodo.toDoDishId === todo.toDoDishId);
            state.todos.splice(index, 1, todo);
    }

};


