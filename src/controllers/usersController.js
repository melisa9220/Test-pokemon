const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");
const { validateEmail, validatePassword } = require("../utils/index");
const { SECRET_KEY } = require("../../config");

const validateData = (email, password, res) => {
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: "Email not valid" });
  }
  if (!password || !validatePassword(password)) {
    return res.status(400).json({
      error: `Your password might contains at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ].`,
    });
  }
};
const createUser = async (req, res) => {
  const { email, password } = req.body;
  validateData(email, password, res);
  const gotUser = await userRepository.getUser(email.toLowerCase());

  if (gotUser) {
    return res.status(409).send({ msg: "Email really exist" });
  }
  const passwordCrypt = bcrypt.hashSync(password, 10);
  const dataUser = {
    email,
    password: passwordCrypt,
  };
  const user = await userRepository.saveUser(dataUser);

  return res.status(201).send({ createdUser: user, msg: "User created" });
};

const authenticateUser = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;

    validateData(email, password, res);
    const user = await userRepository.getUser(email.toLowerCase());

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const { _id, email: userEmail } = user;
        const tokenData = { _id, email: userEmail };
        const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: "120m" });

        return res.status(200).send({ token });
      }
      return res.status(404).send({ msg: "Password is incorrect" });
    }
    return res.status(404).send({ msg: "User doesn't find, verify your data" });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

module.exports = { createUser, authenticateUser };
