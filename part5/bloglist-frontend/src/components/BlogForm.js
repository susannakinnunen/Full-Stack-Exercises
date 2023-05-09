import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  createBlog
}) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl
    })
    setNewBlog('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
        title:
            <input
              value={newBlog}
              onChange={event => setNewBlog(event.target.value)}
              id = 'title-input'
            />
          </label>
        </div>
        <div>
          <label>
        author:
            <input
              value={newAuthor}
              onChange={event => setNewAuthor(event.target.value)}
              id = 'author-input'
            />
          </label>
        </div>
        <div>
          <label>
        url:
            <input
              value={newUrl}
              onChange={event => setNewUrl(event.target.value)}
              id = 'url-input'
            />
          </label>
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm