
import * as dotenv from "dotenv";

dotenv.config();

export default {
  clientPort: process.env.CLIENT_PORT,
  proxyPort: process.env.PROXY_PORT,
  proxyURL: process.env.PROXY_URL,
};