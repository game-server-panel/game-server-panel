const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { Log, InitDocker } = require("./Utils");
const MongoClient = require("mongodb").MongoClient;

const docker = InitDocker();
Log("Docker initialized");

(async function() {
    const ConnectedMongoClient = await MongoClient.connect("mongodb://localhost:27017/game-server-panel").catch((e) => {Log("Error: "+ e, "Error")});

    var GameServerPanelDB = await ConnectedMongoClient.db("game-server-panel");
    var UsersCollection = GameServerPanelDB.collection("Users");
    var SecretCodesCollection = GameServerPanelDB.collection("SecretCodes");    

    Log("MongoDB initialized");

    var app = express();
    
    app.set("trust proxy", 1)
    app.use(session({secret:'7efd3dc2c199f577aee92af1bf9c98ffe56b5341c9046ca11cd812b786a697fb', name:'uniqueSessionID', saveUninitialized: true, resave: true}))
    app.use(cors());
    app.use(express.json());

    app.use("/containers", require("./routes/Containers"));
    app.use("/filemanager", require("./routes/Filemanager"));

    app.get("/api/users/logout", (req, res) => {
        req.session.destroy();
        res.send({Error: null});
    })
    app.post("/api/users/login", (req, res) => {
        if (req.session.loggedIn) {
            res.send({Error: null})
        } else {
            UsersCollection.findOne({email: req.body.email, password: req.body.password}, (err, user) => {
                if (user) {        
                    res.send({Error: null, sessionToken: req.session.id});
                } else {
                    res.send(JSON.stringify({Error: "Invalid email or password"}));
                }
            })    
        }
    })
    app.post("/api/users/register", async (req, res) => {       
    
        await UsersCollection.findOne({email: req.body.email}, (error, user) => {
            if (error) {
                Log("Error: " + error, "Error")
            }
            if (user) {
                res.send({Error: "Email already in use"})
            } else {
                SecretCodesCollection.findOne({Code: req.body.code}, (error, found) => {
                    if (error) {
                        Log(error, "Error")
                    }
                    if (found) {
                        UsersCollection.insertOne({email: req.body.email, password: req.body.password});
                        res.send({Error: null, sessionToken: req.session.id});
                    } else {
                        res.send({Error: "Invalid secret code"})
                    }
                })
            }
        })
    });
    
    app.listen(3001, () => {Log("HTTP initialized")});
})();

