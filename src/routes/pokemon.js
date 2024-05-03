const express = require("express");
const api = express.Router();
const { getPublicsPokemon } = require("../controllers/pokemonController");

api.get("/", getPublicsPokemon);

module.exports = api;
