import inquirer from "inquirer";
import fs from "fs/promises";
import { join } from "path";
import { config as dotenvConfig } from "dotenv";
import {
  AccountId,
  PrivateKey,
  Client,
  FileCreateTransaction,
  Hbar,
  ContractCreateTransaction,
} from "@hashgraph/sdk";

dotenvConfig();
const operatorId = AccountId.fromString(process.env.OPERATOR_ID!);
const privateKey = PrivateKey.fromString(process.env.OPERATOR_PVTKEY!);
const client = Client.forTestnet().setOperator(operatorId, privateKey);

const main = async () => {
  const list = await fs.readdir(join(__dirname, "..", "build"));
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "binfile",
      message: "Which BIN file do you want to deploy?",
      choices: list,
    },
  ]);
  const contractByteCode = await fs.readFile(
    join(__dirname, "..", "build", answers.binfile)
  );
  const fileCreateTx = new FileCreateTransaction()
    .setContents(contractByteCode)
    .setKeys([privateKey])
    .setMaxTransactionFee(new Hbar(100000))
    .freezeWith(client);
  const fileCreateSign = await fileCreateTx.sign(privateKey);
  const fileCreateSubmit = await fileCreateSign.execute(client);
  const fileCreateRx = await fileCreateSubmit.getReceipt(client);
  const bytecodeFileId = fileCreateRx.fileId;
  console.log(`
  #################
  # HEDERA OUTPUT #
  #################
  `);
  console.log(`HEDERA::: The bytecode file ID is: ${bytecodeFileId}`);
  const contractInstantiateTx = new ContractCreateTransaction()
    .setBytecodeFileId(bytecodeFileId!)
    .setGas(100000);
  const contractInstantiateSubmit = await contractInstantiateTx.execute(client);
  const contractInstantiateRx = await contractInstantiateSubmit.getReceipt(
    client
  );
  const contractId = contractInstantiateRx.contractId;
  const contractAddress = contractId!.toSolidityAddress();
  console.log(`HEDERA::: The smart contract ID is: ${contractId}`);
  console.log(
    `HEDERA::: Smart contract ID in Solidity format: ${contractAddress}`
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
