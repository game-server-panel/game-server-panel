const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { Log } = require("../Utils.js");

var containersPath;
if (process.platform == "win32") {
    containersPath = "\\\\wsl.localhost\\docker-desktop-data\\version-pack-data\\community\\docker\\volumes\\";
} else {
    containersPath = "/var/lib/docker/volumes/";
}

function containersPathJoin(id) {
    return path.join(containersPath, id, "_data")
}

router.get("/ls/:containerId", async (req, res) => {
    docker.getContainer(req.params.containerId).inspect(function (err, data) {
        if (err) {
            Log("Error: " + err, "Error")
            res.send({Error: err});
            return null;
        } else {
            var dir = "";

            req.query.folder ? 
                dir = path.join(containersPathJoin(data.Mounts[0].Name), req.query.folder) 
            : 
                dir = containersPathJoin(data.Mounts[0].Name);
            fs.readdir(dir, (error, files) => {
                if (error) {
                    res.send({Error: error});
                    Log("Error: " + error, "Error");
                    return null;
                }

                var Directories = [];
                var Files = [];

                files.forEach(file => {
                    if (fs.lstatSync(dir + "/" + file).isDirectory()) {
                        Directories.push(file);
                    } else {
                        Files.push(file);
                    }
                });

                Res = {
                    Error: null,
                    Files: Files,
                    Directories: Directories
                }

                res.send(Res);
            })
        };
    });
});
router.get("/download/:containerId", async (req, res) => {
    docker.getContainer(req.params.containerId).inspect(function (err, data) {
        if (err) {
            Log("Error: " + err, "Error");
            return null;
        } else {
            var dir;

            req.query.file ?
                dir = path.join(containersPathJoin(data.Mounts[0].Name), req.query.file)
            :
                res.send({Error: "No file input"});
            
            //res.set("Content-Type", "text/plain");
            res.sendFile(dir);
        }
    })
});

module.exports = router;