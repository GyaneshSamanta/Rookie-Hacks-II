import { verify } from "jsonwebtoken";
import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { errors } from "../errors/error.constants";

const JwtRequestSchema = yup
  .object({
    authorization: yup
      .string()
      .trim()
      .min(1, "JWT cannot be null")
      .matches(/^Bearer .+$/, "JWT should be Bearer Token"),
  })
  .required();

type JwtRequest = yup.InferType<typeof JwtRequestSchema>;

const validateJwt = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      try {
        await JwtRequestSchema.validate(req.headers, { abortEarly: false });
      } catch (error: Error | any) {
        let message: string = "";
        error.errors.forEach((e: string) => {
          message += `${e}. `;
        });
        throw {
          errorCode: 400,
          name: "JWT Validation Error",
          message: message,
        };
      }
      const { authorization } = req.headers as JwtRequest;
      if (!authorization) {
        return next(errors.JWT_ERROR);
      }
      const authToken = authorization.split(" ")[1];
      verify(authToken, process.env.SECRET_KEY!);
      next();
    } catch (err: Error | any) {
      next({
        errorCode: 403,
        name: "JWT Validation Error",
        message: `${err.name}: ${err.message}`,
      });
    }
  };
};

export default validateJwt;
