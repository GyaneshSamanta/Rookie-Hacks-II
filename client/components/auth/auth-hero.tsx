import { useMemo } from "react";
import Link from "next/link";
import { Form, Formik } from "formik";

import { AUTH_KEYS } from "../../utils/constants/auth";
import { HomePageProps } from "../../utils/interfaces/home";
import { Input } from "../shared";
import { ROUTES } from "../../utils/constants/shared";
import { CustomInputClassNames } from "../../utils/interfaces/shared";

const AuthHero = ({ isLogin }: HomePageProps) => {
  const memoisedClassNames = useMemo<CustomInputClassNames>(
    () => ({
      input: "border-b-2 focus:border-hedera-secondary transition-all",
    }),
    []
  );

  return (
    <section className="h-screen flex">
      <div className="w-1/2 bg-gradient-to-tr hedera-primary h-full flex justify-center items-center p-4">
        <Formik onSubmit={(values) => console.log(values)} initialValues={{}}>
          {({}) => (
            <Form className="rounded shadow-2xl p-4 flex flex-col gap-y-6 bg-white">
              <h2 className="text-center text-2xl font-bold my-4">
                Welcome to [APP]
              </h2>
              {!isLogin ? (
                <Input
                  id={AUTH_KEYS.FULL_NAME}
                  name={AUTH_KEYS.FULL_NAME}
                  type="text"
                  placeholder="Full Name"
                  classNames={memoisedClassNames}
                />
              ) : (
                <></>
              )}
              <Input
                id={AUTH_KEYS.USERNAME}
                name={AUTH_KEYS.USERNAME}
                type="text"
                placeholder="Username"
                classNames={memoisedClassNames}
              />
              <Input
                id={AUTH_KEYS.PASSWORD}
                name={AUTH_KEYS.PASSWORD}
                type="password"
                placeholder="Password"
                classNames={memoisedClassNames}
              />
              <button
                type="submit"
                className="bg-hedera-secondary w-fit text-white px-4 py-2 rounded mx-auto mt-4"
              >
                Submit
              </button>

              <small className="text-center">
                Switch to{" "}
                <Link href={isLogin ? ROUTES.SIGNUP : ROUTES.LOGIN}>
                  <a className="font-medium after:content-[''] after:duration-300 after:absolute after:w-0 after:h-0.5 after:hover:w-full after:bg-hedera-secondary after:-bottom-1/2 after:left-0 relative">
                    {isLogin ? "signup" : "login"}
                  </a>
                </Link>
                ?
              </small>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-1/2 h-full" />
    </section>
  );
};

export default AuthHero;
