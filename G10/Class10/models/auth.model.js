import bcrypt from 'bcryptjs';
import DataService from '../services/data.service.js'
import { createAccessToken } from '../jwt.const.js'
import { v4 as uuidv4 } from 'uuid'

export default class AuthModel {
    async registerUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const user = {
            id: uuidv4(),
            username: userData.username,
            password: hashedPassword
        }

        await DataService.saveFile('./data/users.json', [user])

        const { password, ...everythingElse } = user;

        return everythingElse;
    }

    async loginUser(userData) {
        const users = await DataService.readFile('./data/users.json')

        console.log(users)
    
        const user = users.find(user => user.username === userData.username)
    
        console.log('user', user)
        if (!user) {
            throw new Error('User not found')
        }
    
        const isSamePassword = await bcrypt.compare(userData.password, user.password)
    
        console.log('is same pass', isSamePassword)
        if (isSamePassword) {
            const token = createAccessToken(user.id)
            console.log('token', token)
            const { password, ...whatIsLeftOfUser } = user;
            return { user: whatIsLeftOfUser, token };
        } else {
            throw new Error('Invalid credentials')
        }
    }
}