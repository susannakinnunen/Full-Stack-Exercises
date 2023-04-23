const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    console.log("authorization", authorization)
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
      console.log("req_token", request.token)
      next()
      return request.token
    }
    next()
}

const userExtractor =  async (request, response, next) => {
  if (request.token) {  
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log("decodedToken", decodedToken)
    if (!decodedToken.id) {
      console.log("ei idtä")
      return response.status(401).json({ error: 'token invalid' })
    }
    console.log("id löytynyt")
    request.user = await User.findById(decodedToken.id)
    next()
    return request.user
  } else {
    next()
  }
}

module.exports = { tokenExtractor, userExtractor }