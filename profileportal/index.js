require("custom-env").env(`${process.env.NODE_ENV}`);
import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import fs from "fs";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import routes from "./src/config/routes";
import dayjs from "dayjs";
import { sequelize, authSqualize } from "./src/config/db.config";
import { initModels } from "./src/app/models/init-models";
import { initModels as authInitModels } from "./src/app/auth/init-models";
import { DataTypes } from "sequelize";
import * as OpenApiValidator from 'express-openapi-validator';
import path from "path";

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

/ * Swagger Documentation * /
const file  = fs.readFileSync('./api.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)
app.use('/profileportal/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send(
    `Profile Portal Service is running`
  );
} );

/ * OpenAPI Specification * /
const apiSpec = path.join( __dirname, 'api.yaml' );
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses: false,
  }),
);

routes( app );

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(
    `#### Stat Time ${dayjs().format(
      "DD/MM/YYYY HH:mm:ss"
    )} --- Profile Portal Service is running on port ${port} and ${
      process.env.APP_ENV
    } env`
  );
});
