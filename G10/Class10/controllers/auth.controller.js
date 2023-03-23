import AuthModel from '../models/auth.model.js'

const authModel = new AuthModel()

export default class AuthController {
    registerUser(req, res) {
        const userData = req.body;
        
        const newUser = authModel.registerUser(userData);

        res.status(200).send(newUser)
    }

    loginUser(req, res) {
        const userData = req.body;

        authModel.loginUser(userData)
    
        res.sendStatus(200)
    }
}