const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
    const body = new Blog(request.body)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0
    })

    try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog) 
    } catch(exception) {
      response.status(400).json()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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