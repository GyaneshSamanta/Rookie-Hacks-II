import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";

import { AUTH_KEYS } from "../../utils/constants/auth-constants";
import { HomePageProps } from "../../utils/interfaces/home-interfaces";
import { Input } from "../shared";
import { ROUTES } from "../../utils/constants/shared-constants";
import { CustomInputClassNames } from "../../utils/interfaces/shared-interfaces";
import { rest } from "../../utils/services/rest";

const AuthHero: React.FC<HomePageProps> = ({ isLogin }) => {
  const { push } = useRouter();

  const memoisedClassNames = useMemo<CustomInputClassNames>(
    () => ({
      input: "border-b-2 focus:border-hedera-secondary transition-all",
    }),
    []
  );

  const loginHandler = async (values: Record<AUTH_KEYS, string>) => {
    try {
      const { data } = await rest.post("/auth/login", values);
      sessionStorage.setItem("username", values[AUTH_KEYS.USERNAME]);
      sessionStorage.setItem("token", data.token);
      push(ROUTES.DASHBOARD);
    } catch ({ response }) {
      console.log(response);
      // @ts-ignore
      alert(response.data.message);
    }
  };

  const signupHandler = async (values: Record<AUTH_KEYS, string>) => {
    try {
      const {
        data: { message, credentials },
      } = await rest.post("/auth/signup", values);

      alert(message);
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(credentials))
      );
      element.setAttribute(
        "download",
        `credentials@${values[AUTH_KEYS.USERNAME]}.txt`
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      push(ROUTES.LOGIN);
    } catch ({ response }) {
      console.log(response);
      // @ts-ignore
      alert(response.data.message);
    }
  };

  return (
    <section className="h-screen flex">
      <div className="w-1/2 bg-gradient-to-tr hedera-primary h-full flex justify-center items-center p-4">
        <Formik
          onSubmit={isLogin ? loginHandler : signupHandler}
          initialValues={{ [AUTH_KEYS.USERNAME]: "", [AUTH_KEYS.PASSWORD]: "" }}
        >
          {({}) => (
            <Form className="rounded shadow-2xl p-4 flex flex-col gap-y-6 bg-white">
              <h2 className="text-center text-2xl font-bold my-4">
                Welcome to
                <img
                  src="/brand.png"
                  alt="Contracts"
                  className="w-40 mx-auto"
                />
              </h2>
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
                {isLogin ? "Login" : "Signup"}
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
