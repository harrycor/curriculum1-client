import { createProxyMiddleware } from "http-proxy-middleware";
import config from "./config";

const proxyPort = config.proxyPort;
const proxyURL = config.proxyURL;

export default function (app: any) {
  app.use(
    "*",
    createProxyMiddleware({
      target: `${proxyURL}${proxyPort}`,
      changeOrigin: true,
    })
  );
}