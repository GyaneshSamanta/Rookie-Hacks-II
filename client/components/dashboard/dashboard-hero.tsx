import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

import {
  AssociationType,
  DashboardHeroProps,
} from "../../utils/interfaces/dashboard-interfaces";
import { DashboardCard } from ".";
import { Form, Formik } from "formik";
import { Input, Modal } from "../shared";
import { ROUTES } from "../../utils/constants/shared-constants";
import { AddTransactionKeys } from "../../utils/constants/dashboard-constants";

const DashboardHero: React.FC<DashboardHeroProps> = ({
  associations: initialAssociations,
}) => {
  const [associations, setAssociations] =
    useState<AssociationType[]>(initialAssociations);
  const [modal, setModal] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();

  const { replace } = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Kindly login!");
      replace(ROUTES.LOGIN);
    }
    setUsername(sessionStorage.getItem("username") ?? "");
  }, []);

  const addTransactionHandler = async (
    values: Record<AddTransactionKeys, string | number>
  ) => {
    const _associations = [...associations];
    Object.values(_associations[0])[0].push({
      trans_ID: nanoid(6),
      name: values[AddTransactionKeys.TRANSACTION_NAME] as string,
      amount: values[AddTransactionKeys.TRANSACTION_AMOUNT] as number,
    });
    setAssociations(_associations);
    setModal(false);
  };

  return (
    <>
      {modal && (
        <Modal
          className="bg-white overflow-hidden pt-0 w-96 rounded-lg border"
          toggleModal={
            setModal as React.Dispatch<React.SetStateAction<boolean>>
          }
        >
          <Formik
            onSubmit={addTransactionHandler}
            initialValues={{
              [AddTransactionKeys.USERNAME]: "",
              [AddTransactionKeys.TRANSACTION_AMOUNT]: 0,
              [AddTransactionKeys.TRANSACTION_NAME]: "",
            }}
          >
            {() => (
              <Form className="p-4">
                <p className="text-xl text-hedera-blue font-small-caps font-semibold mb-2">
                  Add a new transaction
                </p>

                <div className="grid grid-cols-1 gap-y-2 items-center justify-between">
                  <Input
                    id={AddTransactionKeys.USERNAME}
                    name={AddTransactionKeys.USERNAME}
                    type="text"
                    placeholder="Username"
                    classNames={{
                      wrapper: "mx-auto",
                      input:
                        "border-b-2 focus:border-hedera-secondary transition-all",
                    }}
                  />
                  <Input
                    id={AddTransactionKeys.TRANSACTION_NAME}
                    name={AddTransactionKeys.TRANSACTION_NAME}
                    type="text"
                    placeholder="Transaction Name"
                    classNames={{
                      wrapper: "mx-auto",
                      input:
                        "border-b-2 focus:border-hedera-secondary transition-all",
                    }}
                  />
                  <Input
                    id={AddTransactionKeys.TRANSACTION_AMOUNT}
                    name={AddTransactionKeys.TRANSACTION_AMOUNT}
                    type="number"
                    placeholder="Transaction Amount"
                    classNames={{
                      wrapper: "mx-auto",
                      input:
                        "border-b-2 focus:border-hedera-secondary transition-all",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 mt-4 bg-hedera-purple text-white rounded text-sm flex mx-auto"
                >
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}

      <section>
        <div className="bg-hedera-secondary text-white py-36 px-48">
          <h1 className="text-5xl font-bold">Welcome {username}</h1>
          <h6 className="text-hedera-purple text-xl font-light mt-8">
            Lets see your balances!
          </h6>
        </div>

        <div
          className="bg-gradient-to-r text-center text-xl text-white py-10 hedera-primary font-medium flex items-center justify-evenly cursor-pointer"
          onClick={() => setModal(true)}
        >
          <p>Add a new expense!</p>

          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="w-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z" />
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" />
          </svg>
        </div>

        <div className="grid grid-cols-3 min-w-fit w-10/12 mx-auto mt-20 justify-center items-start">
          {associations.map((association) => (
            <DashboardCard
              key={Object.keys(association)[0]}
              association={association}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default DashboardHero;
