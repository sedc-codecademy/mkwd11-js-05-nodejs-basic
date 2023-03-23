import express from "express"
import { authSession } from "../sessions/auth.session.js";

const authRouter = express.Router();


authRouter.post("/login", authSession, (req, res) => {
    const user = {
        username: "bob",
        password: "bob123"
    };

    const username = req.body.username;
    const password = req.body.password;


    if(username === user.username && password === user.password){

        req.session.user = {
            user: username,
            isLoggedIn: true
        }

        res.send({message: "Logged in successfully."})
    }else {
        res.status(403).send({message: "Wrong username or password."})
    }
});

authRouter.post('/logout', authSession, (req, res) => {
    // req.session.user = {
    //     ...req.session.user,
    //     isLoggedIn: false
    // }

    // req.session.user = {}

    // delete req.session.user

    req.session.destroy()
    res.send({message: "Logout success"})
})
export default authRouter;