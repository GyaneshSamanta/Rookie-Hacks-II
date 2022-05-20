import type { NextPage } from "next";

import { AuthHero } from "../components/auth";

const LoginPage: NextPage = () => {
  return <AuthHero isLogin={true} />;
};

export default LoginPage;
