const fs = require("fs");
const Pokemon = require("../data/mongo/models/pokemonModel");

// Generate registers public pokemons
const prefill = (numberRegisters) => {
  const pokemons = [];
  for (let i = 1; i <= numberRegisters; i++) {
    const pokemon = {
      name: `Pokemon_${i}`,
      description: `Descripción del Pokemon ${i}`,
      category: "Earth",
      status: 1,
      isPublic: 1,
      createdAt: new Date(),
    };
    pokemons.push(pokemon);
  }

  fs.writeFile("pokemons.json", JSON.stringify(pokemons, null, 2), (err) => {
    if (err) {
      console.error("Error writting file:", err);
    } else {
      console.log("File generated correctly.");
    }
  });
};

const insertPokemons = (numberRegisters = 20) => {
  prefill(numberRegisters);
  fs.readFile("pokemons.json", "utf8", async (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    try {
      const pokemons = JSON.parse(data);
      const result = await Pokemon.insertMany(pokemons);
    } catch (error) {
      console.error("Error inserting registers on the database:", error);
    }
  });
};

module.exports = insertPokemons;
