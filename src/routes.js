const express = require("express");
const { pokemon, users } = require("./routes/index");

const router = express.Router();

router.use("/users", users);
router.use("/pokemons", pokemon);

module.exports = router;
