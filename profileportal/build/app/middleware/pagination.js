"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagination = void 0;
var pagination = exports.pagination = function pagination(req, res, next) {
  var _req$query = req.query,
    cur_page = _req$query.cur_page,
    per_page = _req$query.per_page;
  if (cur_page && per_page) {
    // console.log('pagination is working')
    cur_page = parseInt(cur_page);
    per_page = parseInt(per_page);
    req.query.cur_page = cur_page;
    req.query.per_page = per_page;
    req.query.limit = per_page;
    req.query.offset = (cur_page - 1) * per_page;
  }

  // console.log(req.cur_page, req.per_page, req.limit, req.offset);
  next();
};
//# sourceMappingURL=pagination.js.map