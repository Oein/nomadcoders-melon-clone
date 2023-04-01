import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import path from "path";
import { readFileSync } from "fs";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());
app.use(localsMiddleware);
app.use("/css", express.static(path.join(__dirname, "static", "css")));
app.use("/js", express.static(path.join(__dirname, "static", "js")));
app.use("/", (req, res, next) => {
  let ur = req.url;

  if (ur.startsWith("/static")) return next();
  if (ur.startsWith("/css")) return next();
  if (ur.startsWith("/js")) return next();

  let exu = ur;
  if (exu.endsWith("/")) exu += "index";
  if (!exu.endsWith(".html")) exu += ".html";
  if (exu.startsWith("/")) exu = exu.replace("/", "");

  let fi = readFileSync(path.join(__dirname, "static", "html", exu))
    .toString()
    .replace(
      "<Init />",
      `<meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>ManLong</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /><style>.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48}</style>`
    );

  res.send(fi);
});

export default app;
