import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./trpc/context";
import appRouter from "./trpc/router";
import cors from "cors";
import express from "express";
import { ironSession } from "iron-session/express";

const PORT = 4000;

const app = express();

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      callback(null, true);
    },
  })
);

app.use(
  ironSession({
    cookieName: "siwe",
    // Has to be 32 characters
    password:
      process.env.IRON_SESSION_PASSWORD || "UNKNOWN_IRON_SESSION_PASSWORD_32",
    cookieOptions: {
      secure: process.env.PROD === "production",
    },
  })
);

app.use(
  "/",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
