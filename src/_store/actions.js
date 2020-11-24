import axios from 'axios'
import router from '../router'


const serverUrl = 'http://marwit23cook.herokuapp.com'
const ingredients = 'api/ingredients'
const deliveries = 'api/deliveries'
const recipes = 'api/dishes'
const todos = 'api/to-do-dishes'
const ingredientListUrl = `${serverUrl}/${ingredients}`
const deliveryListUrl = `${serverUrl}/${deliveries}`
const recipeListUrl = `${serverUrl}/${recipes}`
const todoListUrl = `${serverUrl}/${todos}`

export default {

    // USER------------------------------------------------------------------------------------------------

    setUser({ commit }, payload) {
        commit('setUser', payload)
    },


    // INGREDIENTS-----------------------------------------------------------------------------------------

    async getAllIngredients({ commit }) {
        const response = await axios.get(
            ingredientListUrl
        );
        console.log(response)
        commit('setIngredients', response.data)
    },

    async addIngredient({ commit }, ingredient) {
        const response = await axios({
            method: 'post',
            url: ingredientListUrl,
            data: ingredient,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })
        console.log(response.data)
        commit('newIngredient', response.data);
    },

    async deleteIngredient({ commit }, id) {
        await axios({
            method: 'delete',
            url: `${ingredientListUrl}/${id}`,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        commit('deleteIngredient', id);
    },

    async editIngredient({ commit }, ingredient) {
        const response = await axios({
            method: 'put',
            url: `${ingredientListUrl}/${ingredient.ingredientId}`,
            data: ingredient,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        console.log(response.data)
        commit('updateIngredient', response.data);
    },

    // DELIVERIES------------------------------------------------------------------------------------------

    async getAllDeliveries({ commit }) {
        const response = await axios.get(
            deliveryListUrl
        );
        console.log(response)
        commit('setDeliveries', response.data)
    },

    async getDelivery({ commit }, id) {
        const response = await axios.get(
            `${deliveryListUrl}/${id}`
        );
        console.log(response)
        commit('setTempDelivery', response.data)
    },

    async addDelivery({ commit }, delivery) {
        const response = await axios({
            method: 'post',
            url: deliveryListUrl,
            data: delivery,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })
        console.log(response.data)
        commit('newDelivery', response.data);
        if(response.status === 200) {
               router.push({ path : '/admin/deliveries' });
        }
    },

    async deleteDelivery({ commit }, id) {
        await axios({
            method: 'delete',
            url: `${deliveryListUrl}/${id}`,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        commit('deleteDelivery', id);
    },

    async editDelivery({ commit }, delivery) {
        const response = await axios({
            method: 'put',
            url: `${deliveryListUrl}/${delivery.deliveryId}`,
            data: delivery,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        console.log(response.data)
        commit('updateDelivery', response.data);
        if(response.status === 200) {
               router.push({ path : '/admin/deliveries' });
        }
    },


    // RECIPES---------------------------------------------------------------------------------------------

    async getAllRecipes({ commit }) {
        const response = await axios.get(
            recipeListUrl
        );
        console.log(response)
        commit('setRecipes', response.data)
    },

    async getRecipe({ commit }, id) {
        const response = await axios.get(
            `${recipeListUrl}/${id}`
        );
        console.log(response)
        commit('setTempRecipe', response.data)
    },

    async addRecipe({ commit }, recipe) {
        const response = await axios({
            method: 'post',
            url: recipeListUrl,
            data: recipe,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })
        console.log(response.data)
        commit('newRecipe', response.data);
        if(response.status === 200) {
               router.push({ path : '/admin/recipes' });
        }
    },

    async deleteRecipe({ commit }, id) {
        await axios({
            method: 'delete',
            url: `${recipeListUrl}/${id}`,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        commit('deleteRecipe', id);
    },

    async editRecipe({ commit }, recipe) {
        const response = await axios({
            method: 'put',
            url: `${recipeListUrl}/${recipe.dishId}`,
            data: recipe,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        commit('updateRecipe', response.data);
        if(response.status === 200) {
               router.push({ path : '/admin/recipes' });
        }
    },


    // TODOS-----------------------------------------------------------------------------------------------

    async getAllTodos({ commit }) {
        const response = await axios.get(
            todoListUrl
        );
        console.log(response)
        commit('setTodos', response.data)
    },

    async addTodo({ commit }, todo) {
        const response = await axios({
            method: 'post',
            url: todoListUrl,
            data: todo,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        })
        console.log(response.data)
        commit('newTodo', response.data);
    },

    async deleteTodo({ commit }, id) {
        await axios({
            method: 'delete',
            url: `${todoListUrl}/${id}`,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        commit('deleteTodo', id);
    },

    async editTodo({ commit }, todo) {
        const response = await axios({
            method: 'put',
            url: `${todoListUrl}/${todo.toDoDishId}`,
            data: todo,
            auth: {
                username: 'admin',
                password: 'admin'
            }
        });
        console.log(response.data)
        commit('updateTodo', response.data);
    },

}