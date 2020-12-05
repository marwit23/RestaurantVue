<template>
  <b-modal
    id="view-delivery-modal"
    size="lg"
    ref="view-delivery-modal"
    ok-only
    okTitle="OK"
    okVariant="success"
    :propDelivery="propDelivery"
  >
    <b-container class="container-md">
      <h5 class="mb-4">Order id: {{ propDelivery.deliveryId }}</h5>
      <b-row class="mb-4">
        <b-col>Status: {{ propDelivery.deliveryStatus }}</b-col>
        <b-col>Ordered: {{ propDelivery.orderedDate }}</b-col>
        <b-col>Delivered: {{ propDelivery.deliveredDate }}</b-col>
      </b-row>
      <b-table striped hover :items="propDelivery.deliveryItems"></b-table>
    </b-container>
  </b-modal>
</template>
<script>
export default {
  name: "ViewDeliveryModal",

  props: {
    propDelivery: {},
  },

  beforeUpdate() {
    console.log(this.propDelivery);
  },
};
</script>
<style></style>
