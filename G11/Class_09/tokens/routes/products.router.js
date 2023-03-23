import express from "express";
import jwt from "jsonwebtoken";


const productsRouter = express.Router()

productsRouter.get("/", async(req, res) => {
    const products = [
        {id: "5", name: "Orange"},
        {id: "33", name: "Bread"}
    ]
    const authHeaders = req.headers["authorization"];

    if(!authHeaders){
        return res.status(403).send({message: "Please log in"})
    }

    const token = authHeaders.split(" ")[1];
    
    jwt.verify(token, "access_token_secret_key", (err, user) => {
        if(err) { //if token is invalid
            return res.status(403).send({message: "Invalid token"})
        }
        console.log("USER: ", user)

        res.send(products)
    })


   
});


export default productsRouter;