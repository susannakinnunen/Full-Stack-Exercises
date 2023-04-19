const mongoose = require('mongoose')


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://blogilista:${password}@cluster0.1zn5fb8.mongodb.net/testiBlogi?retryWrites=true&w=majority`
console.log('url', url)
mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: "Hyvät blogit",
  author: "Blogge Bloggari",
  url: "www.hyvatblogit.com",
  likes: 20
})

const blog_two = new Blog({
  title: "Kivat blogit",
  author: "Clogge Bloggari",
  url: "www.kivatblogit.com",
  likes: 15
})

Blog.find({}).then(result => {
  result.forEach(blog=> {
    console.log(blog)
  })
})

blog.save().then(result => {
  console.log('blog saved!')
  console.log(result)
  mongoose.connection.close()
})

blog_two.save().then(result => {
  console.log('blog_two saved!')
  console.log(result)
  mongoose.connection.close()
})