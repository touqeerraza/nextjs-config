const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration files to be copied
const configFiles = [
  {
    src: path.join(__dirname, "../configs/.eslintrc.js"),
    dest: path.join(process.cwd(), "../../.eslintrc.js"),
  },
  {
    src: path.join(__dirname, "../configs/stylelint.config.js"),
    dest: path.join(process.cwd(), "../../stylelint.config.js"),
  },
  {
    src: path.join(__dirname, "../configs/cspell.json"),
    dest: path.join(process.cwd(), "../../cspell.json"),
  },
  {
    src: path.join(__dirname, "../configs/.prettierrc"),
    dest: path.join(process.cwd(), "../../.prettierrc"),
  },
  {
    src: path.join(__dirname, "../configs/.prettierignore"),
    dest: path.join(process.cwd(), "../../.prettierignore"),
  },
  {
    src: path.join(__dirname, "../configs/lefthook.yml"),
    dest: path.join(process.cwd(), "../../lefthook.yml"),
  },
];

// Function to copy files
function copyFiles() {
  configFiles.forEach(({ src, dest }) => {
    try {
      // if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      // }
    } catch (error) {
      console.error(`Error copying ${src} to ${dest}: ${error.message}`);
    }
  });
}

// Function to set up Husky
function setupHusky() {
  try {
    execSync("npm i husky --save-dev", "npx husky init", { stdio: "inherit" });
    const huskyDir = path.join(process.cwd(), "../../.husky");
    if (!fs.existsSync(huskyDir)) {
      fs.mkdirSync(huskyDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(huskyDir, "pre-commit"),
      `#!/bin/sh\nnpx lint-staged\n`
    );
    fs.chmodSync(path.join(huskyDir, "pre-commit"), "755");
  } catch (error) {
    console.error(`Error setting up Husky: ${error.message}`);
  }
}

// Function to set up Lefthook
function setupLefthook() {
  try {
    const lefthookConfig = {
      "pre-commit": {
        parallel: true,
        commands: {
          "type-check": {
            glob: "*.{ts,tsx}",
            run: "yarn typecheck",
          },
          lint: {
            glob: "*.{js,ts,jsx,tsx}",
            run: "yarn lint:eslint:fix {staged_files}",
          },
          spelling: {
            glob: "*.{js,ts,jsx,tsx,md}",
            run: "yarn cspell {staged_files}",
          },
        },
      },
      "commit-msg": {
        commands: {
          "lint-commit-msg": {
            run: "npx commitlint --edit",
          },
        },
        "spell-check": {
          run: "yarn cspell --no-summary {1}",
        },
      },
    };
  } catch (error) {
    console.error(`Error setting up Lefthook: ${error.message}`);
  }
}

// Run setup functions
copyFiles();
setupHusky();
setupLefthook();
