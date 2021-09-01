/*const { safeTerminal } = require("./backend/Terminal");
const animations = require("chalk-animation")
const cp = require('child_process')

const req = async module => {
  try {
    require.resolve(module)
  } catch (e) {
    console.log(`Could not resolve "${module}"\nInstalling`)
    cp.execSync(`npm install ${module}`)
    await setImmediate(() => {})
    console.log(`"${module}" has been installed`)
  }
  console.log(`Requiring "${module}"`)
  try {
    return require(module)
  } catch (e) {
    console.log(`Could not include "${module}". Restart the script`)
    process.exit(1)
  }
}

async function main() {
    const loadingAnimation = animations.rainbow("Installing modules... 🚀 ");

    await safeTerminal.installModules("./backend", "./frontend");

    setTimeout(() => {
        loadingAnimation.replace("Game server panel is running");
    }, 500);

    await safeTerminal.execCommand("npx concurrently \"npm run frontend\" \"npm run backend\" ");

    setTimeout(() => {
        loadingAnimation.replace("Game server panel has stopped");
    }, 500);
}

main();*/