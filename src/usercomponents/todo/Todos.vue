<template>
    <div class="container">
        <div class="row mt-4">

        <b-col>
        <b-button v-b-modal.add-todo-modal variant="warning ml-3 btn-lg font-size">+</b-button>
        </b-col>

        <b-col class="col-11">

        <div 
            class="card mb-2"
            :class="[{'border-danger': todo.toDoStatus == 'OPENED'}]"
            v-for="todo in allTodos" 
            :key="todo.toDoDishId">
          <div class="card-header">Order id: {{todo.toDoDishId}}</div>
          <div class="card-body">
            <b-row>
                <b-col 
                    class="font-weight-bold" 
                    :class="[{disabled: todo.toDoStatus == 'COMPLETED'}]">{{todo.dishName}}
                </b-col>
                <b-col 
                    class="text-center font-weight-bold"
                    :class="[{disabled: todo.toDoStatus == 'COMPLETED'}]">
                    {{todo.dishQuantity}}
                    <b-button 
                        variant="outline-secondary btn-sm ml-3" 
                        :disabled="todo.toDoStatus == 'COMPLETED' "
                        @click="incrementQuantity(todo)">+
                    </b-button>
                    <b-button 
                        variant="outline-secondary btn-sm ml-2"
                        :disabled="todo.toDoStatus == 'COMPLETED' || todo.dishQuantity == 1 " 
                        @click="decrementQuantity(todo)">-
                    </b-button>
                </b-col>
                <b-col 
                    class="text-right mr-4"
                    :class="[{redbold: todo.toDoStatus == 'OPENED'}, {green: todo.toDoStatus == 'COMPLETED'},]">{{todo.toDoStatus}}
                </b-col>
            </b-row>        
          </div>
          <div class="card-footer">
            <b-row>
                <b-col>
                    <b-button 
                        v-if="todo.toDoStatus !== 'COMPLETED' "
                        variant="outline-secondary btn-sm" 
                        :disabled="todo.toDoStatus == 'COMPLETED' ">Edit
                    </b-button>
                    <b-button 
                        v-if="todo.toDoStatus !== 'COMPLETED' " 
                        v-b-modal.modal-1 @click="setTempTodo(todo)"
                        variant="outline-secondary btn-sm ml-2">Delete
                    </b-button>
                </b-col>
                <b-col>
                    <b-button 
                        v-if="todo.toDoStatus == 'WAITING' " 
                        variant="secondary mr-3 float-right" 
                        @click="setOpened(todo)">Open
                    </b-button>
                    <div v-else-if="todo.toDoStatus == 'OPENED' " >
                        <b-button 
                            variant="danger mr-3 float-right" 
                            @click="setCompleted(todo)">Complete
                        </b-button> 
                        <b-button 
                            variant="outline-secondary mr-3 float-right" 
                            @click="setWaiting(todo)">Cancel
                        </b-button> 
                    </div>
                </b-col>
            </b-row>
               
          </div>
        </div>

        </b-col>

        <b-modal id="modal-1" okVariant="danger" okTitle="Delete" @ok="deleteTodo(tempTodo.toDoDishId)">
            <h5 class="mb-4">Confirm delete order ID: {{tempTodo.dishName}}</h5>
            <p class="my-4">Are you sure you want to delete this item? This action cannot be undone.</p>
        </b-modal>

        <AddTodoModal />

        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AddTodoModal from './AddTodoModal.vue'

export default {
    name: 'Todos',
    
    data() {
        return {
            tempTodo: {},
            isEditable: false
        }
    },
     components: {
        AddTodoModal

    },

    computed: {
        ...mapGetters(["allTodos"]),

        sortedList(){
            var tempSortedList = JSON.parse(JSON.stringify(this.allTodos))
            tempSortedList.sort(this.propComparator(this.sortParam))
            return tempSortedList
        }
    },

    methods: {
        ...mapActions(["getAllTodos", "editTodo", "deleteTodo"]),

        setTempTodo(todo) {
            this.tempTodo = todo
            console.log(this.tempTodo)
        },
        setOpened(todo) {
            todo.toDoStatus = 'OPENED'
            this.editTodo(todo)
        },
        setCompleted(todo) {
            todo.toDoStatus = 'COMPLETED'
            this.editTodo(todo)
        },
        setWaiting(todo) {
            todo.toDoStatus = 'WAITING'
            this.editTodo(todo)
        },
        incrementQuantity(todo) {
            todo.dishQuantity +=1
            this.editTodo(todo)
        },
        decrementQuantity(todo) {
            todo.dishQuantity -=1
            this.editTodo(todo)
        },
    },

    created() {
        this.getAllTodos();
    },

};
</script>
<style>

.redbold {
    color: red;
    font-weight: bold;
}
.green {
    color: green;
    font-weight: bold;
}

.disabled {
    color: gray;
}

</style>





