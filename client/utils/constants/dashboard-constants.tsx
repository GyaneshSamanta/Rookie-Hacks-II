import { AssociationType } from "../interfaces/dashboard-interfaces";

export const ASSOCIATIONS_DUMMY: AssociationType[] = [
  {
    "gap:::jaggi": [
      { trans_ID: "A53G7S", amount: 20, name: "Lime Juice" },
      { trans_ID: "K8SJ2O", amount: -200, name: "Stationary" },
    ],
  },
  {
    "jaggi:::gyan": [
      { trans_ID: "P12JC6", amount: -7000, name: "Rent" },
      { trans_ID: "KMD801", amount: +465, name: "Groceries" },
      { trans_ID: "PLAQM7", amount: -3498, name: "Electricity Bill" },
      { trans_ID: "6583MC", amount: 902, name: "Gas Bill" },
      { trans_ID: "LS7BCE", amount: +598, name: "Water" },
      { trans_ID: "12MNVS", amount: +200, name: "Auto" },
    ],
  },
];

export enum AddTransactionKeys {
  TRANSACTION_NAME = "transaction_name",
  TRANSACTION_AMOUNT = "transaction_amount",
  USERNAME = "username",
}
