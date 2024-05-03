const pokemonRepository = require("../repository/pokemonRepository");

const createPokemon = async (req, res) => {
  try {
    const { user: reqUser, params, body } = req;
    const userId = params.id;
    const { name, description, category, status } = body;

    if (reqUser._id === userId) {
      const data = {
        userId: params.id,
        description,
        name,
        category,
        status,
      };

      const pokemon = await pokemonRepository.savePokemon(data);

      return res.status(201).send({ data: pokemon, msg: "Created pokemon" });
    }

    return res
      .status(401)
      .send({ msg: "UserId doesn't coincide with authenticated user" });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

const getPokemonsByUser = async (req, res) => {
  try {
    const pokemons = await pokemonRepository.getPokemonsByUser(req.params.id);
    return res.status(200).send({ data: pokemons, msg: "Pokemons by user" });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};
const getPublicsPokemon = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // number page by default 1
    const limit = parseInt(req.query.limit) || 10; // number documents per page, by default 10
    const skip = (page - 1) * limit; // Jump documents for the pagination
    const pokemons = await pokemonRepository.getPublicsPokemon(skip, limit);
    return res.status(200).send({ data: pokemons, msg: "Public pokemons" });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

const removePokemon = async (req, res) => {
  try {
    const {
      params: { id: userId, pokemonId },
      user: reqUser,
    } = req;

    if (reqUser._id === userId) {
      const pokemon = await pokemonRepository.deletePokemon(pokemonId, userId);
      if (pokemon) {
        return res.status(204).send({ data: pokemon, msg: "Pokemon deleted" });
      }
      return res.status(404).send({ msg: "pokemon doesn't find" });
    }
    return res
      .status(401)
      .send({ msg: "UserId doesn't coincide with authenticated user" });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};
const modifyPokemon = async (req, res) => {
  try {
    const {
      params: { id: userId, pokemonId },
      user: reqUser,
      body: { isPublic },
    } = req;

    if (reqUser._id === userId) {
      const pokemon = await pokemonRepository.modifyPokemon(
        pokemonId,
        userId,
        isPublic
      );
      if (pokemon) {
        return res.status(204).send({ data: pokemon, msg: "Pokemon updated" });
      }
      return res.status(404).send({ msg: "pokemon doesn't find" });
    }
    return res
      .status(401)
      .send({ msg: "UserId doesn't coincide with authenticated user" });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  createPokemon,
  getPokemonsByUser,
  getPublicsPokemon,
  removePokemon,
  modifyPokemon,
};
