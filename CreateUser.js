const readline = require("readline");
const MongoClient = require("mongodb").MongoClient;
const sha256 = require("js-sha256");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

  rl.question("Insert your email: ", (email) => {
    rl.question("Insert your password: ", (password) => {
      console.log(`Creating an account with these informations: ${email} ${password}`)
      
      MongoClient.connect("mongodb://localhost:27017/game-server-panel")
        .then((ConnectedMongoClient) => {
          const Users = ConnectedMongoClient.db("game-server-panel").collection("Users");

          Users.insertOne({email: sha256(email), password: sha256(password)}, (error) => {
            console.log("User created successfully");
          })
          rl.close();
        });
    })
  })

