// const Validator = require('validator');
// const isEmpty = require('./is-empty');

// module.exports = function loginValidation(data) {
//   let errors = {};

//   data.user_name = !isEmpty(data.user_name) ? data.user_name : '';
//   data.password = !isEmpty(data.password) ? data.password : '';


//   if (Validator.isEmpty(data.user_name)) {
//     errors.user_name = 'Please enter User Name';
//   }

//   if (Validator.isEmpty(data.password)) {
//     errors.password = 'Please enter Password';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };