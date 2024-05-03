# Pokemon project

HTTP server API to create users and CRUD of Pokemons' private and public

# dev

1. Clone the file .env.template to .env
2. Setup environment variables
3. Run the command `npm install`
4. Run database with the command (Docker has to be running previously):
   ```
   docker compose up -d
   ```
5. Run `npm start`

**Endpoints:**

- POST /users?email=email&password=password  
  Register users

- POST /users/auth?email=email&password=password
  Login user

- POST /users/1/pokemon
  Create pokemon, user should be authenticated.

- GET /pokemons
  Get public pokemons

- Get /users/1/pokemons
  Get pokemons by user

- PATCH /users/1/pokemons/1
  Update pokemons's status, user should be authenticated.

- DELETE users/1/pokemon/1
  Delete a pokemon, user should be authenticated.
