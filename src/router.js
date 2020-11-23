import Vue from 'vue'
import Router from 'vue-router'
import AdminPanel from './admincomponents/AdminPanel.vue'
import UserPanel from './usercomponents/UserPanel.vue'
import DeliveryList from './admincomponents/delivery/DeliveryList.vue'
import IngredientList from './admincomponents/ingredient/IngredientList.vue'
import RecipeList from './admincomponents/recipe/RecipeList.vue'
import AddDelivery from './admincomponents/delivery/AddDelivery.vue'
import ConfirmDelivery from './admincomponents/delivery/ConfirmDelivery.vue'
import AddRecipe from './admincomponents/recipe/AddRecipe.vue'
import EditRecipe from './admincomponents/recipe/EditRecipe.vue'
import Todos from './usercomponents/todo/Todos.vue'
import Recipes from './usercomponents/recipe/Recipes.vue'
import Ingredients from './usercomponents/ingredient/Ingredients.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/admin',
            name: 'admin',
            component: AdminPanel,
            children: [{
                    path: '/admin/ingredients',
                    name: 'adminAngredients',
                    component: IngredientList,
                },
                {
                    path: '/admin/recipes',
                    name: 'adminRecipes',
                    component: RecipeList
                },
                {
                    path: '/admin/deliveries',
                    name: 'adminDeliveries',
                    component: DeliveryList
                },
                {
                    path: '/admin/add-delivery',
                    name: 'addDeliveries',
                    component: AddDelivery
                },
                {
                    path: '/admin/confirm-delivery',
                    name: 'confirmDelivery',
                    component: ConfirmDelivery
                },
                {
                    path: '/admin/add-recipe',
                    name: 'addRecipe',
                    component: AddRecipe
                },
                {
                    path: '/admin/edit-recipe',
                    name: 'editRecipe',
                    component: EditRecipe
                },

            ]
        },
        {
            path: '/user',
            name: 'user',
            component: UserPanel,
            children: [
                {
                    path: '/user/todos',
                    name: 'Todos',
                    component: Todos
                },
                {
                    path: '/user/recipes',
                    name: 'Recipes',
                    component: Recipes
                },
                                {
                    path: '/user/ingredients',
                    name: 'Ingredients',
                    component: Ingredients
                },
            ]
        }
    ]
})