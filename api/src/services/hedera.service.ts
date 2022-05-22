import { AccountId, PrivateKey, Client } from "@hashgraph/sdk";

export class HederaService {
  private static operatorId = AccountId.fromString(process.env.OPERATOR_ID!);
  private static privateKey = PrivateKey.fromString(
    process.env.OPERATOR_PVTKEY!
  );
  private static client: Client;
  private static instance: HederaService;
  private constructor() {}

  public static initialize() {
    try {
      HederaService.client = Client.forTestnet().setOperator(
        HederaService.operatorId,
        HederaService.privateKey
      );
      console.log("Connected to Hedera service");
    } catch (err) {
      console.error("Could not connect to Hedera Service\n%o", err);
    }
  }
  public static getClient() {
    if (!HederaService.instance) {
      HederaService.instance = new HederaService();
    }
    return HederaService.client;
  }
}
