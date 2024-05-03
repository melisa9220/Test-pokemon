const User = require("../data/mongo/models/userModel");

const saveUser = async (user) => {
  const { email, password } = user;
  const newUser = new User({
    email,
    password,
  });
  const savedUser = await newUser.save();
  return {
    email: savedUser.email,
    id: savedUser._id,
  };
};

const getUser = async (email) => {
  return User.findOne({ email });
};

module.exports = { saveUser, getUser };
