const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return email.match(emailRegex) !== null;
};

module.exports = validateEmail;
