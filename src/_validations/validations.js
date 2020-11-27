import { extend } from "vee-validate"
import { required, integer, double } from "vee-validate/dist/rules"
import { localize } from 'vee-validate'
import { setInteractionMode } from 'vee-validate'
// import store from "../_store/index.js";

setInteractionMode('eager');


extend("required", required)
extend("integer", integer)
extend("double", double)

// extend('isRequired', value => {
//   if (value !== null) {
//     return true
//   }

//   return 'The {_field_} field is required';
// })


extend('greaterThan100', value => {
  if (value >= 100) {
    return true
  }

  return 'This field must be greater than 100'
})

// extend ("addDeliveryIngredient", value => {

//     const tempArray = store.getters.allIngredients.map((ingredient) => ingredient.ingredientName);

//     if (tempArray.filter((item) => item == value).length > 1) {
//         return false;
//     } else {
//         return true;
//     }
// })

localize({
  en: {
    messages: {
      required: '{_field_} is required',
      integer: '{_field_} must be an integer',
      double: '{_field_} must be a decimal number',
      ingredientUnique: 'This ingredient has already been selected'
    }
  }
})

