import * as express from "express";
import config from "./config";
import setupProxy from "./setupProxy";

const app = express();
app.use(express.static("public"));
setupProxy(app);

const port = config.clientPort;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
