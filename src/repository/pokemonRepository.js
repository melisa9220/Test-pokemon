const mongoose = require("mongoose");
const Pokemon = require("../data/mongo/models/pokemonModel");

const savePokemon = async (pokemon) => {
  const { userId, description, name, category, status, isPublic } = pokemon;
  const newPokemon = new Pokemon({
    userId: userId,
    description,
    name,
    category,
    status,
    isPublic,
  });
  const savedPokemon = await newPokemon.save();
  return {
    userId: savedPokemon.userId,
    description: savedPokemon.description,
    name: savedPokemon.name,
    category: savedPokemon.category,
    status: savedPokemon.status,
    isPublic: savedPokemon.isPublic,
  };
};

const getPokemonsByUser = async (userId) => {
  return Pokemon.find({ userId });
};

const getPublicsPokemon = async () => {
  return Pokemon.find({ isPublic: 1 });
};

const deletePokemon = async (pokemonId, userId) => {
  const deletedPokemon = await Pokemon.findOneAndDelete({
    _id: pokemonId,
    userId,
  });
  return deletedPokemon;
};

const modifyPokemon = async (pokemonId, userId, isPublic) => {
  const pokemon = await Pokemon.findOneAndUpdate(
    { _id: pokemonId, userId },
    { isPublic }
  );
  return pokemon;
};

module.exports = {
  savePokemon,
  getPokemonsByUser,
  getPublicsPokemon,
  deletePokemon,
  modifyPokemon,
};
