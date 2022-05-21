import type { GetStaticPropsResult, NextPage } from "next";

import { ROUTES } from "../utils/constants/shared-constants";

const HomePage: NextPage = () => {
  return <></>;
};

export default HomePage;

export async function getStaticProps(): Promise<GetStaticPropsResult<{}>> {
  return {
    redirect: {
      destination: ROUTES.SIGNUP,
      permanent: true,
    },
  };
}
