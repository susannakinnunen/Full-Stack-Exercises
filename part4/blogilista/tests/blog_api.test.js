const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs  = [
  {
    title: "Hyvät blogit",
    author: "Blogge Bloggari",
    url: "www.hyvatblogit.com",
    likes: 20
  },
  {
    title: "Kivat blogit",
    author: "Clogge Bloggari",
    url: "www.kivatblogit.com",
    likes: 15
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})
  afterAll(async () => {
    await mongoose.connection.close()
  })