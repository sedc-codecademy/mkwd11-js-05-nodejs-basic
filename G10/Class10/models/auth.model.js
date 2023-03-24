import bcrypt from 'bcryptjs';
import DataService from '../services/data.service.js'
import { createAccessToken, createRefreshToken } from '../jwt.const.js'
import { v4 as uuidv4 } from 'uuid'
import { verifyRefreshToken } from '../jwt.const.js';

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
            // creating access token
            const token = createAccessToken(user.id)
            console.log('token', token)

            // creating refresh token
            const refreshToken = createRefreshToken(user.id)

            // adding refresh token to user
            user.refreshTokens.push(refreshToken)
            const index = users.findIndex(u => u.id === user.id)
            users[index] = user;

            DataService.saveFile('./data/users.json', users)

            const { password, ...whatIsLeftOfUser } = user;
            return { user: whatIsLeftOfUser, token, refreshToken };
        } else {
            throw new Error('Invalid credentials')
        }
    }

    refreshToken(token) {
        const { userId } = verifyRefreshToken(token)

        if (!userId) throw new Error(`User doesn't exist`)

        const accessToken = createAccessToken(userId)

        const refreshToken = createRefreshToken(userId);

        return {
            accessToken,
            refreshToken
        }
    }
}

//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTI4YWVmMi0zODg4LTQ5NGMtYTAxOC04Yzg4YzNmYmM3ZjciLCJpYXQiOjE2Nzk2MDAzMzMsImV4cCI6MTY3OTYwMDkzM30.EKSPqFPadlD2BOHwpNz-LPcJ6r6DiJvdKdeTfs-AMFg",
//"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTI4YWVmMi0zODg4LTQ5NGMtYTAxOC04Yzg4YzNmYmM3ZjciLCJpYXQiOjE2Nzk2MDAzMzMsImV4cCI6MTY4MDIwNTEzM30.25jH80-LQlLlftCUH6HfQsV9cYz3Gsipt0C_oCdcslM"