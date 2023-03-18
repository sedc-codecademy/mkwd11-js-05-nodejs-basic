import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

// Creating cookies endpoint
app.post("/create-cookie", (req, res) => {
  // Classic way of doing it (with header)
  res.set("Set-Cookie", "header-cookie=header-value");
  // Express way of setting cookies
  res.cookie("express-cookie", "slabo-kreativni-vo-9", {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: false,
  });

  res.cookie("another-cookie", "nescafe", {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
    secure: false,
  });

  return res.send({ msg: "cookies created" });
});

app.get("/read-cookie", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

app.listen(3000, () => {
  console.log(`Server is up at port 3000`);
});
