import express, { ErrorRequestHandler, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import passport from "passport";
import session from "express-session";

import userRoute from "./routes/user";
import analyticRoute from "./routes/analytics";
import urlRoute from "./routes/url";
import mongoose from "mongoose";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
export const PORT = process.env.PORT || 3000;
export const URL = `${process.env.URL}:${PORT}`;
import "./lib/auth";

const client = createClient({
  url: process.env.REDIS || "redis://localhost:6379",
});

// Connect to Redis
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Error connecting to Redis:", err);
  });

// Handle Redis connection errors
client.on("error", (err) => {
  console.error(`Redis error: ${err}`);
});
const app = express();
app.use(
  cors({
    origin: process.env.FRONT_URL, // React app URL
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: new RedisStore({ client }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 24,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(userRoute);
app.use("/api/shorten", urlRoute);
app.use("/api/analytics", analyticRoute);

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.get("/not-authenticated", (_req: Request, res: Response) => {
  res
    .status(401)
    .send(`<h1 style="text-align:center">You are not authenticated</h1>`);
});
const errorhandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    error: err,
  });
};

app.use(errorhandler);

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`The server is running on  ${process.env.URL}:${PORT}`),
    ),
  )
  .catch((err) =>
    console.log(
      `error while connection to the database make sure the database is connecting \n ${err} \n`,
    ),
  );
