import type { NextPage } from "next";

import { AuthHero } from "../components/auth";

const Signup: NextPage = () => {
  return <AuthHero isLogin={false} />;
};

export default Signup;
