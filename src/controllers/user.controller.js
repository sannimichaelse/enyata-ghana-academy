const jwt = require('jsonwebtoken');
const config = require('../config/env/index')

const user = [{
    id: 1,
    username: "tom",
    password: 123456
}]

const loginUser = (req, res, next) => {
    const { username, password } = req.body
    const userInfo = user.find((element) => element.username === username && element.password === password)
    if(userInfo){

    const options = {
      expiresIn: '1d'
    };

     const token =  jwt.sign(userInfo, config.JWT_SECRET_KEY, options);
     return res.status(200).json({
            status: 'success',
            message: 'Authentication successful',
            code: 200,
            data: {
                user: userInfo,
                token,
            }
      })
    }

    return res.status(404).json({
        status: 'error',
        message: 'User not found',
        code: 404,
        data: null
    })
   
}


module.exports = {
    loginUser
}