const path = require('path');

const micro = require('micro');
const cors = require('micro-cors');
const fsRouter = require('fs-router');
const fp = require('lodash/fp');

const match = fsRouter(path.join(__dirname, '/modules'));

const api = fp.pipe([
  cors(),
  (next) => (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    return next(req, res);
  },
])((req, res) => {
  if (req.method === 'OPTIONS') {
    return micro.send(res, 200);
  }

  const matchedRoute = match(req);
  if (matchedRoute) {
    return matchedRoute(req, res);
  }

  micro.sendError(req, res, { statusCode: 404 });
});

module.exports = api;
