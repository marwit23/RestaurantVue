<template>
    <div>
        <table class="table smaller-font" style="border-top: hidden">
            <thead>
                <tr class="">
                    <th>
                        <router-link to="/admin/add-recipe">
                            <b-button variant="warning ml-2">Add New</b-button>
                        </router-link>
                    </th>
                    <th>Id</th>
                    <th>Dish name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="recipe in paginatedData" :key="recipe.dishId">
                    <td>
                        <b-button v-b-modal.view-recipe-modal @click="setTempRecipe(recipe)" class="btn btn-light btn-sm ml-2">View
                        </b-button>
                        
                            <b-button variant="btn btn-light btn-sm ml-2" @click="editRecipe(recipe)">Edit
                            </b-button>
                        
                            <b-button v-b-modal.modal-1 @click="setTempRecipe(recipe)" class="btn btn-light btn-sm ml-2">Delete
                            </b-button>                                  
                                         
                    </td>
                    <td>{{recipe.dishId}}</td>
                    <td>{{recipe.dishName}}</td>
                </tr>
            </tbody>
        </table>
        <div class="mb-5">
            <button :disabled="pageNumber == 0" class="btn btn-outline-secondary btn-sm ml-3" @click="prevPage">Prev</button>
            <button :disabled="pageNumber > (pageCount - 2)" class="btn btn-outline-secondary btn-sm ml-2" @click="nextPage">Next</button>
        </div>

        <b-modal id="modal-1" :hide-footer="true" okVariant="danger" cancelTitle="Cancel" okTitle="Delete">
                <div v-if="isAvailable" >
                <h5 class="mb-4">{{tempRecipe.dishName}}</h5>
                <p>Are you sure you want to delete this recipe?</p>
                <p class="mb-4">This action cannot be undone.</p>
                 <div class="float-right">
                    <b-button variant="secondary" @click="onCancel">Cancel</b-button>
                    <b-button type="submit" variant="danger" class="ml-2" @click="onSubmit">Delete</b-button>
                </div>
                </div>

                <div v-else>
                    <p class="my-4 font-weight-bold">Unable to delete. This recipe is in use!</p>
                    <p class="my4">All cooking orders that use this dish must be first removed from the list in User Panel.</p>
                    <div class="float-right">
                    <b-button variant="warning" class="ml-2" @click="onCancel">OK</b-button>
                    </div>
                </div>               
        </b-modal>

        <b-modal id="modal-2" ok-only okTitle="OK" okVariant="success">
            <p class="my-4 red">Unable to edit. This recipe is in use!</p>
            <p class="my4">All cooking orders that use this dish must be first removed from the list in User Panel.</p>
        </b-modal>

        <ViewRecipeModal :propRecipe="tempRecipe" />

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ViewRecipeModal from './ViewRecipeModal.vue'
import router from '../../router'

export default {
    name: 'RecipeList',
    
    data() {
        return {
            pageNumber: 0,
            size: 10,
            search: '',
            filter: '',
            isAvailable: true
        }
    },
     components: {
        ViewRecipeModal

    },

    computed: {
        ...mapGetters(["allRecipes", "tempRecipe", "allTodos"]),

        pageCount() {
            let l = this.allRecipes.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.allRecipes.slice(start, end);
        },
    },

    methods: {
        ...mapActions(["getAllRecipes", "getRecipe", "deleteRecipe"]),

        setTempRecipe(tempRecipe) {
            this.getRecipe(tempRecipe.dishId)
            this.isAvailable = true
            const tempArray = this.allTodos.map(toDo => toDo.dishName)
            const tempArray2 = tempArray.filter(dishName => dishName == tempRecipe.dishName)
            if (tempArray2.length > 0) this.isAvailable = false 
        },
        editRecipe(tempRecipe){
            console.log(tempRecipe)
            this.setTempRecipe(tempRecipe)
            if(this.isAvailable) router.push({ path : '/admin/edit-recipe' })
                else this.$bvModal.show('modal-2')

        },
        nextPage() {
            this.pageNumber++
        },
        prevPage() {
            this.pageNumber--
        },
        onCancel(){
            this.$bvModal.hide('modal-1')     
        },
        onSubmit(){
            this.deleteRecipe(this.tempRecipe.dishId)
            this.$bvModal.hide('modal-1')  
        }
    },

    created() {
        this.getAllRecipes();
    },

};
</script>
<style>
</style>