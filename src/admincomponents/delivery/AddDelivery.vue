<template>
  <b-container class="container-sm mb-4 custom-width-1">
    <h5 class="mb-4 mt-4">New Purchase Order</h5>

    <ValidationObserver v-slot="{ invalid }">
      <b-form
        @submit.prevent="handleSubmit(onSubmit)"
        class="border-bottom pb-2"
      >
        <div
          v-for="deliveryItem in formData.deliveryItems"
          :key="deliveryItem.deliveryItemId"
        >
          <b-row>
            <b-col>
              <ValidationProvider
                name="Ingredient"
                rules="required"
                v-slot="{ errors }"
              >
                <b-form-select
                  v-model="deliveryItem.ingredientName"
                  @blur.native="validateUnique"
                  :options="ingredientOptions"
                  class="mb-2 mr-sm-2"
                >
                </b-form-select>
                <span class="text-danger text-small">{{ errors[0] }}</span>
                <span
                  v-show="!checkUnique(deliveryItem.ingredientName)"
                  class="text-danger text-small"
                  >This item is duplicate</span
                >
              </ValidationProvider>
            </b-col>

            <b-col>
              <ValidationProvider
                name="Quantity"
                rules="required|integer|min_value:1"
                v-slot="{ errors }"
              >
                <b-form-input
                  v-model="deliveryItem.orderedQuantity"
                  placeholder="Quantity in grams"
                  onfocus="this.placeholder = ''"
                  onblur="this.placeholder = 'Quantity in grams'"
                  class="mb-2 mr-sm-2"
                >
                </b-form-input>
                <span class="text-danger text-small">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-col>
            <b-col>
              <ValidationProvider
                name="Price"
                rules="required|double|min_value:0"
                v-slot="{ errors }"
              >
                <b-form-input
                  v-model="deliveryItem.pricePerKg"
                  placeholder="Price per kg"
                  onfocus="this.placeholder = ''"
                  class="mb-2 mr-sm-2"
                >
                </b-form-input>
                <span class="text-danger text-small">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-col>
            <b-col>
              <b-button
                v-if="
                  deliveryItem ===
                    formData.deliveryItems[formData.deliveryItems.length - 1]
                "
                variant="primary"
                class="ml-4 mb-2 mr-sm-2"
                @click="addItem"
                >+
              </b-button>

              <b-button
                v-if="
                  deliveryItem ===
                    formData.deliveryItems[formData.deliveryItems.length - 1] &&
                    deliveryItem !== formData.deliveryItems[0]
                "
                variant="secondary"
                class="mb-2 mr-sm-2"
                @click="deleteItem"
                >-
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-form>
      <div class="mt-4">
        <b-button variant="secondary" @click="onCancel">Cancel</b-button>
        <b-button
          type="submit"
          variant="warning"
          class="ml-2"
          :disabled="invalid || !isUnique"
          @click="onSubmit"
          >Submit</b-button
        >
      </div>
    </ValidationObserver>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import router from "../../router";

export default {
  name: "AddDelivery",
  data() {
    return {
      formData: {
        deliveryItems: [
          {
            ingredientName: null,
            orderedQuantity: null,
            pricePerKg: null,
          },
        ],
      },
      isUnique: true,
    };
  },
  computed: {
    ...mapGetters(["allDeliveries", "allIngredients"]),

    ingredientOptions() {
      return this.allIngredients.map((ingredient) => ingredient.ingredientName);
    },
    itemsArray() {
      return this.formData.deliveryItems.map(
        (deliveryItem) => deliveryItem.ingredientName
      );
    },
  },

  methods: {
    ...mapActions(["addDelivery"]),

    onSubmit() {
      this.addDelivery(this.formData);
    },
    checkUnique(value) {
      if (
        value !== null &&
        this.itemsArray.filter((item) => item == value).length > 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    validateUnique() {
      var tempSet = new Set(this.itemsArray);
      if (tempSet.size !== this.itemsArray.length) {
        this.isUnique = false;
      } else {
        this.isUnique = true;
      }
      console.log(this.isUnique);
    },

    addItem() {
      this.formData.deliveryItems.push({
        ingredientName: null,
        orderedQuantity: null,
        pricePerKg: null,
      });
    },
    deleteItem() {
      this.formData.deliveryItems.pop();
    },
    onCancel() {
      router.push({ path: "/admin/deliveries" });
    },
  },
};
</script>
<style></style>
