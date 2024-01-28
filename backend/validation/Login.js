const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.login)) {
    errors.login = "Required login";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
