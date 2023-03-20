import express from "express";
import { authSession } from "../sessions/auth.session.js";
import { productsSession } from "../sessions/products.session.js";

const productsRouter = express.Router();

// localhost:3000/products
productsRouter.get("/", productsSession, (req, res) => {
  const products = [
    { id: "1", name: "Bread" },
    { id: "2", name: "Strawberries" },
  ];

  req.session.name = "John Doe";
  res.send(products);
});

//localhost:3000/products/premium
// productsRouter.get("/premium", authSession, productsSession, (req, res) => {
//   const premiumDiscountedProducts = [
//     { id: "4", name: "Fancy woman bag" },
//     { id: "5", name: "T-shirt" },
//   ];

//   const session = req.session;
//   console.log("Session is premium: ", session);

//   if (session.user !== undefined && session.user.isLoggedIn) {
//     res.send(premiumDiscountedProducts);
//   } else {
//     res.status(401).send({ message: "You have to login amigo." });
//   }
// });

productsRouter.get("/premium", productsSession, (req, res) => {
  const premiumDiscountedProducts = [
    { id: "4", name: "Fancy woman bag" },
    { id: "5", name: "T-shirt" },
  ];

  const session = req.session;
  console.log("Session is premium: ", session);

  res.send(premiumDiscountedProducts);
});

// localhost:3000/products/1
productsRouter.get("/:id", productsSession, (req, res) => {
  const session = req.session;

  console.log("SESSION: ", session);

  const id = req.params.id;

  const products = [
    { id: "1", name: "Bread" },
    { id: "2", name: "Strawberries" },
  ];

  const product = products.find((product) => product.id === id);

  res.send(product);
});

export default productsRouter;
