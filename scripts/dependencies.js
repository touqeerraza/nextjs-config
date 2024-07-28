const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Path to the package's package.json
const packageJsonPath = path.join(__dirname, "../package.json");

// Read the package.json file
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

// Extract dependencies and devDependencies
const { dependencies, devDependencies } = packageJson;

const depList = dependencies ? Object.keys(dependencies) : {};
const devDepList = devDependencies ? Object.keys(devDependencies) : {};

// Install dependencies
function installDependencies() {
  // Install regular dependencies
  if (depList.length > 0) {
    console.log("Installing dependencies...");
    try {
      execSync(
        `npm install ${depList.map((dep) => dep).join(" ")} --prefix ../../`,
        { stdio: "inherit" }
      );
      console.log("Dependencies installed successfully.");
    } catch (error) {
      console.error(`Error installing dependencies: ${error.message}`);
    }
  } else {
    console.log("No regular dependencies to install.");
  }
}

function installDevDependencies() {
  // Install devDependencies
  if (devDepList.length > 0) {
    try {
      execSync(
        `npm install ${devDepList.map((dep) => dep).join(" ")} --save-dev --prefix ../../`,
        { stdio: "inherit" }
      );
      console.log("devDependencies installed successfully.");
    } catch (error) {
      console.error(`Error installing devDependencies: ${error.message}`);
    }
  } else {
    console.log("No devDependencies to install.");
  }
}

// Run the installation
installDependencies();
installDevDependencies();
