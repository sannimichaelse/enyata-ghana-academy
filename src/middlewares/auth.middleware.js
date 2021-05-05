const jwt = require('jsonwebtoken');
const config = require('../config/env/index')

const verifyAccount = (req, res, next) => {
    const token = req.headers['authorization'];
    try {
      if(!token){
        return res.status(401).json({
          status: 'error',
          code: 401,
          message: 'Please supply token',
          data: ''
        })
      }
      
      const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
      req.decoded = decoded;
      return next()
    }catch(error){
      return next(error);
    }
    
}

module.exports = {
    verifyAccount
}
