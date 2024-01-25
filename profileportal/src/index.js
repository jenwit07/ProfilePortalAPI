require("custom-env").env(`${process.env.NODE_ENV}`);
import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import fs from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import routes from "./config/routes";
import dayjs from "dayjs";
import { sequelize, authSqualize } from "./config/db.config";
import { initModels } from "./app/models/init-models";
import { initModels as authInitModels } from "./app/auth/init-models";
import { DataTypes } from "sequelize";
import * as OpenApiValidator from 'express-openapi-validator';
import path from "path";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

/* CONFIG */
const bodyParser = require("body-parser");
const port = process.env.LINEPORT || 3306;

var app = express();
global.appointmentDb = initModels( sequelize, DataTypes );
global.authDb = authInitModels( authSqualize, DataTypes );

app.use(json({ limit: "50mb", extended: true }));
app.use(urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Expose-Headers", "ETag");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use( helmet() );

/* Limit requests from same API */
const limiter = rateLimit({
  windowMs: process.env.LIMITER_WINDOWMS, // 1 hour
  max: process.env.LIMITER_MAX,
  message: process.env.LIMITER_MESSAGE
});
app.use(limiter);

/ * Swagger Documentation and OpenAPI Specification * /
const apiSpec = path.join( __dirname ,'api.yaml' );
const file  = fs.readFileSync(apiSpec, 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/profileportal/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses: false,
  }),
);

app.get("/", (req, res) => {
  res.send(
    `Profile Portal Service is running`
  );
});

routes( app );

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `#### Stat Time ${dayjs().format(
        "DD/MM/YYYY HH:mm:ss"
      )} --- Profile Portal Service is running on port ${port} and ${
        process.env.APP_ENV
      } env`
    );
  });
}

module.exports = app;
