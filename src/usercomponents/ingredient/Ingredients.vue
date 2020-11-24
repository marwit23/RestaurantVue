<template>
    <div>
        <div class="ml-2 mt-2">
            <b-row class="my-2">
                
                <b-form inline class="ml-3">
                        <label for="search">Search</label>
                    <b-col sm="10">
                        <b-form-input label="search" id="search" type="text" v-model="search" />
                    </b-col>
                </b-form>

                <b-form inline class="ml-4">
                    <label for="filter">Filter by category</label>
                    <b-col class="sm-10">
                    <b-form-select id="filter" v-model="filter">
                        <option value="">ALL</option>
                        <option>Grains</option>
                        <option>Meat</option>
                        <option>Dairy</option>
                        <option>Vegetables</option>
                        <option>Fruits</option>
                        <option>Fats</option>
                        <option>Spices</option>
                    </b-form-select>
                </b-col>
                </b-form>

                <b-form inline class="ml-4">
                    <label for="sort">Sort by</label>
                    <b-col class="sm-10">
                        <b-input-group>
                    <b-form-select id="sortParam" v-model="sortParam">
                        <option value="ingredientId" selected>Id</option>
                        <option value="shelfLife">Shelf life</option>
                        <option value="availableQuantity">Available quantity</option>
                        <option value="expiredQuantity">Expired quantity</option>
                        <option value="usedQuantity">Used quantity</option>
                        <option value="orderedQuantity">Ordered quantity</option>
                    </b-form-select>
                    <template #append>
                        <b-button class="btn btn-light" @click="sortAsc = !sortAsc">
                            <b-icon v-if="sortAsc" icon="chevron-up"></b-icon>
                            <b-icon v-else icon="chevron-down"></b-icon>
                        </b-button>
                    </template>
                </b-input-group>
                </b-col>
                </b-form>               
            </b-row>
        </div>

        <table class="table smaller-font">
            <thead>
                <tr class="">
                    <th>Id</th>
                    <th>Ingredient</th>
                    <th>Category</th>
                    <th>Shelf Life</th>
                    <th>Available Quantity</th>
                    <th>Expired Quantity</th>
                    <th>Used Quantity</th>
                    <th>Ordered Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ingredient in paginatedData" :key="ingredient.ingredientId">
                    <td>{{ingredient.ingredientId}}</td>
                    <td>{{ingredient.ingredientName}}</td>
                    <td>{{ingredient.ingredientCategory}}</td>
                    <td>{{ingredient.shelfLife}}</td>
                    <td>{{ingredient.availableQuantity}}</td>
                    <td>{{ingredient.expiredQuantity}}</td>
                    <td>{{ingredient.usedQuantity}}</td>
                    <td>{{ingredient.orderedQuantity}}</td>
                </tr>
            </tbody>
        </table>

        <div class="mb-5">
            <button :disabled="pageNumber == 0" class="btn btn-outline-secondary btn-sm ml-3" @click="prevPage">Prev</button>
            <button :disabled="pageNumber > (pageCount - 2)" class="btn btn-outline-secondary btn-sm ml-2" @click="nextPage">Next</button>
        </div>
        <div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'IngredientList',
    data() {
        return {
            tempIngredient: {},
            pageNumber: 0,
            size: 10,
            search: '',
            filter: '',
            sortParam: '',
            sortAsc: true
        }
    },

    computed: {
        ...mapGetters(["allIngredients"]),

        pageCount() {
            let l = this.filteredList.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filteredList.slice(start, end);
        },
        filteredList() {
            return this.searchList.filter(ingredient => {
                return ingredient.ingredientCategory.includes(this.filter.toUpperCase())
            })
        },
        searchList() {
            return this.sortedList.filter(ingredient => {
                return ingredient.ingredientName.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        sortedList(){
            var tempSortedList = JSON.parse(JSON.stringify(this.allIngredients))
            if(this.sortAsc) tempSortedList.sort(this.propComparator(this.sortParam))
            else tempSortedList.sort(this.propComparator(this.sortParam)).reverse()
            return tempSortedList
        }

    },

    methods: {
        ...mapActions(["getAllIngredients"]),

        nextPage() {
            this.pageNumber++
        },
        prevPage() {
            this.pageNumber--
        },
        propComparator(prop) {
            return function(a, b) {
                return a[prop] - b[prop];
            }
        }
    },

    created() {
        this.getAllIngredients();
    }
};
</script>
<style>
.dark-gray {
    color: darkgray
}

.smaller-font {
    font-size: 90%;
}
</style>