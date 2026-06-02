'use strict';
// Phusion Passenger entry point — cPanel Node.js hosting
// PORT is injected by Passenger automatically.
const { createServer } = require('http');
const { parse }        = require('url');
const next             = require('next');

const port = parseInt(process.env.PORT || '3000', 10);
const app  = next({ dev: false, hostname: 'localhost', port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      await handle(req, res, parse(req.url, true));
    } catch (err) {
      console.error('Error handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal server error');
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on port ${port}`);
  });
});
