"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _express = _interopRequireDefault(require("express"));
var _bodyParser = require("body-parser");
var _cors = _interopRequireDefault(require("cors"));
var _fs = _interopRequireDefault(require("fs"));
var _yaml = _interopRequireDefault(require("yaml"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _routes = _interopRequireDefault(require("./config/routes"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _db = require("./config/db.config");
var _initModels = require("./app/models/init-models");
var _initModels2 = require("./app/auth/init-models");
var _sequelize = require("sequelize");
var OpenApiValidator = _interopRequireWildcard(require("express-openapi-validator"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
require("custom-env").env("".concat(process.env.NODE_ENV));
/* CONFIG */
var bodyParser = require("body-parser");
var port = process.env.LINEPORT || 3306;
var app = (0, _express["default"])();
global.appointmentDb = (0, _initModels.initModels)(_db.sequelize, _sequelize.DataTypes);
global.authDb = (0, _initModels2.initModels)(_db.authSqualize, _sequelize.DataTypes);
app.use((0, _bodyParser.json)({
  limit: "50mb",
  extended: true
}));
app.use((0, _bodyParser.urlencoded)({
  limit: "50mb",
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Expose-Headers", "ETag");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use((0, _cors["default"])());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use((0, _helmet["default"])());

/* Limit requests from same API */
var limiter = (0, _expressRateLimit["default"])({
  windowMs: process.env.LIMITER_WINDOWMS,
  // 1 hour
  max: process.env.LIMITER_MAX,
  message: process.env.LIMITER_MESSAGE
});
app.use(limiter);
/ * Swagger Documentation and OpenAPI Specification * /;
var apiSpec = _path["default"].join(__dirname, 'api.yaml');
var file = _fs["default"].readFileSync(apiSpec, 'utf8');
var swaggerDocument = _yaml["default"].parse(file);
app.use('/profileportal/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDocument));
app.use(OpenApiValidator.middleware({
  apiSpec: apiSpec,
  validateResponses: false
}));
app.get("/", function (req, res) {
  res.send("Profile Portal Service is running");
});
(0, _routes["default"])(app);
app.use(function (err, req, res, next) {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  });
});
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function () {
    console.log("#### Stat Time ".concat((0, _dayjs["default"])().format("DD/MM/YYYY HH:mm:ss"), " --- Profile Portal Service is running on port ").concat(port, " and ").concat(process.env.APP_ENV, " env"));
  });
}
module.exports = app;
//# sourceMappingURL=index.js.map