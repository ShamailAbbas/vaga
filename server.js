// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true);

    // Extract subdomain from the hostname
    const subdomain = req.headers.host.split(".")[0];

    if (subdomain === "admin") {
      // If the subdomain is 'admin', remove it and handle the request
      req.url = req.url.replace(/^\/admin/, "");
      app.render(req, res, pathname, query);
    } else {
      // Otherwise, use the default behavior
      handle(req, res);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
