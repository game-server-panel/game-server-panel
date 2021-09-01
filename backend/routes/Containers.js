const express = require("express");
const { safeTerminal } = require("../Terminal");
const { Log } = require("../Utils.js");
const router = express.Router();

router.get("/id/:id", (req, res) => {
    docker.getContainer(req.params.id).inspect(function (err, data) {
        if (err) {
            res.send({Error: err})
        } else {
            res.send(data)
        };
    });
});
router.get("/list", (req, res) => {
    docker.listContainers({
        all: true
    },function (err, containers) {
        res.send(containers);
    });
});
router.get("/start/:id", (req, res) => {
    docker.getContainer(req.params.id).start((err) => {
        if (err) {res.send({Error: "Unable to start container"})} else {
            Log("Container " + String(req.params.id).substring(0, 20) + " started", "Info")
            res.send({Error: null});
        };
    });
});
router.get("/stop/:id", (req, res) => {
    docker.getContainer(req.params.id).stop((err) => {
        if (err) {res.send({Error: "Unable to stop container"})} else {
            Log("Container " + String(req.params.id).substring(0, 20) + " stopped", "Info")
            res.send({Error: null});
        };
    })
});
router.get("/exec/:game/:id/:cmd", async function(req, res) {
    try {
        if (req.params.game == "minecraft") {
            const data = await safeTerminal.execMinecraftCommand(req.params.cmd, req.params.id);
            res.send({Error: null, Data: data});
        }
    } catch (error) {
        Log("Error: " + error, "Error");
        res.send({Error: error});
    }
});
router.get("/history/:id", async function(req, res) {
    try {
        const data = await safeTerminal.containerHistory(req.params.id);
        res.send({Error: null, ContainerHistory: data});
    } catch (error) {
        Log("Error: " + error, "Error");
        res.send({Error: error});
    }
});
router.post("/create/:game", async function(req, res) {
    Log("Creating new server", "Info");
    if (req.params.game === "minecraft") {
        const data = await safeTerminal.execCommand(`docker run -d -it -p ${req.body.port ? req.body.port : 25565}:25565 ${req.body.name ? "--name " + String(req.body.name).toLowerCase().replaceAll(" ", "") : ""} -e EULA=TRUE itzg/minecraft-server`);
        Log("Server created", "Info");
        data ? 
            res.send({Error: data})
        : 
            res.send({Error: null});
    } else {
        res.send({Error: "Game not implemented"})
    }
})

module.exports = router;