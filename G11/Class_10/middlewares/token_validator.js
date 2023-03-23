import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.status(403).send({ message: "Please log in" });
  }

  const token = authHeaders.split(" ")[1];

  jwt.verify(token, "access_token_secret_key", (err, user) => {
    if (err) {
      //if token is invalid
      return res.status(403).send({ message: "Invalid token" });
    }
    console.log("USER: ", user);
    next()
  });
};
