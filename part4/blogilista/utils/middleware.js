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

module.exports = { tokenExtractor }