<template>
    <b-container class="container-sm mb-4 custom-width-1">
        <h5 class="mb-4 mt-4">Confirm Delivery</h5>
            <table class="table smaller-font border-bottom border-top-hidden">
                <thead>
                    <tr>
                        <th>Ingredient</th>
                        <th>Price per kg</th>
                        <th>Ordered quantity</th>
                        <th>Delivered quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="deliveryItem in tempDelivery.deliveryItems" :key="deliveryItem.deliveryItemId">
                        <td>{{deliveryItem.ingredientName}}</td>
                        <td>{{deliveryItem.pricePerKg}}</td>
                        <td>{{deliveryItem.orderedQuantity}}</td>
                        <td>
                            <b-form inline @submit="onSubmit">                                
                                <b-input-group>
                                    <b-form-input type="text" 
                                        v-model="deliveryItem.deliveredQuantity" 
                                        :value="deliveryItem.orderedQuantity" 
                                        :class="[{red: deliveryItem.deliveredQuantity == 0}]" 
                                        class="form-control" 
                                        placeholder="confirm quantity">
                                    </b-form-input>
                                    <template #prepend>
                                        <b-button 
                                        class="btn btn-light" 
                                        @click="deliveryItem.deliveredQuantity = deliveryItem.orderedQuantity">
                                        <b-icon icon="box-arrow-right"></b-icon>
                                        </b-button>
                                    </template>
                                </b-input-group>
                            </b-form>                            
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="mt-4">
                <b-button variant="secondary" @click="onCancel">Cancel</b-button>
                <b-button type="submit" variant="warning" class="ml-2" @click="onSubmit">Submit</b-button>
            </div>

        </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import router from '../../router'


export default { 
    name: "ConfirmDelivery",
    data() {
        return {

        }
    },

    computed: {
        ...mapGetters(["tempDelivery"]),

        setDate(){
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '-' + mm + '-' + yyyy;
            return today;
        }

    },

    methods: {
        ...mapActions(["editDelivery"]),

        onSubmit() {
            this.tempDelivery.deliveredDate = this.setDate
            this.editDelivery(this.tempDelivery)
        },
        onCancel(){
            router.push({ path : '/admin/deliveries' })

        }
    },
    created() {
        console.log(this.tempDelivery.deliveryId)
    },
    beforeUpdate() {
        // console.log(this.formData)
    }
    
}
</script>
<style>
.red {
    color:red;
}
</style>




