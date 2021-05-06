const jwt = require('jsonwebtoken');
const config = require('../config/env/index')

const verifyToken= (req, res, next) => {
    const token = req.headers['authorization'];
    try {
      if(!token){
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'Please supply token',
          data: null
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
    verifyToken
}
