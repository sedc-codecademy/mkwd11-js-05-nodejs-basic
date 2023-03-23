import AuthModel from "../models/auth.model.js";

class AuthController {
    constructor(){
        this.authModel = new AuthModel()
    }

    async register(username, password){
        await this.authModel.registerUser(username, password)
    }
}

export default AuthController;
