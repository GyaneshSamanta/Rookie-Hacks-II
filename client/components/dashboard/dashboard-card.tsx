import { useMemo, useState } from "react";
import { Form, Formik } from "formik";

import { ParseAssociationID } from "../../utils/functions";
import { DashboardCardProps } from "../../utils/interfaces/dashboard-interfaces";
import { Input, Modal } from "../shared";

const DashboardCard: React.FC<DashboardCardProps> = ({ association }) => {
  const [modal, setModal] = useState<boolean>(false);

  const [transactions] = Object.values(association);
  const [association_id] = Object.keys(association);

  const usernames = useMemo(() => ParseAssociationID(association_id), []);

  const amount = useMemo(() => {
    var amountSum: number = 0;
    transactions.forEach((transaction) => {
      amountSum += transaction.amount;
    });
    return amountSum;
  }, []);

  const deleteTransactionHandler = (
    association_id: string,
    transaction_id: string
  ) => {
    console.log(association_id, transaction_id);
  };

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
                <Formik
                  key={transaction.trans_ID}
                  onSubmit={(values) => {
                    console.log(values);
                    setModal(false);
                  }}
                  initialValues={{ [transaction.trans_ID]: transaction.amount }}
                >
                  {({ initialValues, values }) => (
                    <Form className="py-1 border-b-2">
                      <div className="flex justify-between">
                        <p className="">{transaction.name}</p>

                        <div className="flex items-center">
                          <Input
                            id={transaction.trans_ID}
                            name={transaction.trans_ID}
                            type="number"
                            classNames={{
                              wrapper: "w-24 pl-4 mt-auto",
                              input: "w-full text-right",
                            }}
                            placeholder="Amount"
                          />
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 20 20"
                            className="w-6 text-red-500 cursor-pointer"
                            onClick={() =>
                              deleteTransactionHandler(
                                association_id,
                                transaction.trans_ID
                              )
                            }
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {initialValues[transaction.trans_ID] !==
                        values[transaction.trans_ID] && (
                        <button
                          type="submit"
                          className="px-2 py-1 bg-hedera-blue text-white rounded text-sm flex mx-auto"
                        >
                          Save
                        </button>
                      )}
                    </Form>
                  )}
                </Formik>
              ))}
            </div>
          </div>
          <button type="submit">save</button>
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
