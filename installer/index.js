import { exec } from "child_process";

exec("cat /etc/debian_version", (error, stdout, stderr) => {
    if (error) {
        console.log("This installer supports only Ubuntu (probably Debian too)");
        process.exit(1);
    } else {
        if (stderr) {
            console.log("This installer supports only Ubuntu (probably Debian too)");
            process.exit(2);
        } else {
            var error, stdout, stderr;

            error, stdout, stderr = exec("wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("sudo echo \"deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse\" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("sudo apt update && sudo apt install -y mongodb-org nodejs npm");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("sudo systemctl enable --now mongod");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("sudo apt install docker && sudo apt install docker.io");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("sudo systemctl enable --now docker");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("git clone https://github.com/game-server-panel/game-server-panel.git /var/www/game-server-panel");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("cd /var/www/game-server-panel");
            printOutput(error, stdout, stderr);
            error, stdout, stderr = exec("sudo npm run dependencies");
            printOutput(error, stdout, stderr);
        };
    };
});

function printOutput(error, stdout, stderr) {
    if (error) {
        console.log("Error: " + error);
        process.exit(1);
    }
    if (stderr) {
        console.log("Error: " + stderr);
        process.exit(2);
    }
    console.log("-----------------------");
    console.log(stdout);
    console.log("-----------------------");
}