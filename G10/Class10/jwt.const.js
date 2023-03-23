import pkg from 'jsonwebtoken'
const { sign } = pkg;

export const createAccessToken = (userId) => sign(
    { userId },
    'this_is_super_secret_key',
    {
        expiresIn: '10m'
    }
)