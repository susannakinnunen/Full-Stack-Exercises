const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log("username", username)
  console.log("password", password)

  const user = await User.findOne({ username })
  console.log("user loginissa", user)
  console.log("password", password)
  console.log("passwordHasha", user.passwordHash)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
    console.log("päästäänkö tänne 1")
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  console.log("päästäänkö tänne 2")
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  console.log("päästäänkö tänne 3")
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter