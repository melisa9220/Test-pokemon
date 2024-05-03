const express = require("express");
const routes = require("./routes");
const { PORT, BASE_PATH = "" } = require("../config");
const mongo = require("../src/data/mongo");
const { insertPokemons } = require("./utils");

const start = () => {
  mongo.connect();
  const app = express();
  insertPokemons();

  app.use(express.json());

  app.use(BASE_PATH, routes);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
