import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => (b.likes > a.likes) ? 1 : ((a.likes > b.likes)? -1 : 0)))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('päästäänkö tänne')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out with', user.username)
    try {
      window.localStorage.removeItem(
        'loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('logout did not succeed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('returned blog', returnedBlog)
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => (b.likes > a.likes) ? 1 : ((a.likes > b.likes)? -1 : 0)))
        setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      })
  }
  const addLike = (blogObject, blogId) => {
    console.log('updates will be sent to server')
    console.log('blogid', blogId)
    blogService
      .update(blogObject, blogId)
      .then(returnedBlog => {
        console.log('returned blog with added likes', returnedBlog)
        let index = blogs.findIndex(blog => blog.id === returnedBlog.id)
        console.log('blogs original blog', blogs[index])
        blogs[index] = returnedBlog
        console.log('blogs[index]',blogs[index])
        setBlogs(blogs.sort((a, b) => (b.likes > a.likes) ? 1 : ((a.likes > b.likes)? -1 : 0)))
      })
  }

  const deleteBlog = (blog) => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author} ?`)){
      console.log('blog.id',blog.id)
      blogService
        .deleteBlog(blog.id)
      console.log('blog.title1', blog.title)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      console.log('blog.title2', blog.title)
      setSuccessMessage(`Deleted ${blog.tilte} by ${blog.author}.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }}

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Login</h2>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="success">
        {message}
      </div>
    )
  }

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  /*function compare(a,b) {
    if (a.likes > b.likes) {
      return -1
    }
    if (a.likes < b.likes) {
      return 1
    }
    return 0

  } */

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      <h2>blogs</h2>
      <p>{user.username} logged in</p> <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} />
      )}
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}
        />
      </Togglable>
    </div>
  )

}

export default App