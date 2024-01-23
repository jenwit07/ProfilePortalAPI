export const pagination = ( req, res, next ) => {
    let { cur_page, per_page } = req.query;
    if (cur_page && per_page) {
      req.cur_page = parseInt(cur_page);
      req.per_page = parseInt(per_page);
      req.limit = parseInt(per_page);
      req.offset = parseInt(cur_page) * parseInt(per_page) - parseInt(per_page);
    }
    next();
}