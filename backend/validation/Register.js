const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(user) {
  let errors = {};

  user.name = !isEmpty(user.name) ? user.name : "";
  user.firstname = !isEmpty(user.firstname) ? user.firstname : "";
  user.login = !isEmpty(user.login) ? user.login : "";
  user.direction = !isEmpty(user.direction) ? user.direction : "";
  user.grade = !isEmpty(user.grade) ? user.grade : "";
  user.password = !isEmpty(user.password) ? user.password : "";
  user.confirm = !isEmpty(user.confirm) ? user.confirm : "";

  if (validator.isEmpty(user.name)) {
    errors.name = "Required name";
  }

  if (validator.isEmpty(user.firstname)) {
    errors.firstname = "Required firstname";
  }

  if (validator.isEmpty(user.login)) {
    errors.login = "Required login";
  }

  if (validator.isEmpty(user.direction)) {
    errors.direction = "Required direction";
  }
  if (validator.isEmpty(user.grade)) {
    errors.grade = "Required grade";
  }
  if (validator.isEmpty(user.password)) {
    errors.password = "Required password";
  }

  if (!validator.equals(user.password, user.confirm)) {
    errors.confirm = "Passwords not matches";
  }

  if (validator.isEmpty(user.confirm)) {
    errors.confirm = "Required confirm";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
