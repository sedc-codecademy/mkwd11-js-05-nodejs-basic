import express from "express";
import path from "node:path";
import cors from "cors";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Making a path to the public folder
const staticFilesPath = path.join(__dirname, "public");

const app = express();

// We need to write this before any requests which will make express parse json response bodies
app.use(express.json());

// We use cors package to allow browsers to make requests to our api
app.use(cors());

// We use express.static to serve static files from a designated folder
app.use("/", express.static(staticFilesPath));

app.get("/user", (req, res) => {
  return res.send("This is from the express api");
});

app.post("/user", (req, res) => {
  // req.body is the requst body sent from the client
  const body = req.body;

  console.log(body);

  res.json(body);
});

app.get("/tasks", (req, res) => {
  // We can use .send or .json to send javascript objects
  // Express will automatically parse this into json and send it to the client
  return res.json([
    {
      text: "Send json with express",
      isFinished: true,
      author: "Borche",
    },
  ]);
});

app.listen(3000, () => {
  console.log("Server is up at port 3000");
});
