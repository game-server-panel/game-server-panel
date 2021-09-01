const Docker = require("dockerode");
require("colors");

function Log(data, logType) {
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let out = "[" + date + " " + time + "] " + data;

    switch (logType) {
        case "Info":
            out = "[Info]".blue + " " + out;
            break;
        case "Warning":
            out = "[Warning]".yellow + " " + out;
            break;
        case "Error":
            out = "[Error]".red + " " + out;
            break;
        default:
            out = "[Info]".blue + " " + out;
            break;
    }

    console.log(out);
}

function InitDocker() {
    let socketPath;
    if (process.platform == "win32") {
        socketPath = "//./pipe/docker_engine"
    } else {
        socketPath = "/var/run/docker.sock"
    }

    docker = new Docker({socketPath: socketPath});

    return docker;
}

module.exports = {
    Log,
    InitDocker
}