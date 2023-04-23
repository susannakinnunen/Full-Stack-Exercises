const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    console.log("body", body)

    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })

    try{
    const savedBlog = await blog.save()
    user.notes = user.notes.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog) 
    } catch(exception) {
      response.status(400).json({error: 'title and url required'})
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log("blogs.js blog", blog)
  const user = request.user
  console.log("blogs.js user", user)
  console.log("blog.user", blog.user.toString())
  console.log("user.toString", user._id.toString())
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else response.status(401).json({error: 'only the user who has posted the blog can delete it'})
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.status(200).json()
})

module.exports = blogsRouter