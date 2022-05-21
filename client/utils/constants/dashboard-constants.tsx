import { AssociationType } from "../interfaces/dashboard-interfaces";

export const ASSOCIATIONS_DUMMY: AssociationType[] = [
  {
    "gap:::jaggi": [
      { trans_ID: "T1", amount: 10, name: "t1" },
      { trans_ID: "T2", amount: -200, name: "t2" },
    ],
  },
  {
    "jaggi:::gyan": [
      { trans_ID: "T3", amount: -10, name: "t3" },
      { trans_ID: "T4", amount: +20, name: "t4" },
      { trans_ID: "T5", amount: +20, name: "t5" },
      { trans_ID: "T6", amount: +20, name: "t6" },
      { trans_ID: "T7", amount: +20, name: "t7" },
      { trans_ID: "T8", amount: +20, name: "t8" },
    ],
  },
];
