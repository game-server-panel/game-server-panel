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
            res.send({Error: err});
        } else {
            if (req.query.file) {
                const dir = path.join(containersPathJoin(data.Mounts[0].Name), req.query.file);
                res.download(dir);
            } else {
                res.send({Error: "No file input"});
            }
        }
    })
});
router.get("/content/:id", async (req, res) => {
    docker.getContainer(req.params.id).inspect(function (err, data) {
        if (err) {
            Log("Error: " + err, "Error");
            res.send({Error: err});
        } else {
            if (req.query.file) { 
                const file = path.join(containersPathJoin(data.Mounts[0].Name), req.query.file);

                if (fs.existsSync(file)) {
                    const fileContent = fs.readFileSync(file, {encoding: "utf-8"});

                    res.send({Error: null, FileContent: fileContent});
                } else {
                    res.send({Error: "File not found"});
                }
            } else {
                res.send({Error: "No file input"});
            }
        }
    })
});
router.post("/write/:id", async (req, res) => {
    docker.getContainer(req.params.id).inspect(function (err, data) {
        if (err) {
            Log("Error: " + err, "Error");
            res.send({Error: err});
        } else {
            if (req.query.file) {
                const file = path.join(containersPathJoin(data.Mounts[0].Name), req.query.file);

                var fileContent = req.body.newFileContent;

                fs.writeFileSync(file, fileContent);

                res.send({Error: null, Wrote: fileContent});
            } else {
                res.send({Error: "No file to write"});
            }
        }
    })
});
router.get("/create/:id", async (req, res) => {
    docker.getContainer(req.params.id).inspect(function (err, data) {
        if (err) {
            Log("Error: " + err, "Error");
            res.send({Error: err});
        } else {
            const file = path.join(containersPathJoin(data.Mounts[0].Name), req.query.file);

            if (fs.existsSync(file)) {
                res.send({Error: "File already exists"});
            } else {
                fs.writeFileSync(file, "");

                res.send({Error: null})
            }
        }
    })
});
router.get("/mkdir/:id", async (req, res) => {
    docker.getContainer(req.params.id).inspect(function (err, data) {
        if (err) {
            Log("Error: " + err, "Error");
            res.send({Error: err});
        } else {
            const folder = path.join(containersPathJoin(data.Mounts[0].Name), req.query.folder);

            if (fs.existsSync(folder)) {
                res.send({Error: "Folder already exists"});
            } else {
                fs.mkdirSync(folder);

                res.send({Error: null})
            }
        }
    })
})

module.exports = router;