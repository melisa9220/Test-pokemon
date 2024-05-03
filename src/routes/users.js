const express = require("express");
const api = express.Router();
const middleware = require("../middleware/serviceMiddleware");
const {
  authenticateUser,
  createUser,
} = require("../controllers/usersController");
const {
  createPokemon,
  getPokemonsByUser,
  removePokemon,
  modifyPokemon,
} = require("../controllers/pokemonController");

api.post("/auth", authenticateUser);
api.post("/", createUser);
api.use(middleware);
api.post("/:id/pokemons", createPokemon);
api.get("/:id/pokemons", getPokemonsByUser);
api.delete("/:id/pokemons/:pokemonId", removePokemon);
api.patch("/:id/pokemons/:pokemonId", modifyPokemon);

module.exports = api;
