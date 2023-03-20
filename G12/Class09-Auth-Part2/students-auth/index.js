import express from "express";
import { globalRouter } from "./const/router.const.js";
import { createSession } from "./const/session.const.js";

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();
// By using create session we create a session object and send session_id cookie with every request
app.use(createSession);
app.use(express.json());

app.use("/api", globalRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up at port ${PORT}`);
});
