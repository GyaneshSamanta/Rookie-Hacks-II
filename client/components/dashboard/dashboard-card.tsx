import { useMemo } from "react";

import { ParseAssociationID } from "../../utils/functions";
import { DashboardCardProps } from "../../utils/interfaces/dashboard-interfaces";

const DashboardCard: React.FC<DashboardCardProps> = ({ association }) => {
  const [transactions] = Object.values(association);

  const usernames = useMemo(
    () => ParseAssociationID(Object.keys(association)[0]),
    []
  );

  const amount = useMemo(() => {
    var amountSum: number = 0;
    transactions.forEach((transaction) => {
      amountSum += transaction.amount;
    });
    return amountSum;
  }, []);

  return (
    <article className="p-4 h-full">
      <div
        className={`${
          amount > 0 ? "bg-gradient-to-tr" : "bg-gradient-to-bl"
        } w-96 bg- text-white rounded-xl p-4 shadow-xl h-full hedera-primary mx-auto`}
      >
        <p className="uppercase font-medium flex justify-between tracking-widest">
          <span>
            {usernames[0]} and {usernames[1]}
          </span>
          <span className="font-bold">{amount}</span>
        </p>

        <div className="mt-2">
          {transactions.slice(0, 3).map((transaction) => (
            <div
              key={transaction.trans_ID}
              className="flex justify-between w-full"
            >
              <p className="truncate">{transaction.name}</p>
              <p className="pl-4">{transaction.amount}</p>
            </div>
          ))}

          <p className="mt-auto font-bold">
            {transactions.length > 3 ? ". . ." : "\u00a0"}
          </p>
        </div>
      </div>
    </article>
  );
};

export default DashboardCard;
