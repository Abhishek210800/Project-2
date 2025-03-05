const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://app.aktivedirectory.com",
      changeOrigin: true,
      secure: true,
      timeout: 10000,
      onProxyReq(proxyReq, req, res) {
        console.log("Proxying request to:", proxyReq.path);
      },
      onError(err, req, res) {
        console.error("Proxy error:", err);
        res.status(500).send("Proxy error");
      },
    })
  );
};
