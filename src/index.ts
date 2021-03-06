import express, { RequestHandler } from "express";
import crypto from "crypto";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import * as CMS from "./controllers/CMS";

//router
import registerInfoRouter from "./routes/info";
import registerDataRouter from "./routes/data";

//controller
import * as Description from "./controllers/Description";
import * as Indicator from "./controllers/Indicator";
import * as Legacy from "./controllers/Legacy";
import * as TuName from "./controllers/TuName";

const PORT = process.env.PORT ?? 4000;

const app = express();

// Adds a nonce to response for use on inline scripts
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("hex");
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        // @ts-expect-error res is of class ServerResponse from http module not express Response. Havent found a way to extend ServerResponse
        "script-src": ["'self'", (req, res) => `'nonce-${res.locals.nonce}'`],
      },
    },
  })
);
app.use(cors());
app.use(
  compression({
    level: 6,
  })
);
app.use(express.json());

const BROWSER_MAX_AGE = 60 * 60;
const CDN_MAX_AGE = 60 * 60 * 24;
const cache: RequestHandler = (req, res, next) => {
  res.set(
    "cache-control",
    `public, max-age=${BROWSER_MAX_AGE}, s-maxage=${CDN_MAX_AGE}`
  );
  next();
};
// Routes
app.use("/data", cache, registerDataRouter);
app.use("/info", cache, registerInfoRouter);

app.get("/", (_, res) => res.json({ status: "OK 123" }));
app.get("/description", cache, Description.index);
app.get("/indicator", cache, Indicator.index);
app.get("/legacy", cache, Legacy.index);
app.get("/tu_name", cache, TuName.index);

// Auth routes for CMS
app.get("/auth", CMS.auth);
app.get("/callback", CMS.callback);

app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});
