import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ROUTES } from "../utils/constants/shared-constants";

const HomePage: NextPage = () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace(ROUTES.SIGNUP);
  }, []);

  return <></>;
};

export default HomePage;
