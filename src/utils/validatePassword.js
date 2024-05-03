const validatePassword = (password) => {
  return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#?]).{10,}$/) !== null;
};

module.exports = validatePassword;
