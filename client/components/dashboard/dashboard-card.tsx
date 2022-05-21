import { useMemo, useState } from "react";

import { ParseAssociationID } from "../../utils/functions";
import { DashboardCardProps } from "../../utils/interfaces/dashboard-interfaces";
import { Modal } from "../shared";

const DashboardCard: React.FC<DashboardCardProps> = ({ association }) => {
  const [modal, setModal] = useState<boolean>(false);

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
    <>
      {modal && (
        <Modal
          className="bg-white pb-4 overflow-hidden pt-0 w-96 h-2/3 rounded-lg border"
          toggleModal={
            setModal as React.Dispatch<React.SetStateAction<boolean>>
          }
        >
          <div className="bg-hedera-secondary text-white p-4">
            <h6 className="uppercase font-semibold text-center">
              {usernames[0]} and {usernames[1]}
            </h6>
            <small className="pt-2 inline-block">
              you owe <span className="font-medium">{amount}</span>
            </small>
          </div>

          <div className="p-4 h-full">
            <p className="text-xl text-hedera-purple font-small-caps font-semibold mb-2">
              Transactions
            </p>

            <div className="overflow-auto h-full">
              {transactions.map((transaction) => (
                <div className="flex justify-between py-1 border-b-2">
                  <p className="">{transaction.name}</p>
                  <p className="pl-4 mt-auto">{transaction.amount}</p>
                </div>
              ))}
              <small className="text-right block mt-2">
                TOTAL: <span className="text-base font-medium">{amount}</span>
              </small>
            </div>
          </div>
        </Modal>
      )}

      <article className="p-4 w-full h-full">
        <div
          className={`${
            amount > 0 ? "bg-gradient-to-tr" : "bg-gradient-to-bl"
          } w-96 bg- text-white rounded-xl p-4 cursor-pointer shadow-xl h-full hedera-primary mx-auto`}
          onClick={() => setModal(true)}
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
    </>
  );
};

export default DashboardCard;
