import Express, { Request, Response, NextFunction } from "express";
import { config as dotenvConfig } from "dotenv";
import cors from "cors";

dotenvConfig();

import authRoutes from "./auth/auth.routes";
import { DatabaseService } from "./services/database.service";
import { HederaService } from "./services/hedera.service";

const app = Express();

app.use(Express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.get(
  "/api/v1/healthcheck",
  (req: Request, res: Response, next: NextFunction) => {
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }
);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(405).json({
    success: false,
    message: "Method Not Allowed!",
  });
});
app.use((err: Error | any, req: Request, res: Response, next: NextFunction) => {
  if (err?.errorCode) {
    console.error("User Input Error!");
    console.error(err);
    res.status(err.errorCode).json({
      success: false,
      message: `${err.name}: ${err.message}`,
    });
  } else {
    console.error("Unknown Error Occurred!");
    console.error(new Date().toISOString());
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});

Promise.all([
  DatabaseService.getInstance().initialize(),
  HederaService.initialize(),
])
  .then(() => {
    app.listen(process.env.PORT!, () => {
      if (process.env.NODE_ENV !== "production") {
        console.log(`
            ##############################
            #                            #
            #  WARNING: DEVELOPMENT MODE #
            #                            #
            ##############################
            `);
      }
      console.log(
        `Server:${
          process.env.NODE_ENV === "production" ? "production" : "development"
        } Listening for Requests on Port ${process.env.PORT}`
      );
    });
  })
  .catch((_) => {
    process.exit(1);
  });

process.on("SIGHUP", (_) => {
  process.exit(0);
});
process.on("SIGINT", (_) => {
  process.exit(0);
});
