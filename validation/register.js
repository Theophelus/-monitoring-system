// const Validator = require('validator');
// const isEmpty = require('./is-empty');

// module.exports = function registrationValidation(data) {

//   let errors = {};
//   data.email = !isEmpty(data.email) ? data.email : '';
//   data.full_name = !isEmpty(data.fullName) ? data.full_name : '';
//   data.password = !isEmpty(data.password) ? data.password : '';


//   if (!Validator.isLength(data.user_name, {
//       min: 2,
//       max: 30
//     })) {
//     errors.userName = 'Username must be between 2 and 30 characters';
//   }
//   if (!Validator.isLength(data.full_name, {
//       min: 2,
//       max: 30
//     })) {
//     errors.user_name = 'Fullname must be between 2 and 30 characters';
//   }

//   if (Validator.isEmpty(data.userName)) {
//     errors.user_name = 'Username field is required';
//   }

//   if (Validator.isEmpty(data.fullName)) {
//     errors.full_name = 'Fullname field is required';
//   }

//   if (!Validator.isLength(data.password, {
//     min: 6,
//     max: 30
//   })) {
//   errors.password = 'Password must be at least 6 characters';
// }

//   if (Validator.isEmpty(data.password)) {
//     errors.password = 'Password field is required';
//   }
 

//   if (Validator.isEmpty(data.password2)) {
//     errors.password2 = 'Confirm Password field is required';
//   }

//   if (!Validator.equals(data.password, data.password2)) {
//     errors.password2 = 'Passwords must match';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };