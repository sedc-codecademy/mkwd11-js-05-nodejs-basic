import express from "express";
import fileService from "../shared-services/file-service.js";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const products = await fileService.readFile("./db/products.json");

  res.send(products);
});

export default productsRouter;
