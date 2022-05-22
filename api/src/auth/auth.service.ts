import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import {
  PrivateKey,
  AccountCreateTransaction,
  Hbar,
  ContractCallQuery,
  ContractFunctionParameters,
} from "@hashgraph/sdk";

import { DatabaseService } from "../services/database.service";
import { HederaService } from "../services/hedera.service";
import { errors } from "../errors/error.constants";
export const registerUser = async (username: string, password: string) => {
  const db = await DatabaseService.getInstance().getDb("users");
  const hederaClient = HederaService.getClient();

  const userExists = await db.findOne({
    username: username,
  });
  if (userExists) {
    throw errors.USER_DUPLICATE;
  }

  const newKey = PrivateKey.generate();
  const createTxn = await new AccountCreateTransaction()
    .setInitialBalance(new Hbar(0))
    .setKey(newKey.publicKey)
    .execute(hederaClient);
  const receipt = await createTxn.getReceipt(hederaClient);
  const contractCallTxn = new ContractCallQuery()
    .setContractId(process.env.CONTRACT_ID!)
    .setGas(100000)
    .setFunction(
      "addToUsers",
      new ContractFunctionParameters().addAddress(
        receipt.accountId!.toSolidityAddress()
      )
    )
    .setMaxQueryPayment(new Hbar(1));
  const contractCallSubmit = await contractCallTxn.execute(hederaClient);

  const hashedPassword = await hash(password, 12);
  await db.insertOne({
    username: username,
    password: hashedPassword,
    publicKey: newKey.publicKey.toString(),
    accountId: receipt.accountId!.toString(),
  });

  return {
    publicKey: newKey.publicKey.toString(),
    privateKey: newKey.toString(),
    accountId: receipt.accountId!.toString(),
  };
};

export const loginUser = async (username: string, password: string) => {
  const db = await DatabaseService.getInstance().getDb("users");
  const userExists = await db.findOne({
    username: username,
  });
  if (!userExists) {
    throw errors.USER_DNE;
  } else {
    const comparePasswords = await compare(password, userExists.password);
    if (!comparePasswords) {
      throw errors.USER_DNE;
    }
    const token = sign(
      {
        username: userExists.username,
        accountId: userExists.accountId,
        publicKey: userExists.publicKey,
      },
      process.env.SECRET_KEY!,
      {
        issuer: "GGY-ROOKIE",
        expiresIn: "24h",
      }
    );
    return token;
  }
};
