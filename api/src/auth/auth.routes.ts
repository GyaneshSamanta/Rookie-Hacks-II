import { NextFunction, Request, Response, Router } from "express";
import validateQuery from "../middlewares/verify-query";
import {
  LoginRequest,
  LoginRequestSchema,
  SignupRequest,
  SignupRequestSchema,
} from "./auth.schema";

import { loginUser, registerUser } from "./auth.service";

const router = Router();

const handlePostSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, username } = req.body as LoginRequest;
    const { accountId, privateKey, publicKey } = await registerUser(
      username,
      password
    );
    res.status(201).json({
      success: true,
      message: `User '${username}' signed up!`,
      credentials: {
        accountId: accountId,
        privateKey: privateKey,
        publicKey: publicKey,
      },
    });
  } catch (err) {
    next(err);
  }
};

const handlePostLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, username } = req.body as SignupRequest;
    const authToken = await loginUser(username, password);
    res.json({
      success: true,
      token: authToken,
    });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/login",
  validateQuery("body", LoginRequestSchema),
  handlePostLogin
);
router.post(
  "/signup",
  validateQuery("body", SignupRequestSchema),
  handlePostSignUp
);

export default router;
