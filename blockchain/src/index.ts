import inquirer from "inquirer";
import fs from "fs/promises";
import { join } from "path";
import { spawnSync } from "child_process";

const main = async () => {
  const list = await fs.readdir(join(__dirname, "..", "contracts"));
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "contractname",
      message: "Which solidity file do you want to compile?",
      choices: list,
    },
  ]);
  const solc = spawnSync(
    "solcjs",
    [
      "--bin",
      join(__dirname, "..", "contracts", answers.contractname),
      "--output-dir",
      join(__dirname, "..", "build"),
    ],
    {
      stdio: [process.stdin, process.stdout, process.stderr],
    }
  );
};

main()
  .then(() => {
    console.log("Script executed successfully at: ", new Date().toISOString());
    process.exit(0);
  })
  .catch((err) => {
    console.log("Script executed with errors!");
    console.error(err);
    process.exit(1);
  });
