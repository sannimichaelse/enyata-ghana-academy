const jwt = require('jsonwebtoken');
const config = require('../config/env/index')

const user = [{
    id: 1,
    username: "tom",
    password: 123456
}]

const loginUser = (body) => {
    const { username, password } = body
    const userInfo = user.find((element) => element.username === username && element.password === password)
    if(userInfo){
        const options = {
            expiresIn: '1d'
        };

        const token =  jwt.sign(userInfo, config.JWT_SECRET_KEY, options);
        return {
            status: 'success',
            message: 'Authentication successful',
            code: 200,
            data: {
                user: userInfo,
                token,
            }
        }
    }

    throw {
        status: 'error',
        message: 'User not found',
        code: 404,
        data: null
    }
}


module.exports = {
    loginUser
}
