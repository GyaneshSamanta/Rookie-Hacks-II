import type { GetServerSidePropsResult, NextPage } from "next";

import { DashboardHero } from "../components/dashboard";
import { ASSOCIATIONS_DUMMY } from "../utils/constants/dashboard-constants";
import { DashboardPageProps } from "../utils/interfaces/dashboard-interfaces";

const DashboardPage: NextPage<DashboardPageProps> = (props) => {
  return <DashboardHero {...props} />;
};

export default DashboardPage;

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<DashboardPageProps>
> {
  return {
    props: {
      associations: ASSOCIATIONS_DUMMY,
    },
  };
}
