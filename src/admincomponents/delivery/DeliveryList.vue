<template>
    <div>
        <table class="table smaller-font" style="border-top: hidden">
            <thead>
                <tr class="">
                    <th>
                        <router-link to="/admin/add-delivery">
                            <b-button variant="warning ml-2">Add New</b-button>
                        </router-link>
                    </th>
                    <th>Id</th>
                    <th>Ordered Date</th>
                    <th>Status</th>
                    <th>Delivered Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="delivery in paginatedData" :key="delivery.deliveryId">
                    <td>
                        <b-button v-b-modal.view-delivery-modal @click="setTempDelivery(delivery.deliveryId)" class="btn btn-light btn-sm ml-2">View
                        </b-button>
                        <b-button v-if="delivery.deliveryStatus == 'ORDERED'" v-b-modal.modal-1 @click="setTempDelivery(delivery.deliveryId)" class="btn btn-danger btn-sm ml-2">Cancel</b-button>
                        <router-link to="/admin/confirm-delivery" v-if="delivery.deliveryStatus == 'ORDERED'">
                            <b-button variant="success btn-sm ml-2">
                                <span @click="setTempDelivery(delivery.deliveryId)">Confirm</span></b-button>
                        </router-link>
                    </td>
                    <td>{{delivery.deliveryId}}</td>
                    <td>{{delivery.orderedDate}}</td>
                    <td>{{delivery.deliveryStatus}}</td>
                    <td>{{delivery.deliveredDate}}</td>
                </tr>
            </tbody>
        </table>
        <div class="mb-5">
            <button :disabled="pageNumber == 0" class="btn btn-outline-secondary btn-sm ml-3" @click="prevPage">Prev</button>
            <button :disabled="pageNumber > (pageCount - 2)" class="btn btn-outline-secondary btn-sm ml-2" @click="nextPage">Next</button>
        </div>
        <b-modal id="modal-1" okVariant="danger" cancelTitle="Go back" okTitle="Cancel order" @ok="deleteDelivery(tempDelivery.deliveryId)">
            <h5 class="mb-4">Are you sure you want to cancel order ID: {{tempDelivery.deliveryId}} ?</h5>
            <p class="my-4">This action cannot be undone.</p>
        </b-modal>
        <ViewDeliveryModal :propDelivery="tempDelivery" />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ViewDeliveryModal from './ViewDeliveryModal.vue'

export default {
    name: 'DeliveryList',
    data() {
        return {
            pageNumber: 0,
            size: 10,
            search: '',
            filter: ''
        }
    },
    components: {
        ViewDeliveryModal

    },
    computed: {
        ...mapGetters(["allDeliveries", "tempDelivery"]),

        pageCount() {
            let l = this.allDeliveries.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.allDeliveries.slice(start, end);
        },
    },

    methods: {
        ...mapActions(["getAllDeliveries", "getDelivery", "deleteDelivery"]),

        setTempDelivery(id) {
            console.log(id)
            this.getDelivery(id)
            console.log(this.tempDelivery)
        },

        nextPage() {
            this.pageNumber++
        },
        prevPage() {
            this.pageNumber--
        }

    },

    created() {
        this.getAllDeliveries();
    },

};
</script>
<style>
</style>