export const pagination = (req, res, next) => {
  let { cur_page, per_page } = req.query;
  
  console.log(req.query);
  console.log(cur_page, per_page);

  if ( cur_page && per_page ) {
    console.log('pagination is working')
    cur_page = parseInt(cur_page);
    per_page = parseInt(per_page);

    req.query.cur_page = cur_page;
    req.query.per_page = per_page;
    req.query.limit = per_page;
    req.query.offset = (cur_page - 1) * per_page; // Corrected offset calculation
  }

  console.log(req.cur_page, req.per_page, req.limit, req.offset);
  next();
};
