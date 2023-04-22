const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
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

test('identifying property', async () => {
  const response = await api.get('/api/blogs')

  console.log(response.body[0].id)

  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Hienot blogit",
    author: "Togge Bloggari",
    url: "www.hienotblogit.com",
    likes: 15
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)

})

test('likes equal to zero when not given ', async () => {
  const newBlog = {
    title: "Mahtavat blogit",
    author: "Mogge Bloggari",
    url: "www.mahtavatblogit.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blog = response.body.filter(blog => blog.title === "Mahtavat blogit") 

  expect(blog[0].likes).toEqual(0)

})

test('status code 400 when no title given ', async () => {
  const newBlog = {
    author: "Mogge Bloggari",
    url: "www.mahtavatblogit.com",
    likes: 16
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('succeeds with status code 204 if id is valid', async () => {
  const blogs = await helper.blogsInDb()
  const blogToDelete = blogs[0]
  console.log("blogi to delete",blogToDelete.id)
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.content)
})

test('status code 200 when likes changed', async () => {
  const blogs = await helper.blogsInDb()
  const blogToUpdate = blogs[0]
  console.log('id', blogToUpdate.id)
  await api
  .put(`/api/blogs/${blogToUpdate.id}`)
  .expect(200)

  const updatedBlogs = await helper.blogsInDb()
  const updatedBlog =  updatedBlogs.filter(blog => blog.id === blogToUpdate.id)
  console.log("updatedBlof", updatedBlog)

  expect(updatedBlog[0].likes).toEqual(0)
})


test('status code 400 and valid error message given when no username given ', async () => {
  const newUser = {
    name: "Make",
    password: "liiloo"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect({error: 'username required'})
})

test('status code 400 and valid error message given when password missing ', async () => {
  const newUser = {
    username: "Make"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect({error: 'password missing or shorter than 3 characters'})
})

test('status code 400 and valid error message given when password shorter than 3 characters ', async () => {
  const newUser = {
    username: "OP",
    password: "o"
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect({error: 'password missing or shorter than 3 characters'})
})

afterAll(async () => {
  await mongoose.connection.close()
})