const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { url: 1, title:1, author: 1 })
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (password === undefined || password.length < 3) {
    return response.status(400).json({error: 'password missing or shorter than 3 characters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  console.log("user in users.js", user )
  try{
    const savedUser = await user.save()
    response.status(201).json(savedUser) 
    } catch(exception) {
      response.status(400).json({error: 'username required'})
    }
})

module.exports = usersRouter